from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import generate_text

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # możesz zawęzić później
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemat requestu
class Prompt(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/echo")
def echo(prompt: Prompt):
    return {"response": f"Received: {prompt.text}"}

@app.post("/api/generate")
def generate(prompt: Prompt):
    result = generate_text(prompt.text)
    return {"response": result}
