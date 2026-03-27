#main.py
from fastapi import FastAPI
from database import Base, engine
import databasemodel   
import transaction
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(transaction.router)

@app.get("/")
def welcome():
    return {"message": "hello"}
