<template>
  <div class="mentor-wrapper">
    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <div class="bot-info">
            <img src="/bot.jpg" onerror="this.src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png'" alt="Mentor" class="bot-avatar-img" />
            <div>
              <h3>Study Buddy</h3>
              <span class="status">● Here to help!</span>
            </div>
          </div>
          <button class="close-btn" @click="isOpen = false">✕</button>
        </div>

        <div class="messages-area" ref="messagesContainer">
          <div 
            v-for="(msg, index) in messages" 
            :key="index" 
            class="message"
            :class="msg.isUser ? 'user' : 'bot'"
          >
            <div class="bubble">
              {{ msg.text }}
            </div>
            <span class="time">{{ msg.time }}</span>
          </div>
          
          <div v-if="isTyping" class="message bot">
            <div class="bubble typing">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
        </div>

        <div class="input-area">
          <input 
            v-model="newMessage" 
            @keyup.enter="sendMessage"
            placeholder="Ask me anything..." 
            type="text"
          />
          <button @click="sendMessage">💬</button>
        </div>
      </div>
    </transition>

    <button class="mentor-fab" @click="isOpen = !isOpen" :class="{ open: isOpen }">
      <img v-if="!isOpen" src="/bot.jpg" onerror="this.src='https://cdn-icons-png.flaticon.com/512/4712/4712109.png'" class="fab-icon" />
      <span v-else>✕</span>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const newMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)

// FRIENDLY INITIAL MESSAGE
const messages = ref([
  { text: "Hey there! 👋 I'm your personal guide. Stuck on a concept or need a hint? Just ask!", isUser: false, time: 'Just now' }
])

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// SUPPORTIVE RESPONSES
const generateResponse = (text) => {
  const lower = text.toLowerCase()
  if (lower.includes('hello') || lower.includes('hi')) return "Hi! Ready to crush some code today? 🚀"
  if (lower.includes('python')) return "Python is awesome! 🐍 Don't worry if it gets tricky, just take it one step at a time. Try the 'Basics' module!"
  if (lower.includes('stuck') || lower.includes('hard')) return "Take a deep breath! 🧠 Programming is hard, but you've got this. Try breaking the problem into tiny pieces."
  if (lower.includes('thanks')) return "Anytime! You're doing great work. ✨"
  return "That's a great question! I'd suggest checking the roadmap or looking at the docs. Keep going!"
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    text: newMessage.value,
    isUser: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  
  const userText = newMessage.value
  newMessage.value = ''
  scrollToBottom()

  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      text: generateResponse(userText),
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  }, 1200)
}
</script>

<style scoped>
.mentor-wrapper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Inter', sans-serif; /* Back to clean font */
}

/* --- FRIENDLY FLOATING BUTTON --- */
.mentor-fab {
  width: 70px;
  height: 70px;
  border-radius: 50%; /* Perfectly round */
  background: var(--bg-secondary);
  border: 4px solid var(--accent-color);
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  display: flex; justify-content: center; align-items: center;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}

.fab-icon { width: 100%; height: 100%; object-fit: cover; }

.mentor-fab:hover { 
  transform: scale(1.1) rotate(-5deg); /* Playful tilt */
}
.mentor-fab.open { 
  background: var(--bg-secondary);
  border-color: var(--text-secondary);
  color: var(--text-primary);
  font-size: 24px;
  transform: rotate(90deg);
}

/* --- FRIENDLY CHAT WINDOW --- */
.chat-window {
  width: 340px;
  height: 480px;
  background: var(--bg-primary); 
  border: 2px solid var(--border-color);
  border-radius: 20px; /* Rounded friendly corners */
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
  overflow: hidden;
}

/* Header */
.chat-header {
  padding: 15px 20px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  display: flex; justify-content: space-between; align-items: center;
}
.bot-info { display: flex; gap: 12px; align-items: center; }
.bot-avatar-img {
  width: 45px; height: 45px; 
  border-radius: 50%; 
  border: 2px solid var(--accent-color);
  object-fit: cover;
}
.chat-header h3 { margin: 0; font-size: 1.1rem; color: var(--text-primary); }
.status { font-size: 0.8rem; color: #10b981; font-weight: 500; }
.close-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 1.2rem; }

/* Messages */
.messages-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex; flex-direction: column; gap: 15px;
  background: var(--bg-primary);
}

.message { display: flex; flex-direction: column; max-width: 85%; }
.message.bot { align-self: flex-start; }
.message.user { align-self: flex-end; align-items: flex-end; }

/* FRIENDLY BUBBLES */
.bubble {
  padding: 14px 18px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.bot .bubble { 
  background: var(--bg-secondary); 
  color: var(--text-primary); 
  border-bottom-left-radius: 4px; /* Message tail */
}

.user .bubble { 
  background: var(--accent-color); 
  color: white; 
  border-bottom-right-radius: 4px; /* Message tail */
}

.time { font-size: 0.7rem; color: var(--text-secondary); margin-top: 5px; margin-left: 5px; }

/* Soft Typing Dots */
.typing span {
  animation: bounce 1.4s infinite ease-in-out both;
  margin: 0 3px; font-size: 0.6rem; color: var(--text-secondary);
}
.typing span:nth-child(1) { animation-delay: -0.32s; }
.typing span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

/* Input */
.input-area {
  padding: 15px;
  border-top: 1px solid var(--border-color);
  display: flex; gap: 10px;
  background: var(--bg-secondary);
}
.input-area input {
  flex: 1;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px 15px; 
  border-radius: 25px; /* Pill shape */
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}
.input-area input:focus { border-color: var(--accent-color); }

.input-area button {
  background: transparent; border: none; cursor: pointer; font-size: 1.4rem;
  transition: transform 0.2s;
}
.input-area button:hover { transform: scale(1.2) rotate(10deg); }

/* Transitions */
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1); }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(30px) scale(0.95); }
</style>
