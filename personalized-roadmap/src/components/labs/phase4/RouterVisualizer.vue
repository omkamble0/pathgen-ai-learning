<template>
  <div class="router-lab">
    <div class="lab-header">
      <div class="mission-title">AUTH GUARD INTERCEPTOR</div>
      <div class="telemetry">
        <div class="status-badge" :class="isSecure ? 'status-safe' : 'status-danger'">
          URL: {{ isSecure ? 'https://pathgen.com/login' : 'https://pathgen.com/dashboard' }}
        </div>
      </div>
    </div>

    <div class="lab-layout">
      <div class="canvas-panel">
        <div class="browser-window">
          <div class="browser-bar">
            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
            <div class="url-bar">{{ isSecure ? '/login' : '/dashboard' }}</div>
          </div>
          <div class="browser-content" :class="{ 'hacked-bg': !isSecure, 'secure-bg': isSecure }">
            <div v-if="!isSecure" class="intruder-alert">
              <h2>⚠️ UNAUTHORIZED ACCESS</h2>
              <p>User Token: NULL</p>
              <div class="scanning-laser"></div>
            </div>
            <div v-else class="secure-state">
              <h2>🔒 REDIRECT SUCCESSFUL</h2>
              <p>Intruder routed to Login.</p>
              <p>History Stack Overwritten.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="console-panel">
        <p class="instruction">TARGET: The user is not authenticated. Inject the component to redirect them to '/login' and overwrite the history stack so they can't click 'Back'.</p>
        
        <div class="code-editor">
          <div class="code-line"><span class="keyword">const</span> <span class="func">ProtectedRoute</span> = ({ children }) => {</div>
          <div class="code-line">&nbsp;&nbsp;<span class="keyword">const</span> { isAuth } = <span class="func">useContext</span>(AuthContext);</div>
          <br>
          <div class="code-line">&nbsp;&nbsp;<span class="keyword">if</span> (!isAuth) {</div>
          <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Inject redirect component below:</span></div>
          <div class="input-line">
            <span class="keyword">return</span> &lt;
            <input 
              v-model="userInput" 
              @keyup.enter="verifyInjection"
              placeholder="Navigate to..." 
              class="cyber-input"
              :disabled="isSecure"
              autocomplete="off"
            />
            &gt;;
          </div>
          <div class="code-line">&nbsp;&nbsp;}</div>
          <br>
          <div class="code-line">&nbsp;&nbsp;<span class="keyword">return</span> children;</div>
          <div class="code-line">};</div>
        </div>

        <button @click="verifyInjection" class="inject-btn" :disabled="isSecure">
          {{ isSecure ? 'NETWORK SECURED' : 'DEPLOY INTERCEPTOR' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('');
const isSecure = ref(false);

const emit = defineEmits(['lab-completed']);

const verifyInjection = () => {
  // Check if they typed the correct React Router Navigate component
  const input = userInput.value.trim();
  const hasNavigate = input.includes('Navigate');
  const hasTo = input.includes('to="/login"') || input.includes("to='/login'");
  const hasReplace = input.includes('replace');

  if (hasNavigate && hasTo && hasReplace) {
    isSecure.value = true;
    setTimeout(() => {
      emit('lab-completed'); 
    }, 2500);
  } else {
    // Flash red or reset on fail
    userInput.value = '';
    alert("SYSTEM FAILURE: Check your syntax. You need Navigate, a 'to' prop pointing to /login, and the 'replace' keyword.");
  }
};
</script>

<style scoped>
.router-lab { background: #020617; border-radius: 8px; font-family: 'Fira Code', monospace; padding: 20px; color: #E2E8F0; }

/* Header */
.lab-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 15px; margin-bottom: 20px; }
.mission-title { color: #F59E0B; font-weight: bold; letter-spacing: 1px; }
.status-badge { padding: 5px 15px; border-radius: 4px; font-weight: bold; font-size: 0.9rem; }
.status-danger { background: rgba(239, 68, 68, 0.2); color: #EF4444; border: 1px solid #EF4444; }
.status-safe { background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid #10B981; }

.lab-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

/* Left Canvas - Browser Mockup */
.canvas-panel { background: #0F172A; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; }
.browser-bar { background: #1E293B; padding: 10px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #334155; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.red { background: #EF4444; } .yellow { background: #F59E0B; } .green { background: #10B981; }
.url-bar { background: #020617; padding: 4px 15px; border-radius: 12px; font-size: 0.85rem; color: #94A3B8; margin-left: 10px; flex-grow: 1; }

.browser-content { flex-grow: 1; display: flex; justify-content: center; align-items: center; position: relative; text-align: center; }
.hacked-bg { background: repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05) 10px, transparent 10px, transparent 20px); }
.secure-bg { background: rgba(16, 185, 129, 0.05); }

.intruder-alert h2 { color: #EF4444; margin: 0 0 10px 0; text-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }
.secure-state h2 { color: #10B981; margin: 0 0 10px 0; }
.scanning-laser { width: 100%; height: 2px; background: #EF4444; position: absolute; top: 0; left: 0; box-shadow: 0 0 10px #EF4444; animation: scan 2s infinite alternate ease-in-out; }
@keyframes scan { 0% { top: 10%; } 100% { top: 90%; } }

/* Right Console */
.console-panel { background: #1E293B; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; }
.instruction { color: #94A3B8; font-size: 0.9rem; margin-top: 0; margin-bottom: 20px; line-height: 1.5; }
.code-editor { background: #0F172A; padding: 20px; border-radius: 6px; flex-grow: 1; border: 1px solid #334155; font-size: 0.95rem; }
.code-line { margin-bottom: 5px; }
.comment { color: #64748B; } .keyword { color: #C678DD; } .func { color: #61AFEF; }
.input-line { margin: 10px 0; padding-left: 15px; display: flex; align-items: center; }
.cyber-input { background: transparent; border: none; border-bottom: 2px solid #F59E0B; color: #F59E0B; font-family: inherit; font-size: 1rem; width: 220px; outline: none; padding: 0 5px; margin: 0 5px; }
.cyber-input:focus { border-bottom-color: #10B981; color: #10B981; }

.inject-btn { margin-top: 15px; padding: 12px; background: #F59E0B; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background 0.3s; }
.inject-btn:disabled { background: #10B981; color: white; cursor: not-allowed; }
</style>
