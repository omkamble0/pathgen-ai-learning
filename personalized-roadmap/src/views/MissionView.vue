<template>
  <div class="mission-control">
    <header class="mission-header">
      <button class="back-btn" @click="$router.push('/roadmap')">← Abort Mission</button>
      <div class="mission-title">
        <span class="badge">ACTIVE OPERATION</span>
        <h2>{{ moduleData.title }}</h2>
      </div>
      <div class="xp-display">
        <span class="xp-icon">⚡</span>
        <span class="xp-text">Potential XP: 100</span>
      </div>
    </header>

    <div class="layout-grid">
      <main class="main-stage">
        <div class="visual-feed">
          <div class="feed-overlay">
            <span class="recording-dot"></span> SECURE FEED INITIATED
          </div>
          <div class="tech-diagram-placeholder">
            [ INTERACTIVE DATA DIAGRAM / VIDEO PLAYER ]
          </div>
        </div>

        <div class="briefing-area">
          <h3>Mission Briefing</h3>
          <p>{{ moduleData.description }}</p>
          
          <div class="code-terminal">
            <div class="terminal-header">
              <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
              <span class="terminal-title">system_config.py</span>
            </div>
            <pre><code># Initializing Core Protocols...
def establish_secure_perimeter():
    status = "Active"
    print(f"Perimeter Status: {status}")
    return True
            </code></pre>
          </div>
        </div>
      </main>

      <aside class="sidebar">
        <div class="mentor-comms">
          <div class="comms-header">
            <div class="avatar">👤</div>
            <div>
              <h4>The Architect</h4>
              <span class="status">Online</span>
            </div>
          </div>
          <div class="chat-box">
            <div class="message incoming">
              Hey. The perimeter is secure for now, but we need to upgrade the core logic here. Review the briefing on the left.
            </div>
            <div class="message incoming delay">
              Pay close attention to the syntax patterns. You'll need them for the Neural Sync.
            </div>
          </div>
        </div>

        <div class="action-panel">
          <h3>Ready to advance?</h3>
          <p>Prove your mastery to unlock the next phase of the roadmap.</p>
          <button class="sync-btn" @click="startSync">
            <span class="icon">🧠</span> INITIATE 5-CARD SYNC
          </button>
        </div>
      </aside>
    </div>

    <div v-if="isSyncing" class="sync-modal-overlay">
      <div class="sync-card-container">
        
        <div v-if="!syncComplete" class="active-sync">
          <div class="sync-header">
            <span>Pattern Scan: {{ currentCard + 1 }} / 5</span>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: ((currentCard + 1) / 5) * 100 + '%' }"></div>
            </div>
          </div>
          
          <div class="flashcard">
            <h3>{{ cards[currentCard].question }}</h3>
            <div class="options">
              <button 
                v-for="(opt, index) in cards[currentCard].options" 
                :key="index"
                class="opt-btn"
                @click="answerCard(opt.isCorrect)"
              >
                {{ opt.text }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="sync-report">
          <div class="report-icon" :class="{ 'success': score >= 4, 'warning': score < 4 }">
            {{ score >= 4 ? '🏆' : '⚠️' }}
          </div>
          <h2>Neural Sync Complete</h2>
          <p class="score-text">Accuracy: {{ score }} / 5</p>
          
          <div class="mentor-feedback">
            <strong>The Architect says:</strong>
            <p v-if="score >= 4">"Flawless execution. Your logic is solid. I've authorized your access to the next module."</p>
            <p v-else>"Not bad, but your pattern recognition is a bit fuzzy. I suggest a quick review before moving too deep."</p>
          </div>

          <button class="complete-btn" @click="finishMission">
            Return to Roadmap (+{{ score * 20 }} XP)
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
import Phase4LabEngine from '@/components/labs/Phase4LabEngine.vue';
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../AuthService.js'

const router = useRouter()

// UI State
const moduleData = ref({ title: 'Loading...', description: '...' })
const isSyncing = ref(false)
const syncComplete = ref(false)
const currentCard = ref(0)
const score = ref(0)

// Mock Data for the 5-Card Audit (In a real app, this would be fetched based on the module)
const cards = [
  { 
    question: "Which pattern correctly establishes a secure loop?", 
    options: [{ text: "for i in range(secure):", isCorrect: true }, { text: "loop.secure()", isCorrect: false }] 
  },
  { 
    question: "What is the primary vulnerability in outdated dependencies?", 
    options: [{ text: "Syntax Errors", isCorrect: false }, { text: "Unpatched Exploits", isCorrect: true }] 
  },
  { 
    question: "Identify the correct protocol hierarchy.", 
    options: [{ text: "Application -> Transport -> Network", isCorrect: true }, { text: "Network -> Application -> Transport", isCorrect: false }] 
  },
  { 
    question: "Which of these is a stateless connection?", 
    options: [{ text: "TCP", isCorrect: false }, { text: "UDP", isCorrect: true }] 
  },
  { 
    question: "To isolate a testing environment, you should use:", 
    options: [{ text: "A Global Variable", isCorrect: false }, { text: "A Virtual Machine/Container", isCorrect: true }] 
  }
]

onMounted(() => {
  // Normally, we'd fetch the specific module data based on the route params
  // For now, we'll put in a placeholder to show the UI
  moduleData.value = {
    title: "Module 1: Foundation Protocols",
    description: "In this mission, we establish the core baseline. Understanding how the system routes logic is the difference between a secure environment and an open door."
  }
})

// Game Logic
const startSync = () => {
  isSyncing.value = true
  syncComplete.value = false
  currentCard.value = 0
  score.value = 0
}

const answerCard = (isCorrect) => {
  if (isCorrect) score.value++
  
  if (currentCard.value < cards.length - 1) {
    currentCard.value++
  } else {
    syncComplete.value = true
  }
}

const finishMission = async () => {
  // Call the Supabase function we wrote earlier!
  await AuthService.saveSyncResults(score.value, 'module_1')
  router.push('/roadmap')
}
</script>

<style scoped>
.mission-control {
  min-height: 100vh;
  background-color: #0B0E14; /* Deep Tech Dark */
  color: #E2E8F0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

/* HEADER */
.mission-header {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 20px; border-bottom: 1px solid #1E293B; margin-bottom: 30px;
}
.back-btn {
  background: transparent; color: #94A3B8; border: 1px solid #334155;
  padding: 8px 16px; border-radius: 6px; cursor: pointer; transition: all 0.2s;
}
.back-btn:hover { background: #1E293B; color: #FFF; }
.mission-title { text-align: center; }
.badge { background: rgba(59, 130, 246, 0.2); color: #3B82F6; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: bold; letter-spacing: 1px; }
.mission-title h2 { margin: 5px 0 0; font-size: 1.8rem; font-weight: 800; color: #F8FAFC; }
.xp-display { display: flex; align-items: center; gap: 8px; background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); padding: 8px 16px; border-radius: 20px; }
.xp-icon { color: #EAB308; }
.xp-text { color: #EAB308; font-weight: bold; font-size: 0.9rem; }

/* GRID LAYOUT */
.layout-grid {
  display: grid; grid-template-columns: 2fr 1fr; gap: 30px; max-width: 1400px; margin: 0 auto;
}

/* MAIN STAGE (LEFT) */
.visual-feed {
  background: #0F172A; height: 350px; border-radius: 12px; border: 1px solid #1E293B;
  position: relative; display: flex; justify-content: center; align-items: center; overflow: hidden;
  margin-bottom: 30px;
}
.feed-overlay {
  position: absolute; top: 15px; left: 15px; color: #EF4444; font-size: 0.8rem; font-weight: bold; letter-spacing: 1px; display: flex; align-items: center; gap: 8px;
}
.recording-dot { width: 8px; height: 8px; background: #EF4444; border-radius: 50%; animation: blink 1.5s infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.tech-diagram-placeholder { color: #334155; font-family: monospace; letter-spacing: 2px; }

.briefing-area h3 { font-size: 1.4rem; color: #F8FAFC; margin-bottom: 15px; }
.briefing-area p { color: #94A3B8; line-height: 1.7; margin-bottom: 25px; }

.code-terminal { background: #0F172A; border-radius: 8px; border: 1px solid #1E293B; overflow: hidden; }
.terminal-header { background: #1E293B; padding: 10px 15px; display: flex; align-items: center; gap: 8px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #EF4444; } .dot.yellow { background: #EAB308; } .dot.green { background: #10B981; }
.terminal-title { margin-left: 10px; color: #94A3B8; font-family: monospace; font-size: 0.85rem; }
.code-terminal pre { margin: 0; padding: 20px; color: #10B981; font-family: 'Courier New', Courier, monospace; font-size: 0.95rem; overflow-x: auto; }

/* SIDEBAR (RIGHT) */
.mentor-comms {
  background: #1E293B; border-radius: 12px; padding: 20px; margin-bottom: 30px; border: 1px solid #334155;
}
.comms-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 15px; }
.avatar { font-size: 2rem; background: #0F172A; padding: 10px; border-radius: 50%; }
.comms-header h4 { margin: 0; color: #F8FAFC; }
.status { font-size: 0.8rem; color: #10B981; }

.chat-box { display: flex; flex-direction: column; gap: 15px; }
.message { background: #0F172A; padding: 12px 16px; border-radius: 0 12px 12px 12px; color: #CBD5E1; font-size: 0.95rem; line-height: 1.5; border-left: 3px solid #3B82F6; }
.message.delay { animation: slideIn 0.5s ease-out 1s both; }
@keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.action-panel { background: linear-gradient(145deg, #0F172A, #1E293B); border-radius: 12px; padding: 25px; text-align: center; border: 1px solid #3B82F6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.1); }
.action-panel h3 { margin: 0 0 10px; color: #F8FAFC; }
.action-panel p { color: #94A3B8; font-size: 0.9rem; margin-bottom: 20px; }
.sync-btn { background: #3B82F6; color: white; border: none; padding: 15px 20px; width: 100%; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.2s; display: flex; justify-content: center; align-items: center; gap: 10px; }
.sync-btn:hover { background: #2563EB; box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); transform: translateY(-2px); }

/* SYNC MODAL (GAME UI) */
.sync-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(11, 14, 20, 0.95); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.sync-card-container { background: #1E293B; border: 1px solid #3B82F6; width: 90%; max-width: 600px; border-radius: 16px; padding: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
.sync-header { margin-bottom: 30px; text-align: center; color: #94A3B8; font-weight: bold; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.progress-track { width: 100%; height: 6px; background: #0F172A; border-radius: 3px; margin-top: 10px; overflow: hidden; }
.progress-fill { height: 100%; background: #3B82F6; transition: width 0.3s ease; }

.flashcard h3 { font-size: 1.5rem; text-align: center; margin-bottom: 30px; line-height: 1.4; color: #F8FAFC; }
.options { display: flex; flex-direction: column; gap: 15px; }
.opt-btn { background: #0F172A; color: #CBD5E1; border: 1px solid #334155; padding: 20px; border-radius: 12px; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; text-align: left; }
.opt-btn:hover { border-color: #3B82F6; background: rgba(59, 130, 246, 0.1); transform: translateX(5px); }

.sync-report { text-align: center; }
.report-icon { font-size: 4rem; margin-bottom: 20px; }
.report-icon.success { animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
.sync-report h2 { font-size: 2rem; margin: 0 0 10px; color: #F8FAFC; }
.score-text { font-size: 1.2rem; color: #3B82F6; font-weight: bold; margin-bottom: 30px; }
.mentor-feedback { background: #0F172A; padding: 20px; border-radius: 12px; border-left: 4px solid #10B981; margin-bottom: 30px; text-align: left; }
.mentor-feedback strong { color: #10B981; display: block; margin-bottom: 5px; }
.mentor-feedback p { color: #CBD5E1; margin: 0; font-style: italic; }
.complete-btn { background: #10B981; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: background 0.2s; width: 100%; }
.complete-btn:hover { background: #059669; }

@media (max-width: 1024px) { .layout-grid { grid-template-columns: 1fr; } }
</style>
