from fastapi import FastAPI
from db import engine
import models
import routes


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(routes.router)



@app.get("/")
def root():
    return {"message": "Hello World"}