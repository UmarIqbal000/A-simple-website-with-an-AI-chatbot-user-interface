document.getElementById('send-btn').addEventListener('click', sendMessage);
const messagesContainer = document.getElementById('messages');

async function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;

  // Append user message
  appendMessage(userInput, 'user');

  // Clear input field
  document.getElementById('user-input').value = '';

  // Fetch bot response
  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    appendMessage(data.response, 'bot');
  } catch (error) {
    appendMessage('Error fetching response', 'bot');
  }
}

function appendMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.textContent = text;
  messagesContainer.appendChild(message);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll
}
