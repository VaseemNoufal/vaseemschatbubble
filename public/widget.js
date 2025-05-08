(function () {
    const settings = window.ChatboxSettings || {};
    const themeColor = settings.color || "#0d6efd";
    const textColor = settings.txtcolor || "#fff";
    const font = settings.font || "Segoe UI, sans-serif";
    const title = settings.title || "Need Help?";
    const welcomeMessages = settings.welcomeMessages || [
      "👋 Hi there! I'm your assistant AI.",
      "💡 Your messages are shared with our team for better help."
    ];
    const position = settings.position === "left" ? "left" : "right";
    const theme = settings.theme === "dark" ? "dark" : "light";
    const systemPrompt = settings.companyInfo || "";
    const ours = settings.hellomessage || "Hey There, How can we help you!!";
//     const baseURL = window.location.hostname.includes("localhost") ? "" // 👈 your local backend server
//   : "https://hlo-world.vercel.app";
  
    const style = document.createElement("style");
    style.textContent = `
      #chat-toggle:hover { opacity: 0.9; }
      #chatbox .message.bot { background: #e2e3e5; color: #000; }
      #chatbox .message.user { background: ${themeColor}; color: ${textColor}; }
      #chatbox .loading-dots span { animation: blink 1.4s infinite both; margin-right: 2px; }
      #chatbox .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
      #chatbox .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
      @keyframes come {0%{ right: -100%; opacity: 0;}100%{ right: 25px; opacity: 1;}}
      @keyframes cometwo {0%{ right: -100%; opacity: 0;}100%{ right: 100px; opacity: 1;}}
      #chatbox{
        width: 27vw;
        height: 75vh;
      }
      .loading-dots {
    display: inline-block;
    width: 40px;
    text-align: center;
  }
    #chat-toggle{
        width: 28px;
        height: auto;
    }
    #chat-toggle img{
        width: 27px;
    }
  .loading-dots span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 1px;
    background-color: #999;
    border-radius: 100%;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  .loading-dots span:nth-child(1) {
    animation-delay: -0.32s;
  }
  .loading-dots span:nth-child(2) {
    animation-delay: -0.16s;
  }
  .loading-dots span:nth-child(3) {
    animation-delay: 0;
  }
  
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1.0); }
  }
     @keyframes mesa {
    0%{
      opacity: 0;
      margin-bottom: -10px;
    }
    100%{
      opacity: 1;
      margin-bottom: 4px;
    }
  }
    @media all and (max-width: 1190px){
        #chatbox{
            width: 37vw;
        }
    }
    @media all and (max-width: 980px){
        #chatbox{
            width: 47vw;
        }
        #chat-toggle{
            width: 38px;
            height: 38px;
        }
        #chat-toggle img{
            width: 34px;
        }
    }
    @media all and (max-width: 850px){
        #chatbox{
            height: 67vh;
        }
    }
    @media all and (max-width: 800px){
        #chatbox{
            width: 50vw;
        }
    }
    @media all and (max-width: 750px){
        #chatbox{
            height: 64vh;
        }
    }
    @media all and (max-width: 670px){
        #chatbox{
            width: 64vw;
            height: 65vh;
        }
    }
     @media all and (max-width: 480px){
        #chatbox{
            width: 74vw;
        }
    }
    `;
    document.head.appendChild(style);
  
    const toggle = document.createElement("div");
    toggle.id = "chat-toggle";
    toggle.innerHTML = `<img src="https://vaseemschatbubble.vercel.app/images/message-solid.svg" alt="Chat" style=" margin-top: 2px; filter: invert(1);">`;
    Object.assign(toggle.style, {
      position: "fixed",
      bottom: "25px",
      [position]: "25px",
      background: themeColor,
      color: textColor,
      fontSize: "24px",
      padding: "13px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: "1000",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    //   width: "28px",
    //   height: "auto",
    });
  
    const chatbox = document.createElement("div");
    chatbox.id = "chatbox";
    // chatbox.cssText = "@media all and (max-width: 1190px){ #chatbox{ width: 37vw;}}"
    chatbox.style.display = "none";
    chatbox.style.flexDirection = "column";
    chatbox.style.position = "fixed";
    chatbox.style.bottom = "100px";
    chatbox.style[position] = "25px";
    // chatbox.style.width = "27vw";
    // chatbox.style.height = "75vh";
    chatbox.style.background = "#fff";
    chatbox.style.borderRadius = "12px";
    chatbox.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
    chatbox.style.zIndex = "999";
    chatbox.style.overflow = "hidden";
    chatbox.style.fontFamily = font;
    chatbox.style.animation = "come .7s ease"
  
    chatbox.innerHTML = `
      <div id="chat-header" style="background:${themeColor};color:${textColor};padding:15px;display:flex;flex-direction:column;align-items:flex-start;">
        <h2 style="margin:0;font-size:18px;">${title}</h2>
        <p style="font-size:12px;margin:2px 0 0 0;opacity:0.8;">AI + Human Support</p>
        <span id="chat-close" style="position:absolute;right:15px;top:15px;cursor:pointer;font-size:20px;">✖</span>
      </div>
      <div id="chat-messages" style="flex:1;padding:10px;overflow-y:auto;background:#f8f9fa;display:flex;flex-direction:column;gap:8px;"></div>
      <div id="chat-input" style="display:flex;border-top:1px solid #ccc;padding:10px;background:#fff;">
        <input type="text" id="message" placeholder="Type your message..." style="flex:1;padding:8px 12px;border:1px solid #ccc;border-radius:20px;outline:none;" />
        <button id="send" style="height:40px;background:${themeColor};color:white;border:none;padding:10px;margin-left:8px;border-radius:50%;font-size:18px;cursor:pointer;width:auto;display:flex;align-items:center;">➤</button>
      </div>
      <p class="info-note" style="font-size:11px;color:#555;text-align:center;margin:4px 0 8px 0;padding:5px;">
        🔒 Messages are answered by AI and also shared with our team.
      </p>
    `;
  
    document.body.appendChild(toggle);
    document.body.appendChild(chatbox);
    const ourmsg = document.createElement("div");
    ourmsg.classList.add("ourmsg");
    ourmsg.innerHTML = `<h4 style="color: grey; font-size: 13px; font-family: tahoma;">${ours}</h4><div style = "position: absolute; top: -7px; right: -8px; cursor: pointer; display: flex; align-items: center; justify-content: center; background-color: rgb(199, 199, 199); border-radius: 50%; height: 20px; width: 20px; "><p style="font-size: 13px; color: #636363;">✖</p></div>`
    ourmsg.style.position = "fixed";
    ourmsg.style.minWidth = "20vh";
    ourmsg.style.maxWidth = "fit-content";
    ourmsg.style.padding = "8px";
    ourmsg.style.backgroundColor = "rgb(227 225 225)";
    ourmsg.style.right = "100px";
    ourmsg.style.bottom = "30px";
    ourmsg.style.height = "20px";
    ourmsg.style.display = "flex";
    ourmsg.style.alignItems = "center";
    ourmsg.style.justifyContent = "center";
    ourmsg.style.borderRadius = "5px";
    ourmsg.style.boxShadow = "1px 1px 10px rgba(0, 0, 0, 0.2)";
    ourmsg.style.animation = "cometwo 1s ease";
    document.body.appendChild(ourmsg)
  
    const closeBtn = chatbox.querySelector("#chat-close");
    const sendBtn = chatbox.querySelector("#send");
    const input = chatbox.querySelector("#message");
    const chat = chatbox.querySelector("#chat-messages");
    const idk = ourmsg;
    
    idk.addEventListener("click", () =>{
        idk.style.display = "none";
    })
  
    function addMessage(text, type) {
      const bubble = document.createElement("div");
      bubble.className = `message ${type}`;
      bubble.textContent = text;
      bubble.style.padding = "10px 14px";
      bubble.style.borderRadius = "15px";
      bubble.style.marginBottom = "4px";
      bubble.style.maxWidth = "75%";
      bubble.style.wordWrap = "break-word";
      bubble.style.fontSize = "15px";
      bubble.style.alignSelf = type === "user" ? "flex-end" : "flex-start";
      bubble.style.background = type === "user" ? themeColor : "#e2e3e5";
      bubble.style.color = type === "user" ? textColor : "#000";
      bubble.style.animation = "mesa .5s ease"
      chat.appendChild(bubble);
      chat.scrollTop = chat.scrollHeight;
    }
  
    function sendMessage() {
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";
  
      const loading = document.createElement("div");
      loading.className = "message bot";
      loading.style.padding = "10px 14px";
      loading.style.maxWidth = "fit-content";
      loading.style.marginBottom = "4px";
      loading.style.borderRadius = "15px";
      loading.style.animation = "mesa .5s ease"
      loading.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`;
      chat.appendChild(loading);
      chat.scrollTop = chat.scrollHeight;
  
      fetch("https://vaseemschatbubble.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, systemPrompt }),
      })
        .then((res) => res.json())
        .then((data) => {
          loading.remove();
          addMessage(data.reply || "⚠️ No response from AI", "bot");
        })
        .catch((err) => {
          loading.remove();
          addMessage("❌ AI server error", "bot");
          console.error(err);
        });
    }
  
    toggle.addEventListener("click", () => {
      chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
      if (!chat.dataset.started) {
        welcomeMessages.forEach((msg) => addMessage(msg, "bot"));
        chat.dataset.started = "true";
      }
    });
  
    closeBtn.addEventListener("click", () => (chatbox.style.display = "none"));
    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  })();
  