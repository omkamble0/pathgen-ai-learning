<template>
  <div class="module-page">
    
    <header class="module-header">
      <button class="back-btn" @click="$router.push('/roadmap')">← Map</button>
      <div class="header-content">
        <span class="badge">ACTIVE OPERATION</span>
        <h1 v-if="isLoading">Decrypting Database...</h1>
        <h1 v-else-if="fetchError" class="text-red">Connection Failed</h1>
        <h1 v-else>{{ moduleData.title }}</h1>
      </div>
    </header>

    <div v-if="isLoading" class="loading-screen">
      <div class="spinner"></div>
      <p>Extracting intelligence...</p>
    </div>

    <div v-else-if="fetchError" class="error-screen">
      <p>{{ fetchError }}</p>
      <button @click="$router.push('/roadmap')" class="retry-btn">Abort Mission</button>
    </div>

    <div v-else-if="moduleData" class="terminal-container">
      
      <section class="briefing-panel" v-if="currentStep === 'briefing'">
        <div class="panel-header">
          <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          <span class="title">intel_briefing.md</span>
        </div>
        <div class="panel-body">
          <div class="article-content" v-html="moduleData.article_html"></div>
          
          <div v-if="moduleId === 'w5'" class="interactive-labs-container">
            <h3 class="labs-header">Interactive Engineering Labs</h3>
            <div class="visualizer-box" :class="{'solved-border': scaleSolved}">
              <h4 class="vis-title">🚀 Lab 1: The Operator Scale</h4>
              <p class="vis-desc">
                <strong>Mission:</strong> Force the engine to output <strong style="color: #EF4444;">NaN</strong>.
                <span v-if="scaleSolved" class="success-text"> ✅ Mission Accomplished!</span>
              </p>
              <div class="coercion-lab">
                <select v-model="scaleLeft" class="lab-select"><option value="5">5 (Number)</option><option value='"5"'>"5" (String)</option><option value='"Apple"'>"Apple" (String)</option></select>
                <select v-model="scaleOp" class="lab-select op-select"><option value="+">+</option><option value="-">-</option><option value="*">*</option></select>
                <select v-model="scaleRight" class="lab-select"><option value="5">5 (Number)</option><option value='"5"'>"5" (String)</option><option value="true">true (Boolean)</option></select>
                <div class="arrow">➔</div>
                <div class="lab-result" :class="{'string-res': scaleResult.includes('&quot;'), 'nan-res': scaleResult === 'NaN'}">{{ scaleResult }}</div>
              </div>
            </div>

            <div class="visualizer-box" :class="{'solved-border': labSolved}">
              <h4 class="vis-title">🧪 Lab 2: The Coercion Matrix</h4>
              <p class="vis-desc">
                <strong>Mission:</strong> Prove that an empty Array loosely equals a Boolean.
                <span v-if="labSolved" class="success-text"> ✅ Mission Accomplished!</span>
              </p>
              <div class="coercion-lab">
                <select v-model="labLeft" class="lab-select"><option value="[]">[] (Array)</option><option value="0">0 (Number)</option><option value="null">null</option></select>
                <select v-model="labOperator" class="lab-select op-select"><option value="+">+</option><option value="==">==</option></select>
                <select v-model="labRight" class="lab-select"><option value="{}">{} (Object)</option><option value="false">false (Boolean)</option><option value="undefined">undefined</option></select>
                <div class="arrow">➔</div>
                <div class="lab-result">{{ calculatedLabResult }}</div>
              </div>
            </div>
          </div>

          <div v-if="moduleId === 'w7'" class="interactive-labs-container">
            <h3 class="labs-header">The Engine Room</h3>
            <div class="visualizer-box">
              <h4 class="vis-title">⚙️ Lab 1: The Loop Pistons</h4>
              <p class="vis-desc">Click to step through the exact 4-phase mechanical firing order of a <code>for</code> loop.</p>
              <div class="piston-container">
                <div class="piston" :class="{'active-piston': pistonStep === 0}">1. Init<br><span class="piston-code">let i=0</span></div>
                <div class="piston" :class="{'active-piston': pistonStep === 1}">2. Condition<br><span class="piston-code">i &lt; 10</span></div>
                <div class="piston" :class="{'active-piston': pistonStep === 2}">3. Payload<br><span class="piston-code">{ ... }</span></div>
                <div class="piston" :class="{'active-piston': pistonStep === 3}">4. Increment<br><span class="piston-code">i++</span></div>
              </div>
              <div class="piston-controls">
                <button class="sim-btn submit-sim" @click="firePiston">Fire Next Step ➔</button>
                <span class="piston-status">Cycle: {{ pistonCycle }}</span>
              </div>
            </div>

            <div class="visualizer-box">
              <h4 class="vis-title">🏭 Lab 2: The Assembly Line</h4>
              <p class="vis-desc"><code>.map(crate => crate * 2)</code> creates a <strong>brand new array</strong>.</p>
              <div class="assembly-container">
                <div class="belt">
                  <div class="belt-label">Raw Data</div>
                  <div class="crate raw">1</div><div class="crate raw">2</div><div class="crate raw">3</div>
                </div>
                <button class="sim-btn submit-sim" @click="runMap" :disabled="mapRunning">Run .map()</button>
                <div class="belt">
                  <div class="belt-label">New Array</div>
                  <div class="crate mapped" :class="{'visible': mapStep >= 1}">2</div>
                  <div class="crate mapped" :class="{'visible': mapStep >= 2}">4</div>
                  <div class="crate mapped" :class="{'visible': mapStep >= 3}">6</div>
                </div>
              </div>
            </div>

          </div>

          <button class="puzzle-trigger-btn" @click="completeBriefing">
  {{ (moduleData.minigame_json && moduleId !== 'w16') ? 'PUZZLE ➔' : 'SECURITY CLEARANCE ➔' }}
