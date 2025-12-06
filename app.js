document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(e){
    if(e.key === "Enter") sendMessage();
});

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatbox = document.getElementById("chatbox");

    if (!input.value.trim()) return;

    chatbox.innerHTML += `<div class="message user">${input.value}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input.value })
    });

    const data = await response.json();

    chatbox.innerHTML += `<div class="message bot">${data.reply}</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;

    input.value = "";
}
