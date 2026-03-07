<template>
  <div class="jank-buster-lab">
    <div class="lab-header">
      <div class="mission-title">THE JANK-BUSTER PROFILER</div>
      <div class="telemetry">
        <div class="fps-badge" :class="isFixed ? 'fps-good' : 'fps-critical'">
          FPS: {{ isFixed ? '60.0' : '12.4' }}
        </div>
      </div>
    </div>

    <div class="lab-layout">
      <div class="canvas-panel">
        <div v-if="!isFixed" class="radiation-overlay"></div>
        <div class="particle-system" :class="{ 'jank-active': !isFixed }">
          <div v-for="n in 50" :key="n" class="dot" :style="getDotStyle(n)"></div>
        </div>
      </div>

      <div class="console-panel">
        <p class="warning-text" v-if="!isFixed">⚠️ MAIN THREAD BLOCKED</p>
        <p class="success-text" v-else>✅ SYSTEM STABILIZED</p>
        
        <div class="code-editor">
          <div class="code-line"><span class="comment">// The Heavy Filter Operation</span></div>
          <div class="code-line"><span class="keyword">const</span> visibleDots = </div>
          <div class="input-line">
            <input 
              v-model="userInput" 
              @keyup.enter="verifyInjection"
              placeholder="Inject Hook..." 
              class="cyber-input"
              :disabled="isFixed"
              autocomplete="off"
            />
          </div>
          <div class="code-line">(() => {</div>
          <div class="code-line">&nbsp;&nbsp;<span class="keyword">return</span> allDots.filter(d => performPhysics(d));</div>
          <div class="code-line">}, [physicsModel]);</div>
        </div>

        <button @click="verifyInjection" class="inject-btn" :disabled="isFixed">
          {{ isFixed ? 'MISSION CLEARED' : 'INJECT MEMOIZATION' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('');
const isFixed = ref(false);

const emit = defineEmits(['lab-completed']);

// Checks if the user typed the right answer
const verifyInjection = () => {
  if (userInput.value.trim() === 'useMemo') {
    isFixed.value = true;
    setTimeout(() => {
      emit('lab-completed'); 
    }, 2000);
  } else {
    userInput.value = ''; 
  }
};

// Generates random starting positions for the dots
const getDotStyle = (n) => {
  return {
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    animationDuration: `${3 + Math.random() * 4}s`,
    animationDelay: `-${Math.random() * 2}s`
  };
};
</script>

<style scoped>
.jank-buster-lab { background: #020617; border-radius: 8px; font-family: 'Fira Code', monospace; padding: 20px; color: #E2E8F0; }

.lab-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 15px; margin-bottom: 20px; }
.mission-title { color: #10B981; font-weight: bold; letter-spacing: 1px; }
.fps-badge { padding: 4px 10px; border-radius: 4px; font-weight: bold; }
.fps-critical { background: rgba(239, 68, 68, 0.2); color: #EF4444; border: 1px solid #EF4444; animation: blink 0.5s infinite; }
.fps-good { background: rgba(16, 185, 129, 0.2); color: #10B981; border: 1px solid #10B981; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

.lab-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.canvas-panel { background: #0F172A; border: 1px solid #334155; border-radius: 8px; position: relative; height: 300px; overflow: hidden; }
.radiation-overlay { position: absolute; inset: 0; box-shadow: inset 0 0 50px rgba(239, 68, 68, 0.3); pointer-events: none; }
.particle-system { width: 100%; height: 100%; position: relative; }
.dot { position: absolute; width: 6px; height: 6px; background: #3B82F6; border-radius: 50%; animation-name: drift; animation-iteration-count: infinite; }

/* The CSS trick that makes the dots lag */
.jank-active .dot { animation-timing-function: steps(10) !important; background: #EF4444; }
.particle-system:not(.jank-active) .dot { animation-timing-function: linear !important; }

@keyframes drift { 0% { transform: translate(0, 0); } 50% { transform: translate(150px, -50px); } 100% { transform: translate(0, 0); } }

.console-panel { background: #1E293B; border-radius: 8px; padding: 20px; display: flex; flex-direction: column; }
.warning-text { color: #EF4444; font-weight: bold; margin-top: 0; }
.success-text { color: #10B981; font-weight: bold; margin-top: 0; }
.code-editor { background: #0F172A; padding: 15px; border-radius: 6px; flex-grow: 1; border: 1px solid #334155; }
.code-line { margin-bottom: 5px; }
.comment { color: #64748B; } .keyword { color: #C678DD; }
.input-line { margin: 10px 0; padding-left: 20px; }
.cyber-input { background: transparent; border: none; border-bottom: 2px solid #3B82F6; color: #10B981; font-family: inherit; font-size: 1rem; width: 150px; outline: none; }
.inject-btn { margin-top: 15px; padding: 12px; background: #3B82F6; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
.inject-btn:disabled { background: #10B981; cursor: not-allowed; }
</style>
