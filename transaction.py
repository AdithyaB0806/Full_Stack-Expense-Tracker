from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from databasemodel import Transaction
from schemas import TransactionCreate, TransactionResponse
from sqlalchemy import func

router = APIRouter()

@router.get("/summary")
def get_summary(db: Session = Depends(get_db)):
    income = db.query(func.sum(Transaction.amount))\
        .filter(Transaction.type == "income").scalar() or 0
    expense = db.query(func.sum(Transaction.amount))\
        .filter(Transaction.type == "expense").scalar() or 0
    balance = income - expense
    return {"income": income, "expense": expense, "balance": balance}

@router.get("/category-summary")
def category_summary(db: Session = Depends(get_db)):
    result = db.query(
        Transaction.category,
        func.sum(Transaction.amount).label("total")
    ).filter(func.lower(Transaction.type) == "expense")\
     .group_by(Transaction.category)\
     .order_by(func.sum(Transaction.amount).desc())\
     .all()
    return [{"category": r[0], "expense": r[1]} for r in result]

@router.post("/transaction", status_code=201)
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    # ✅ Input validation
    if data.type.lower() not in ["income", "expense"]:
        raise HTTPException(status_code=400, detail="Type must be 'income' or 'expense'")
    
    new_transaction = Transaction(
        amount=data.amount,
        type=data.type.lower(),
        category=data.category,
        description=data.description
    )
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return {"message": "Transaction created successfully", "id": new_transaction.id}

@router.get("/transactions")
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).order_by(Transaction.date.desc()).all()

@router.delete("/transaction/{transaction_id}", status_code=200)
def delete_transaction(transaction_id: int, db: Session = Depends(get_db)): 
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")  
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction deleted successfully"}

@router.put("/transaction/{id}", status_code=200)
def update_transaction(id: int, data: TransactionCreate, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")  
    if data.type.lower() not in ["income", "expense"]:
        raise HTTPException(status_code=400, detail="Type must be 'income' or 'expense'")  

    transaction.amount = data.amount
    transaction.type = data.type.lower()
    transaction.category = data.category
    transaction.description = data.description
    db.commit()
    db.refresh(transaction)
    return {"message": "Updated successfully"}

@router.get("/monthly-summary")
def monthly_summary(db: Session = Depends(get_db)):
    result = db.query(
        func.to_char(Transaction.date, "YYYY-MM").label("month"),
        func.sum(Transaction.amount).label("total")
    ).group_by("month").order_by("month").all()

    return [
        {"month": r[0], "total": float(r[1])}
        for r in result
    ]