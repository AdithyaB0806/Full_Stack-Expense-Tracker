#schemas.py
from datetime import date

from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    type: str
    category: str
    description: str | None = None

class TransactionResponse(BaseModel):
    id: int
    amount: float
    type: str
    category: str
    description: str | None
    date: date

    class Config:
        from_attributes = True