</button>
        </div>
      </section>

      <section class="minigame-panel arcade-cabinet" v-if="currentStep === 'minigame'">
        <div class="arcade-screen">
          <div class="scanlines"></div>
          
          <div class="arcade-header">
            <div class="glitch-title">{{ moduleData.minigame_json.title.toUpperCase() }}</div>
            <div class="mission-brief">TARGET: {{ moduleData.minigame_json.instruction }}</div>
          </div>

          <div v-if="moduleData.minigame_json.type === 'phase4-lab'" class="phase4-container">
            <JankBuster @lab-completed="minigameSolved = true" />
          </div>

          <template v-else>
            <div class="engine-split-view">
              <div class="engine-editor">
                <div class="editor-tab">script.js</div>
                
                <div v-if="moduleData.minigame_json.type === 'factory'" class="code-content">
                  <div class="level-indicator">-- LEVEL {{ factoryLevelIndex + 1 }} --</div>
                  <pre class="syntax-keyword">{{ currentFactoryLevel.codeTop }}</pre>
                  <div class="input-line" :class="{ 'shake-error': simError }">
                    <span class="cursor">></span>
                    <input type="text" v-model="simInput" @keyup.enter="runExecution" placeholder="..." class="neon-input" :disabled="isExecuting" autocomplete="off" />
                  </div>
                  <pre class="syntax-keyword">{{ currentFactoryLevel.codeBottom }}</pre>
                </div>

                <div v-else class="code-content">
                  <pre class="syntax-keyword">{{ moduleData.minigame_json.codeTop }}</pre>
                  <div class="input-line" :class="{ 'shake-error': simError }">
                    <span class="cursor">></span>
                    <input type="text" v-model="simInput" @keyup.enter="runExecution" placeholder="..." class="neon-input" :disabled="isExecuting || minigameSolved" autocomplete="off" />
                  </div>
                  <pre class="syntax-keyword">{{ moduleData.minigame_json.codeBottom }}</pre>
                </div>
              </div>

              <div class="engine-console">
                <div class="console-tab">V8 Output</div>
                <div class="console-window">
                  
                  <div v-if="moduleData.minigame_json.type === 'factory'" class="factory-visual">
                    <div class="conveyor-track">
                      <div class="machine-roller"></div><div class="machine-roller"></div><div class="machine-roller"></div>
                      <div class="factory-crate" :class="{'move-crate': isExecuting}">📦</div>
                      <div class="factory-crate" :class="{'move-crate': isExecuting}" style="animation-delay: 0.2s">📦</div>
                      <div class="factory-crate" :class="{'move-crate': isExecuting}" style="animation-delay: 0.4s">📦</div>
                    </div>
                  </div>

                  <div class="log-stream">
                    <p v-if="!isExecuting && !executionFinished" class="text-dim">Waiting for input...</p>
                    <p v-if="isExecuting" class="text-cyan blink">Compiling execution thread...</p>
                    <div v-if="isExecuting" class="progress-bar"><div class="progress-fill"></div></div>
                    
                    <template v-if="executionFinished">
                      <p v-if="simError" class="text-red">> FATAL ERROR: Syntax invalid or logic failed.</p>
                      <p v-if="simError" class="text-red">> Process Terminated.</p>
                      
                      <p v-if="!simError" class="text-green">> Logic Compiled Successfully.</p>
                      <p v-if="!simError" class="text-green">> Yield: Expected Result Achieved.</p>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="arcade-controls">
              <button class="cyber-btn run-btn" @click="runExecution" :disabled="isExecuting || minigameSolved">
                {{ isExecuting ? 'EXECUTING...' : 'RUN SCRIPT' }}
              </button>
              <button class="cyber-btn hint-btn" @click="showHint = true" :disabled="isExecuting || minigameSolved">
                SCAN FOR HINT
              </button>
            </div>

            <div v-if="showHint && !minigameSolved && activeHint" class="hacker-hint">
              <span class="warning-icon">⚠️</span> {{ activeHint }}
            </div>
          </template>

          <div v-if="minigameSolved" class="mission-success-banner">
            <h3>SYSTEM OVERRIDE COMPLETE</h3>
            <button class="cyber-btn proceed-btn" @click="currentStep = 'quiz'">ACCESS SECURITY CLEARANCE</button>
          </div>

        </div>
      </section>

      <section class="quiz-panel arcade-cabinet" v-if="currentStep === 'quiz'">
        <div class="panel-header"><span class="title">security_clearance.exe</span></div>
        <div class="panel-body" v-if="!quizComplete">
          <div class="quiz-status">Question {{ currentQIndex + 1 }} / {{ moduleData.quiz_json.length }}</div>
          <h3 class="question">{{ currentQuestion.question }}</h3>
          <div class="options">
            <button v-for="(option, index) in currentQuestion.options" :key="index" class="option-btn" :class="{ 'selected': selectedOption === index, 'correct': showResult && index === currentQuestion.correct, 'wrong': showResult && selectedOption === index && index !== currentQuestion.correct }" @click="selectOption(index)" :disabled="showResult">{{ option }}</button>
          </div>
          <button v-if="!showResult" class="cyber-btn run-btn" style="width: 100%" :disabled="selectedOption === null" @click="checkAnswer">SUBMIT LOGIC</button>
          <button v-if="showResult" class="cyber-btn proceed-btn" style="width: 100%" @click="nextQuestion">NEXT PROTOCOL</button>
        </div>
        <div class="panel-body result-screen" v-if="quizComplete">
          <h2 :class="passedQuiz ? 'text-green' : 'text-red'">{{ passedQuiz ? 'CLEARANCE GRANTED' : 'CLEARANCE DENIED' }}</h2>
          <p class="score-text">Score: {{ score }} / {{ moduleData.quiz_json.length }}</p>
          <button v-if="passedQuiz" class="cyber-btn proceed-btn" @click="finishModule">RETURN TO HUB</button>
          <button v-else class="cyber-btn hint-btn" @click="retryQuiz">REBOOT EXAM</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import JankBuster from '../components/labs/phase4/JankBuster.vue';
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase.js' 

