from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt2_model import generate_text
import os

app = Flask(__name__)
CORS(app)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.route("/api/echo", methods=["POST"])
def echo():
    data = request.json
    text = data.get("text", "")
    return jsonify({"response": f"Received: {text}"})

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json
    prompt = data.get("text", "")
    result = generate_text(prompt)
    return jsonify({"response": result})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # 5000 - port fallback, used when port not given in env or when flask ran manually
    app.run(host="0.0.0.0", port=port, debug=False) # debug reruns model and server can't catch moment of readiness so I turned it off
