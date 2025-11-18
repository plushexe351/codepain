from pydantic import BaseModel, EmailStr
from typing import Optional

# ---------------- USERS ----------------

class Users(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


# ---------------- TOKENS ----------------

class Token(BaseModel):
    access_token: str
    token_type: str


# ---------------- PENS ----------------

class Pens(BaseModel):
    id : int
    html: str
    css: str
    js: str
    private: bool = False  # default public

class PenResponse(BaseModel):
    id: int
    html: str
    css: str
    js: str
    private: bool

    class Config:
        from_attributes = True


class PenListResponse(BaseModel):
    pens: list[PenResponse]
