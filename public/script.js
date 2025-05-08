// // Elements
// const toggleBtn = document.getElementById('chat-toggle');
// const chatbox = document.getElementById('chatbox');
// const closeBtn = document.getElementById('chat-close');
// const sendBtn = document.getElementById('send');
// const input = document.getElementById('message');
// const chat = document.getElementById('chat-messages');

// // Get customization config from global settings
// // const settings = window.ChatboxSettings || {};
// const settings = window.ChatboxSettings || {
//   position: 'right',
//   color: '#000',
//   companyInfo: '',
//   welcomeMessages: []
// };

// if (settings.position === 'left') {
//   chatbox.style.left = '25px';
//   toggleBtn.style.left = '25px';
//   chatbox.style.right = '';
//   toggleBtn.style.right = '';
// } else {
//   chatbox.style.right = '25px';
//   toggleBtn.style.right = '25px';
//   chatbox.style.left = '';
//   toggleBtn.style.left = '';
// }

// // === Apply Custom Styles ===
// document.body.style.fontFamily = settings.font || 'Segoe UI, sans-serif';
// chatbox.style[settings.position === 'left' ? 'left' : 'right'] = '25px';
// chatbox.classList.add(settings.theme === 'dark' ? 'dark' : 'light');

// // Apply header color
// if(toggleBtn && settings.color){
//   toggleBtn.style.backgroundColor = settings.color;
// }
// if(sendBtn && settings.color){
//   sendBtn.style.backgroundColor = settings.color;
// }
// const chatHeader = document.getElementById('chat-header');
// if (chatHeader && settings.color) {
//   chatHeader.style.backgroundColor = settings.color;
// }

// // Set title if needed
// const titleElement = chatHeader?.querySelector('h2');
// if (titleElement && settings.title) {
//   titleElement.textContent = settings.title;
// }

// // Show chatbox
// toggleBtn.addEventListener('click', () => {
//   chatbox.style.display = chatbox.style.display === 'flex' ? 'none' : 'flex';

//   // Show welcome message only once
//   if (!chat.dataset.started) {
//     const welcomeMsgs = settings.welcomeMessages || [
//       "👋 Hi there! I'm your assistant AI. Ask me anything!",
//       "💡 Your messages are also shared with the website owner, so we can help you better."
//     ];
//     welcomeMsgs.forEach(msg => addMessage(msg, 'bot'));
//     chat.dataset.started = "true";
//   }
// });
// // Hide chatbox
// closeBtn.addEventListener('click', () => {
//   chatbox.style.display = 'none';
// });

// // Send message on button click or Enter key
// sendBtn.addEventListener('click', sendMessage);
// input.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') sendMessage();
// });

// // === ✅ AI Integration ===
// function sendMessage() {
//   const text = input.value.trim();
//   if (!text) return;

//   addMessage(text, 'user');
//   input.value = '';
//   input.focus();

//   // Add loading animation
//   const loading = document.createElement('div');
//   loading.className = 'message bot';
//   loading.innerHTML = `
//     <div class="loading-dots">
//       <span></span><span></span><span></span>
//     </div>`;
//   chat.appendChild(loading);
//   scrollToBottom();

//   fetch('http://localhost:5000/api/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       message: text,
//       systemPrompt: settings.companyInfo || ''
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     loading.remove();
//     addMessage(data.reply || 'PLease Check Your internet Connection', 'bot');
//   })
//   .catch(err => {
//     loading.remove();
//     console.error('Error:', err);
//     addMessage("❌ AI server error", 'bot');
//   });
// }


// // Add message to chat and scroll to bottom
// function addMessage(text, type) {
//   const bubble = document.createElement('div');
//   bubble.classList.add('message', type);
//   bubble.textContent = text;

//   if (type === 'user' && settings.color) {
//     bubble.style.backgroundColor = settings.color;
//     bubble.style.color = settings.txtcolor; // or auto-detect contrast later
//   }

//   chat.appendChild(bubble);
//   scrollToBottom();
// }


// // Scroll to the latest message
// function scrollToBottom() {
//   chat.scrollTop = chat.scrollHeight;
// }

