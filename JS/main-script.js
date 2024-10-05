// script.js
function loadVideo() {
    const link = document.getElementById('youtube-link').value;
    const videoId = extractVideoId(link);
    if (videoId) {
        const iframe = `<iframe class="videobox" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        document.getElementById('video-container').innerHTML = iframe;
        fetchTranscript(videoId);
    }
}

function extractVideoId(url) {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');

chatInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const userMessage = chatInput.value;
        chatInput.value = '';

        // Display user message
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = `You: ${userMessage}`;
        chatOutput.appendChild(userMessageElement);

        // Fetch AI response
        const aiResponse = await fetchChatResponse(userMessage);

        // Display AI response
        const aiMessageElement = document.createElement('div');
        aiMessageElement.textContent = `AI: ${aiResponse}`;
        chatOutput.appendChild(aiMessageElement);

        // Scroll to the bottom of the chat output
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});

async function fetchChatResponse(message) {
    try {
        const response = await fetch('https://api.your-ai-service.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        return data.answer;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'Sorry, there was an error processing your request.';
    }
}