const route = useRoute()
const router = useRouter()
const moduleId = route.params.id

const moduleData = ref(null)
const isLoading = ref(true)
const fetchError = ref(null)
const currentStep = ref('briefing')

const completeBriefing = () => { 
  // Hard bypass for Module 16 to skip the broken arcade
  if (moduleId === 'w16') {
    currentStep.value = 'quiz';
  } else {
    currentStep.value = moduleData.value?.minigame_json ? 'minigame' : 'quiz'; 
  }
}
// --- GAME ENGINE STATE ---
const minigameSolved = ref(false)
const showHint = ref(false)
const simInput = ref('')
const simError = ref(false)
const isExecuting = ref(false)
const executionFinished = ref(false)

// --- MOD 5 LABS STATE ---
const scaleLeft = ref('5'); const scaleOp = ref('+'); const scaleRight = ref('"5"');
const scaleResult = computed(() => {
  let l = scaleLeft.value === '5' ? 5 : (scaleLeft.value === '"5"' ? "5" : "Apple")
  let r = scaleRight.value === '5' ? 5 : (scaleRight.value === '"5"' ? "5" : true)
  let res = scaleOp.value === '+' ? l + r : (scaleOp.value === '-' ? l - r : l * r)
  if (Number.isNaN(res)) return 'NaN'; if (typeof res === 'string') return `"${res}"`; return String(res)
})
const scaleSolved = computed(() => scaleResult.value === 'NaN')

