from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import generate_text
import asyncio
import json

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # można zawęzić później
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemat requestu
class Prompt(BaseModel):
    prompt: str

def chunk_by_words(text: str):
    return text.split(" ")

def chunk_text(text: str, size: int = 5):
    for i in range(0, len(text), size):
        yield text[i:i+size]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/echo")
def echo(prompt: Prompt):
    return {"response": f"Received: {prompt.prompt}"}

@app.post("/api/generate")
def generate(prompt: Prompt):
    result = generate_text(prompt.prompt)
    return {"response": result}

@app.websocket("/ws/generate")
async def ws_generate(ws: WebSocket):
    await ws.accept()
    print(">>> WS: polaczenie otwarte")

    try:
        while True:
            raw = await ws.receive_text()
            print(">>> WS: odebrano RAW:", raw)

            data = json.loads(raw)
            print(">>> WS: JSON:", data)

            prompt = data["prompt"]
            print(">>> WS: prompt:", prompt)

            full = generate_text(prompt)
            print(">>> WS: wygenerowano tekst:", full)

            for chunk in chunk_text(full, size=40):
                print(">>> WS: wysylam chunk:", chunk)
                await ws.send_text(chunk)
                await asyncio.sleep(0.02)

            print(">>> WS: wysylam END")
            await ws.send_text("[[END]]")

    except Exception as e:
        print(">>> WS ERROR:", e)
        await ws.close()
