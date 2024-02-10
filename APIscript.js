const apiKey = 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;
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const userMessage = userInput.value;
    appendMessage('user', userMessage);

    // Make API call to ChatGPT
    $.ajax({
        method: 'POST',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        data: JSON.stringify({
            messages: [{ role: 'system', content: 'You are a chatbot.' }, { role: 'user', content: userMessage }]
        }),
        success: function (data) {
            const botMessage = data.choices[0].message.content;
            appendMessage('bot', botMessage);
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function appendMessage(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
    messageElement.innerText = content;
    chatHistory.appendChild(messageElement);
    userInput.value = '';  // Clear input field
}
