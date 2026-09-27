import os
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

app = Flask(__name__)

# Set OPENAI_API_KEY as an environment variable. Never paste your API key into GitHub.
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    if not os.environ.get("OPENAI_API_KEY"):
        return jsonify({"reply": "The AI API key is not configured yet. Set OPENAI_API_KEY on your computer or hosting platform."}), 500

    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()

    if not message:
        return jsonify({"reply": "Please type a message first."}), 400

    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=[
                {"role": "system", "content": "You are Nova, a helpful general-purpose AI assistant. Give clear, friendly, accurate answers."},
                {"role": "user", "content": message}
            ]
        )
        return jsonify({"reply": response.output_text})
    except Exception:
        app.logger.exception("AI request failed")
        return jsonify({"reply": "Sorry, I couldn't get a response. Check your API key, account access, and server logs."}), 500

if __name__ == "__main__":
    app.run(debug=True)
