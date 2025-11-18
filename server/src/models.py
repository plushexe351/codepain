from src.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import timedelta, datetime, timezone


class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    pens = relationship('PenModel', back_populates='owner')


class PenModel(Base):
    __tablename__ = 'pens'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    html = Column(String)
    css = Column(String)
    js = Column(String)
    private = Column(Boolean, nullable=False, default=False)

    owner = relationship('UserModel', back_populates='pens')

class RefreshToken(Base):
    __tablename__ = 'refresh_token'

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True)
    user_id = Column(Integer, ForeignKey='users.id')
    expires_at = Column(DateTime, default=timedelta(days=7))
    