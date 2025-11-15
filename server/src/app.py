from fastapi import FastAPI
from src.routes.auth_router import router as auth_router
from src.routes.pen_router import router as pen_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(pen_router, prefix="/pens", tags=["pens"])


@app.get("/")
def root():
    return {"message": "off and running"}
