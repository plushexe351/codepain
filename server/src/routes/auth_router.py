from fastapi import HTTPException, Depends, status, APIRouter
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


def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)

def create_access_token(username: str, expires: timedelta):
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + expires
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register", response_model=schemas.UserResponse)
def register_user(request: schemas.Users, db: db_dependency):
    if db.query(models.UserModel).filter(models.UserModel.email == request.email).first():
        raise HTTPException(status_code=403, detail="user already exists")

    new_user = models.UserModel(
        username=request.username,
        email=request.email,
        password=hash_password(request.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=schemas.Token)
def login_user(request: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = db.query(models.UserModel).filter(models.UserModel.username == request.username).first()

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="invalid credentials")

    expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = create_access_token(user.username, expires)

    return {"access_token": token, "token_type": "bearer"}


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
