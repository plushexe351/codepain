from fastapi import HTTPException, Depends, status, APIRouter, Request, Response, BackgroundTasks, Cookie
from passlib.context import CryptContext
from src import models, schemas
from sqlalchemy.orm import Session
from src.database import get_db
from jose import jwt, JWTError
from datetime import timedelta, datetime, timezone
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from dotenv import load_dotenv
import os
from typing import Annotated, Optional

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(username: str, expires: timedelta | None = None):
    if expires is None:
        expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    expire_time = datetime.now(timezone.utc) + expires

    payload = {'sub' : username, 'exp' : expire_time}

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(username: str):
    expire = datetime.now(timezone.utc) + timedelta(days=7)
    payload = {'sub' : username, 'exp' : expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return token, expire

def get_token_from_cookie(request : Request):
    token = request.cookies.get('access_token')
    if token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token not found')

    
    return token

def clean_expired_tokens(db : db_dependency):
    db.query(models.RefreshTokens).filter(models.RefreshTokens.expires_at < datetime.now(timezone.utc)).delete()
    db.commit()



@router.post("/register", response_model=schemas.UserResponse)
def register_user(request: schemas.Users, db: db_dependency):
    if db.query(models.User).filter(models.UserModel.username == request.username).first():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='user already exists')
    
    user = models.UserModel(username=request.username, email=request.email, password=hash_password(request.password))

    db.add(user)
    db.commit()
    db.refresh(user)

    return user



@router.post("/login", response_model=schemas.Token)
def login_user(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency, response: Response, bg: BackgroundTasks):
    user = db.query(models.UserModel).filter(models.UserModel.username == request.username).first()
    if not user or verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='invalid creds')
    
    access_expiry = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.username, access_expiry)

    refresh_token, refresh_expiry = create_refresh_token(user.username)
    db_token = models.RefreshToken(token=refresh_token, user_id=user.id, expires_at=refresh_expiry)
    db.add(db_token)
    db.commit()

    response.set_cookie(key='access_token', value=access_token, httponly=True, secure=False, samesite='lax', max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60)
    response.set_cookie(key='refresh_token', value=refresh_token, httponly=True, secure=False, samesite='lax', max_age=7 * 24 * 60 * 60)
    bg.add_task(clean_expired_tokens, db)

    return {'message' : 'logged in'}


@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="could not validate credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="invalid token")

    user = db.query(models.UserModel).filter(models.UserModel.username == username).first()
    if not user:
        raise HTTPException(status_code=401, detail="user not found")

    return user


def optional_get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    if not token:
        return None
    try:
        return get_current_user(token, db)
    except:
        return None
    
@router.post('/refresh')
def refresh_access_token(db : db_dependency,bg: BackgroundTasks, response : Response, refresh_token : str | None = Cookie(default=None)):
    if refresh_token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token is missing')
    
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get('sub')
        if username is None:
            raise JWTError()
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='invalid token')
    
    stored_token = db.query(models.RefreshToken).filter(models.RefreshToken.token == refresh_token).first()

    if stored_token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='token revoked')
    
    db.delete(stored_token)
    db.commit()

    new_refresh, refresh_exp = create_refresh_token(username)
    db.add(models.RefreshToken(token=new_refresh, user_id=stored_token.user_id, expires_at=refresh_exp))
    db.commit()

    new_access = create_access_token(username)

    response.set_cookie(key='access_token', value=new_access, httponly=True, secure=False, samesite='lax', max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60)
    response.set_cookie(key='refresh_token', value=new_refresh, httponly=True, secure=False, samesite='lax', max_age=7 * 24 * 60 * 60)
    bg.add_task(clean_expired_tokens, db)

    return {'message' : 'refresh tokens'}

@router.post('/logout')
def logout_user(db: db_dependency, response: Response, refresh_token: str | None = Cookie(default=None)):
    if refresh_token:
        token = db.query(models.RefreshToken).filter(models.RefreshToken.token == refresh_token).first()
        if token:
            db.delete(token)
            db.commit()
    
    response.delete_cookie(key='access_token', httponly=True, secure=False, samesite='lax')
    response.delete_cookie(key='refresh_token', httponly=True,secure=False, samesite='lax')

    return {'message' : 'logged out'}
