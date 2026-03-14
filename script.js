const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const themeBtn = document.getElementById("theme-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;

/* Load previous chats */

const loadDataFromLocalstorage = () => {

    chatContainer.innerHTML = localStorage.getItem("all-chats") || "";

    chatContainer.scrollTop = chatContainer.scrollHeight;

};

loadDataFromLocalstorage();


/* Create chat message */

const createMessage = (message, className) => {

    const div = document.createElement("div");

    div.classList.add("chat", className);

    div.innerHTML = message;

    return div;

};


/* Get AI response */

const getChatResponse = async (incomingDiv) => {

    const pElement = incomingDiv.querySelector("p");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userText
            })

        });

        const data = await response.json();

        pElement.textContent = data.reply;

    } catch (error) {

        pElement.textContent = "Error contacting AI server.";

    }

    localStorage.setItem("all-chats", chatContainer.innerHTML);

};


/* Show typing animation */

const showTypingAnimation = () => {

    const html = `
    <div class="chat-content">
        <div class="chat-details">
            <img src="https://www.pngall.com/wp-content/uploads/15/ChatGPT-Logo-PNG-File.png">
            <p>Typing...</p>
        </div>
    </div>`;

    const incomingDiv = createMessage(html, "incoming");

    chatContainer.appendChild(incomingDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    getChatResponse(incomingDiv);

};


/* Handle user message */

const handleOutgoingChat = () => {

    userText = chatInput.value.trim();

    if (!userText) return;

    const html = `
    <div class="chat-content">
        <div class="chat-details">
            <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png">
            <p>${userText}</p>
        </div>
    </div>`;

    const outgoingDiv = createMessage(html, "outgoing");

    chatContainer.appendChild(outgoingDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;

    chatInput.value = "";

    setTimeout(showTypingAnimation, 600);

};


/* Send button */

sendBtn.addEventListener("click", handleOutgoingChat);


/* Enter key */

chatInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        handleOutgoingChat();

    }

});

const clearChatBtn = document.getElementById("clear-chat");

clearChatBtn.addEventListener("click", () => {

localStorage.removeItem("all-chats");

chatContainer.innerHTML = "";

});

document.getElementById("new-chat").onclick = () => {

chatContainer.innerHTML = "";

localStorage.removeItem("all-chats");

};


/* Theme toggle */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

});