const labLeft = ref('[]'); const labOperator = ref('+'); const labRight = ref('{}');
const calculatedLabResult = computed(() => {
  const expr = `${labLeft.value} ${labOperator.value} ${labRight.value}`
  const map = { '[] + {}': '"[object Object]"', '[] + false': '"false"', '0 == false': 'true', 'null == undefined': 'true', '[] == false': 'true' }
  return map[expr] || 'false / undefined'
})
const labSolved = computed(() => labLeft.value === '[]' && labOperator.value === '==' && labRight.value === 'false')

// --- MOD 7 VISUALIZER STATE ---
const pistonStep = ref(-1);
const pistonCycle = ref(1);
const firePiston = () => {
  if (pistonStep.value === -1) pistonStep.value = 0;
  else if (pistonStep.value === 0) pistonStep.value = 1;
  else if (pistonStep.value === 1) pistonStep.value = 2;
  else if (pistonStep.value === 2) pistonStep.value = 3;
  else if (pistonStep.value === 3) { pistonStep.value = 1; pistonCycle.value++; }
}
const mapStep = ref(0);
const mapRunning = ref(false);
const runMap = () => {
  if (mapRunning.value) return;
  mapRunning.value = true; mapStep.value = 0;
  setTimeout(() => mapStep.value = 1, 600);
  setTimeout(() => mapStep.value = 2, 1200);
  setTimeout(() => { mapStep.value = 3; mapRunning.value = false; }, 1800);
}

// --- FACTORY MULTI-LEVEL LOGIC ---
const factoryLevels = computed(() => moduleData.value?.minigame_json?.type === 'factory' ? moduleData.value.minigame_json.levels : [])
const factoryLevelIndex = ref(0)
const currentFactoryLevel = computed(() => factoryLevels.value[factoryLevelIndex.value] || null)

const activeHint = computed(() => {
  if (!moduleData.value?.minigame_json) return null;
  if (moduleData.value.minigame_json.type === 'factory') return currentFactoryLevel.value ? currentFactoryLevel.value.hint : null;
  return moduleData.value.minigame_json.hint || null;
})

