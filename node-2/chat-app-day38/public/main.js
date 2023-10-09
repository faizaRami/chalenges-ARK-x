const socket = io();
      // Listen for user-connected events
      socket.on("user-connected", (data) => {
        console.log(
          `${data.username} connected with socket id ${data.socketId}`
        );
        // Display user connection notification in your UI
        const usernameElement = document.createElement("p");
        usernameElement.className = "user-connected";
        usernameElement.textContent = data.username;
        document.body.appendChild(usernameElement);
      });

      // Listen for user-disconnected events
      socket.on("user-disconnected", (data) => {
        console.log(
          `${data.username} disconnected from socket id ${data.socketId}`
        );
        // Find the <span> element with the disconnected user's username
        const usernameElements = document.querySelectorAll(".user-connected");
        usernameElements.forEach((element) => {
          if (element.textContent === data.username) {
            element.style.fontWeight = "900" ; 
            element.style.color = "red"; // You can choose any color you like
          }
        });
      });

      // Function to send a chat message
      function sendMessage() {
        const messageInput = document.getElementById("chat-input");
        if (messageInput.value.length == 0) {
          alert("Write your Message");
        } else {
          const message = messageInput.value;
          socket.emit("message", message);
          messageInput.value = "";
        }
      }

      // Function to display incoming chat messages
      socket.on("message", (data) => {
        const chatMessages = document.getElementById("chat-messages");
        const messageElement = document.createElement("div");
        messageElement.innerText = `${data.from}: ${data.text}`;
        chatMessages.appendChild(messageElement);
      });
