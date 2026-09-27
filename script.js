const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("chatMessages");
const sendBtn = document.getElementById("sendBtn");
const welcome = document.getElementById("welcome");

function addBubble(text, role) {
  if (welcome && welcome.isConnected) welcome.remove();
  const bubble = document.createElement("div");
  bubble.className = `bubble ${role}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

async function sendMessage(message) {
  const clean = message.trim();
  if (!clean) return;

  addBubble(clean, "user");
  input.value = "";
  input.style.height = "auto";
  sendBtn.disabled = true;
  const waiting = addBubble("Nova is thinking…", "assistant");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: clean})
    });
    const data = await response.json();
    waiting.textContent = data.reply || "No response received.";
  } catch (error) {
    waiting.textContent = "Could not connect to the server. Make sure the Flask app is running.";
  } finally {
    sendBtn.disabled = false;
    input.focus();
    messages.scrollTop = messages.scrollHeight;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(input.value);
});

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 180) + "px";
});

document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

document.getElementById("clearBtn").addEventListener("click", () => {
  messages.innerHTML = "";
  const intro = document.createElement("div");
  intro.className = "welcome";
  intro.innerHTML = '<div class="sparkle">✦</div><h1>What can I help you with?</h1><p>Ask Nova anything or choose a suggestion below.</p><div class="suggestions"><button class="suggestion" data-prompt="Explain artificial intelligence in simple words.">Explain AI simply</button><button class="suggestion" data-prompt="Give me 5 ideas for a student project using AI.">Student project ideas</button><button class="suggestion" data-prompt="Help me write a professional email for an internship.">Write an email</button></div>';
  messages.appendChild(intro);
  intro.querySelectorAll(".suggestion").forEach(button => button.addEventListener("click", () => sendMessage(button.dataset.prompt)));
});
