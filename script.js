document.getElementById("send-btn").addEventListener("click", function() {
    let userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;
    
    let chatBox = document.getElementById("chat-box");
    let userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = "";
    
    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": ""
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: `Suggest places to visit in Boston based on: ${userInput} `,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        let aiMessage = `<div><strong>AI:</strong> ${data.choices[0].text}</div>`;
        chatBox.innerHTML += aiMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        let errorMessage = `<div><strong>AI:</strong> Sorry, I couldn't fetch a response.</div>`;
        chatBox.innerHTML += errorMessage;
    });
});