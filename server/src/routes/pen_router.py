from fastapi import APIRouter, HTTPException, Depends, status
from src.database import get_db
from src import models, schemas
from sqlalchemy.orm import Session
from typing import Annotated, Optional, List
from .auth_router import get_current_user, optional_get_current_user

router = APIRouter()
db_dependency = Annotated[Session, Depends(get_db)]


@router.post('/create', response_model=schemas.Pens, status_code=status.HTTP_201_CREATED)
def create_pen(pen: schemas.Pens, db: db_dependency, current_user: models.UserModel = Depends(get_current_user)):
    new_pen = models.PenModel(
        user_id=current_user.id,
        html=pen.html,
        css=pen.css,
        js=pen.js,
        private=pen.private,
    )
    db.add(new_pen)
    db.commit()
    db.refresh(new_pen)

    return new_pen


@router.post('/{id}/privacy', response_model=schemas.Pens)
def toggle_privacy(id: int, db: db_dependency, current_user: models.UserModel = Depends(get_current_user)):
    pen = db.query(models.PenModel).filter(models.PenModel.id == id).first()

    if not pen:
        raise HTTPException(status_code=404, detail="pen not found")
    if pen.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="you dont own this pen")

    pen.private = not pen.private
    db.commit()
    db.refresh(pen)

    return pen


@router.get('/', response_model=List[schemas.Pens])
def get_pens(user_id: Optional[int] = None, db: Session = Depends(get_db), current_user: Optional[models.UserModel] = Depends(optional_get_current_user)):
    query = db.query(models.PenModel)

    if user_id:
        query = query.filter(models.PenModel.user_id == user_id)
        if not current_user or current_user.id != user_id:
            query = query.filter(models.PenModel.private == False)
    else:
        query = query.filter(models.PenModel.private == False)

    return query.all()


@router.get('/{id}', response_model=schemas.Pens)
def get_pen_by_id(id: int, db: db_dependency, current_user: Optional[models.UserModel] = Depends(optional_get_current_user)):
    pen = db.query(models.PenModel).filter(models.PenModel.id == id).first()

    if not pen:
        raise HTTPException(status_code=404, detail="pen not found")

    if pen.private and (not current_user or pen.user_id != current_user.id):
        raise HTTPException(status_code=401, detail="this pen is private")

    return pen


@router.put('/{id}', response_model=schemas.Pens)
def update_pen(id: int, request: schemas.Pens, db: db_dependency, current_user: models.UserModel = Depends(get_current_user)):
    pen_query = db.query(models.PenModel).filter(models.PenModel.id == id)
    pen = pen_query.first()

    if not pen:
        raise HTTPException(status_code=404, detail="pen not found")
    if pen.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="you dont own this pen")

    pen_query.update(request.model_dump(), synchronize_session=False)
    db.commit()
    db.refresh(pen)

    return pen


@router.delete('/{id}')
def delete_pen(id: int, db: db_dependency, current_user: models.UserModel = Depends(get_current_user)):
    pen = db.query(models.PenModel).filter(models.PenModel.id == id).first()

    if not pen:
        raise HTTPException(status_code=404, detail="pen not found")
    if pen.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="you dont own this pen")

    db.delete(pen)
    db.commit()

    return {"detail": "deleted"}