// --- THE NEW "FUZZY" EXECUTION ENGINE ---
const runExecution = () => {
  if (isExecuting.value || minigameSolved.value) return;
  
  isExecuting.value = true;
  executionFinished.value = false;
  simError.value = false;

  let correctText = "";
  if (moduleData.value.minigame_json.type === 'factory') {
    if (!currentFactoryLevel.value) return;
    // Strip spaces, convert to lowercase, AND strip all ' and " quotes
    correctText = currentFactoryLevel.value.missingTag.replace(/\s+/g, '').toLowerCase().replace(/['"]/g, '');
  } else {
    // Strip spaces, convert to lowercase, AND strip all ' and " quotes
    correctText = moduleData.value.minigame_json.missingTag.replace(/\s+/g, '').toLowerCase().replace(/['"]/g, '');
  }

  // Do the same clean-up to whatever the user typed in the box
  const userText = simInput.value.trim().replace(/\s+/g, '').toLowerCase().replace(/['"]/g, '');
  const isCorrect = (userText === correctText || userText === correctText.replace(';', ''));

  setTimeout(() => {
    isExecuting.value = false;
    executionFinished.value = true;

    if (isCorrect) {
      if (moduleData.value.minigame_json.type === 'factory' && factoryLevelIndex.value < factoryLevels.value.length - 1) {
        setTimeout(() => {
          factoryLevelIndex.value++;
          simInput.value = '';
          executionFinished.value = false;
        }, 1500); 
      } else {
        minigameSolved.value = true;
      }
    } else {
      simError.value = true;
    }
  }, 1500);
}

// --- QUIZ LOGIC ---
const currentQIndex = ref(0); const selectedOption = ref(null); const showResult = ref(false); const score = ref(0); const quizComplete = ref(false);
const currentQuestion = computed(() => moduleData.value?.quiz_json ? moduleData.value.quiz_json[currentQIndex.value] : null)
const passedQuiz = computed(() => moduleData.value?.quiz_json ? (score.value / moduleData.value.quiz_json.length) >= 0.6 : false)
const selectOption = (index) => selectedOption.value = index
const checkAnswer = () => { showResult.value = true; if (selectedOption.value === currentQuestion.value.correct) score.value++; }
const nextQuestion = () => { selectedOption.value = null; showResult.value = false; if (currentQIndex.value < moduleData.value.quiz_json.length - 1) currentQIndex.value++; else quizComplete.value = true; }
const retryQuiz = () => { currentQIndex.value = 0; score.value = 0; selectedOption.value = null; showResult.value = false; quizComplete.value = false; }
const finishModule = () => { const saved = JSON.parse(localStorage.getItem('completed_modules') || '[]'); if (!saved.includes(moduleId)) { saved.push(moduleId); localStorage.setItem('completed_modules', JSON.stringify(saved)); } router.push('/roadmap') }

onMounted(async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase.from('module_content').select('*').eq('module_id', moduleId).single()
    if (error) throw error
    if (data) moduleData.value = data
  } catch (err) { fetchError.value = "Failed to decrypt module intelligence." } finally { isLoading.value = false }
})
</script>

<style scoped>
/* Ensure the code container handles overflow */
.code-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto !important;
  overflow-x: hidden;
  padding: 25px;
}

.phase4-container {
  margin-top: 20px;
}

.cyber-scroll::-webkit-scrollbar { width: 8px; }
.cyber-scroll::-webkit-scrollbar-track { background: var(--bg-main); border-radius: 4px; }
.cyber-scroll::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; border: 2px solid var(--bg-main); }
.cyber-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent-user); cursor: pointer; }

