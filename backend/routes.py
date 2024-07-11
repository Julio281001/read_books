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
async def read_books(skip: int = 0, limit: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(BookModel).offset(skip)
    if limit:
        query = query.limit(limit)
    books = query.all()
    return books


@router.get("/books/{book_id}", response_model=Book)
async def read_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return db_book


@router.post("/books/", response_model=Book)
async def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = BookModel(title=book.title, author=book.author, rating=book.rating)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


@router.put("/books/{book_id}", response_model=Book)
async def update_book(book_id: int, book: BookCreate, db: Session = Depends(get_db)):
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db_book.title = book.title
    db_book.author = book.author
    db_book.rating = book.rating
    db.commit()
    db.refresh(db_book)
    return db_book


@router.delete("/books/{book_id}", response_model=Book)
async def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(BookModel).filter(BookModel.id == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(db_book)
    db.commit()
    return db_book