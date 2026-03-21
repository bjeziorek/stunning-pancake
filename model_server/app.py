from flask import Flask, request, jsonify
from flask_cors import CORS
from gpt2_model import generate_text

app = Flask(__name__)
CORS(app)

@app.route("/api/echo", methods=["POST"])
def echo():
    data = request.json
    text = data.get("text", "")
    return jsonify({"response": f"Odebrałem: {text}"})

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json
    prompt = data.get("text", "")
    result = generate_text(prompt)
    return jsonify({"response": result})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
