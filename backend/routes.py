from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from models import Book as BookModel
from schemas import Book, BookCreate
from db import SessionLocal


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        

@router.get("/books", response_model=List[Book])
def read_books(skip: int = 0, limit: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(BookModel).offset(skip)
    if limit:
        query = query.limit(limit)
    books = query.all()
    return books

