#databasemodel.py
from datetime import date

from sqlalchemy import Column, Date,  Integer, String, Float
from database import Base   

class Transaction(Base):   
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=date.today)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)