# Nova AI

Nova is a simple general-purpose AI assistant web app built with HTML, CSS, JavaScript, Python Flask, and the OpenAI API.

## Features
- Chat-style interface
- Responsive design for desktop and mobile
- Suggested prompts
- Flask backend endpoint for AI responses

## Project structure
```text
Novai/
├── app.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Run locally
1. Install Python 3.10 or newer.
2. Open a terminal in this project folder.
3. Create and activate a virtual environment (optional but recommended):
   - Windows: `python -m venv .venv`
   - Windows PowerShell: `.\.venv\Scripts\Activate.ps1`
4. Install dependencies: `pip install -r requirements.txt`
5. Set your API key in the terminal (PowerShell):
   `$env:OPENAI_API_KEY="your_api_key_here"`
6. Run: `python app.py`
7. Open `http://127.0.0.1:5000` in your browser.

## Important security note
Never upload your real API key, `.env` file, passwords, or private credentials to GitHub. Add the key as an environment variable on your hosting provider. API usage may incur charges depending on your account and provider.

## Deployment
This app needs a Python-capable host (for example, a service that supports Flask). GitHub Pages and Netlify static hosting alone do not run the Python backend. Configure `OPENAI_API_KEY` as a secret/environment variable on your backend host.