.module-page { padding: 40px 20px; background-color: transparent; color: var(--text-main); min-height: 100vh; font-family: 'Inter', sans-serif; }
.module-header { max-width: 1000px; margin: 0 auto 40px auto; position: relative; text-align: center; }
.back-btn { position: absolute; left: 0; top: 0; background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.2s; }
.back-btn:hover { background: var(--hover-bg); color: var(--text-main); }
.badge { background: rgba(241, 194, 27, 0.1); color: #F1C21B; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 800; }
.header-content h1 { font-size: 2.5rem; margin: 10px 0 0 0; color: var(--text-main); }
.terminal-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; animation: slideUp 0.4s ease-out; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.briefing-panel { background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.panel-header { background: var(--bg-main); padding: 10px 15px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid var(--border-color); }
.dot { width: 12px; height: 12px; border-radius: 50%; } .red { background: #EF4444; } .yellow { background: #F1C21B; } .green { background: #10B981; }
.panel-header .title { margin-left: 10px; color: var(--text-muted); font-family: monospace; font-size: 0.9rem; }
.panel-body { padding: 40px; }

.article-content { line-height: 1.8; font-size: 1.05rem; color: var(--text-main); }
:deep(.article-content) { color: var(--text-main) !important; }
:deep(.article-content p), :deep(.article-content li), :deep(.article-content div) { color: var(--text-main) !important; }
:deep(.article-content h2), :deep(.article-content h3), :deep(.article-content h4) { color: var(--text-main) !important; border-bottom-color: var(--border-color) !important; }
:deep(.article-content code) { background: var(--bg-main) !important; color: var(--accent-primary) !important; border: 1px solid var(--border-color); padding: 2px 6px; border-radius: 4px; font-family: monospace;}
:deep(.article-content div[style*="#0B0E14"]), :deep(.article-content div[style*="rgb(11, 14, 20)"]), :deep(.article-content div[style*="#1E293B"]), :deep(.article-content div[style*="rgb(30, 41, 59)"]) { background-color: var(--bg-card) !important; border: 1px solid var(--border-color) !important; box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important; }
:deep(.article-content table) { background-color: var(--bg-main) !important; border-color: var(--border-color) !important; }
:deep(.article-content th) { background-color: var(--border-color) !important; color: var(--text-main) !important; }
:deep(.article-content td) { border-color: var(--border-color) !important; }
:deep(.article-content [style*="color: #EF4444"]) { color: #EF4444 !important; }
:deep(.article-content [style*="color: #10B981"]) { color: #10B981 !important; }
:deep(.article-content [style*="color: #3B82F6"]) { color: #3B82F6 !important; }
:deep(.article-content [style*="color: #F59E0B"]) { color: #F59E0B !important; }

.puzzle-trigger-btn { width: 100%; background: #10B981; color: #fff; border: none; padding: 15px; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 1.1rem; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; margin-top: 40px; transition: 0.2s ease; }
.puzzle-trigger-btn:hover { background: #059669; }

.arcade-cabinet { background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 12px; padding: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
.arcade-screen { background: var(--bg-main); border-radius: 8px; padding: 30px; position: relative; overflow: hidden; border: 1px solid var(--border-color); }
.scanlines { position: absolute; inset: 0; pointer-events: none; z-index: 10; background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%); background-size: 100% 4px; opacity: 0.5;}
body.light-mode .scanlines { opacity: 0.1; }

.arcade-header { text-align: center; margin-bottom: 30px; border-bottom: 1px dashed var(--border-color); padding-bottom: 20px; }
.glitch-title { font-family: 'Courier New', Courier, monospace; font-size: 2rem; font-weight: bold; color: #10B981; letter-spacing: 2px;}
.mission-brief { color: var(--text-muted); font-family: monospace; margin-top: 10px; font-size: 1.1rem; }

.engine-split-view { display: flex; gap: 20px; margin-bottom: 30px; height: 300px; }
.engine-editor { flex: 1.2; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; display: flex; flex-direction: column; overflow: hidden; }
.engine-console { flex: 0.8; background: var(--bg-panel); border: 1px solid var(--border-color); border-radius: 6px; display: flex; flex-direction: column; overflow: hidden; }
.editor-tab, .console-tab { background: var(--bg-main); padding: 8px 15px; font-family: monospace; font-size: 0.85rem; color: var(--text-muted); border-bottom: 1px solid var(--border-color); }

.syntax-keyword { color: #8B5CF6; margin: 0; white-space: pre-wrap; font-size: 1.15rem; line-height: 1.7; }
.input-line { display: flex; align-items: center; margin: 10px 0; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 4px; padding: 5px 10px; transition: 0.3s; }
.input-line:focus-within { border-color: #10B981; }
.cursor { color: #10B981; font-weight: bold; margin-right: 10px; animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

.neon-input { background: transparent; border: none; outline: none; color: #10B981; font-family: 'Fira Code', monospace; font-size: 1.2rem; width: 100%; font-weight: bold; }
.neon-input:disabled { opacity: 0.5; }

.console-window { padding: 20px; font-family: 'Courier New', monospace; display: flex; flex-direction: column; height: 100%; }
.log-stream p { margin: 5px 0; font-size: 0.95rem; }
.text-dim { color: var(--text-muted); }
.text-cyan { color: #0ea5e9; }
.text-red { color: #ef4444; }
.text-green { color: #10b981; }
.progress-bar { width: 100%; height: 4px; background: var(--border-color); margin: 15px 0; border-radius: 2px; overflow: hidden; }
.progress-fill { width: 0%; height: 100%; background: #0ea5e9; animation: fillBar 1.5s ease-in-out forwards; }
@keyframes fillBar { to { width: 100%; } }

.factory-visual { background: var(--bg-main); padding: 15px; border-radius: 4px; border: 1px dashed var(--border-color); margin-bottom: 20px; overflow: hidden; }
.conveyor-track { height: 4px; background: var(--text-muted); width: 100%; margin-top: 30px; position: relative; display: flex; justify-content: space-between; }
.machine-roller { width: 12px; height: 12px; background: var(--border-color); border-radius: 50%; margin-top: -4px; }
.factory-crate { position: absolute; bottom: 4px; left: -30px; font-size: 1.5rem; transition: transform 0.2s; }
.move-crate { animation: slideBelt 1.5s linear infinite; }
@keyframes slideBelt { from { left: -30px; } to { left: 110%; } }

.arcade-controls { display: flex; gap: 20px; justify-content: center; }
.cyber-btn { background: var(--bg-panel); color: var(--text-main); border: 1px solid var(--border-color); padding: 15px 30px; font-family: monospace; font-size: 1.1rem; font-weight: bold; cursor: pointer; border-radius: 4px; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; }
.run-btn { border-color: #10B981; color: #10B981; }
.run-btn:hover:not(:disabled) { background: #10B981; color: #fff; }
.run-btn:disabled { border-color: var(--border-color); color: var(--text-muted); cursor: not-allowed; }
.hint-btn { border-color: #f59e0b; color: #f59e0b; }
.hint-btn:hover:not(:disabled) { background: rgba(245, 158, 11, 0.1); }
.proceed-btn { background: #10B981; color: #fff; border: none; }
.proceed-btn:hover { background: #059669; }

.shake-error { animation: glitchShake 0.4s cubic-bezier(.36,.07,.19,.97) both; border-color: #ef4444 !important; background: rgba(239, 68, 68, 0.1) !important; }
@keyframes glitchShake { 10%, 90% { transform: translate3d(-2px, 0, 0); } 20%, 80% { transform: translate3d(4px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
.hacker-hint { margin-top: 20px; padding: 15px; background: rgba(245, 158, 11, 0.05); border: 1px solid #f59e0b; color: #f59e0b; font-family: monospace; border-radius: 4px; text-align: center; font-weight: bold;}
.mission-success-banner { margin-top: 30px; text-align: center; background: rgba(16, 185, 129, 0.1); border: 1px solid #10B981; padding: 30px; border-radius: 8px; animation: slideUp 0.5s ease-out; }
.mission-success-banner h3 { color: #10B981; font-family: monospace; font-size: 1.5rem; margin-top: 0; margin-bottom: 20px; }

.interactive-labs-container { margin-top: 40px; border-top: 1px solid var(--border-color); padding-top: 20px; }
.labs-header { color: var(--accent-primary); font-size: 1.5rem; margin-bottom: 20px; }
.visualizer-box { background: var(--bg-panel); border: 1px dashed var(--border-color); padding: 25px; border-radius: 8px; margin-bottom: 25px; font-family: monospace; transition: 0.3s; }
.solved-border { border-color: #10B981; background: rgba(16, 185, 129, 0.05); }
.success-text { color: #10B981; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.vis-title { color: var(--text-main); margin-top: 0; text-align: center; font-size: 1.2rem;}
.vis-desc { color: var(--text-muted); text-align: center; font-size: 0.95rem; margin-bottom: 25px; }
.coercion-lab { display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;}
.lab-select { background: var(--bg-main); color: var(--text-main); border: 1px solid var(--border-color); padding: 12px; border-radius: 6px; font-family: monospace; font-size: 1.1rem; cursor: pointer; outline: none; }
.op-select { background: rgba(245, 158, 11, 0.1); border-color: #F59E0B; color: #F59E0B; font-weight: bold; }
.arrow { color: var(--text-muted); font-size: 1.5rem; }
.lab-result { background: var(--bg-main); padding: 12px 20px; border-radius: 6px; color: #10B981; font-weight: bold; font-size: 1.2rem; min-width: 120px; text-align: center; border: 1px solid var(--border-color);}
.string-res { color: #3B82F6 !important; border: 1px dashed #3B82F6; }
.nan-res { color: #EF4444 !important; border: 1px dashed #EF4444; background: rgba(239, 68, 68, 0.1) !important;}
.piston-container { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px; }
.piston { flex: 1; background: var(--bg-main); border: 2px solid var(--border-color); padding: 15px 10px; text-align: center; border-radius: 6px; color: var(--text-muted); font-weight: bold; transition: all 0.3s; }
.piston-code { display: block; margin-top: 10px; font-size: 0.9rem; color: #3B82F6; font-weight: normal; }
.active-piston { border-color: #F59E0B; background: rgba(245, 158, 11, 0.1); color: #F59E0B; transform: translateY(-5px); box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2); }
.piston-controls { display: flex; align-items: center; gap: 20px; justify-content: center; }
.piston-status { color: #10B981; font-weight: bold; font-size: 1.2rem; }
.assembly-container { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.belt { display: flex; gap: 15px; background: var(--bg-main); padding: 20px; border-radius: 8px; border: 1px solid var(--border-color); width: 100%; position: relative; justify-content: center; }
.belt-label { position: absolute; top: -10px; left: 15px; background: var(--bg-panel); padding: 0 10px; color: var(--text-muted); font-size: 0.8rem; font-weight: bold; }
.crate { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; font-size: 1.2rem; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.crate.raw { background: #3B82F6; color: white; }
.crate.mapped { background: #10B981; color: #fff; opacity: 0; transform: scale(0.5); }
.crate.mapped.visible { opacity: 1; transform: scale(1); }

.quiz-panel { background: var(--bg-panel); border: 1px solid var(--border-color); }
.quiz-panel .panel-body { padding: 40px; }
.quiz-status { color: var(--text-muted); font-size: 0.9rem; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px; }
.question { font-size: 1.3rem; margin-bottom: 30px; color: var(--text-main);}
.options { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
.option-btn { background: var(--bg-main); border: 1px solid var(--border-color); color: var(--text-main); padding: 15px 20px; border-radius: 4px; text-align: left; font-size: 1.05rem; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif;}
.option-btn:hover:not(:disabled) { border-color: var(--text-muted); background: var(--hover-bg); }
.option-btn.selected { border-color: #10B981; box-shadow: inset 0 0 0 1px #10B981; background: rgba(16, 185, 129, 0.05); }
.option-btn.correct { border-color: #10B981; background: rgba(16, 185, 129, 0.1); color: #10B981; font-weight: bold;}
.option-btn.wrong { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); color: #ef4444; opacity: 0.5; }
</style>
