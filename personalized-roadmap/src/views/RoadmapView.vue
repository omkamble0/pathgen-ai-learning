<template>
  <div class="roadmap-page">
    <div class="header-section">
      <button class="back-btn" @click="$router.push('/dashboard')">← Dashboard</button>
      <h1 class="page-title">Full Stack Web Architecture</h1>
      <p class="page-subtitle">A personalized curriculum containing 25 modules. Estimated completion: 25 weeks.</p>
    </div>

    <div class="roadmap-wrapper">
      
      <div v-for="(phase, phaseIndex) in dynamicRoadmap" :key="phaseIndex" class="phase-block">
        
        <div class="phase-marker">
          <span class="phase-badge">{{ phase.title }}</span>
        </div>

        <div class="timeline-container">
          <div class="center-line"></div>

          <div v-for="(mod, modIndex) in phase.modules" :key="mod.id" class="timeline-row">
            
            <template v-if="modIndex % 2 === 0">
              <div class="card-wrapper">
                <div class="module-card" :class="mod.state" @click="handleCardClick(mod)">
                  <div class="card-header">
                    <span class="mod-label">MOD {{ mod.num }}</span>
                    <span class="status-icon">{{ getIcon(mod.state) }}</span>
                  </div>
                  <h3 class="module-title">{{ mod.title }}</h3>
                  <p class="module-desc">{{ mod.desc }}</p>
                </div>
              </div>
              <div class="marker-wrapper"><div class="dot" :class="mod.state + '-dot'"></div></div>
              <div class="spacer"></div>
            </template>

            <template v-else>
              <div class="spacer"></div>
              <div class="marker-wrapper"><div class="dot" :class="mod.state + '-dot'"></div></div>
              <div class="card-wrapper">
                <div class="module-card" :class="mod.state" @click="handleCardClick(mod)">
                  <div class="card-header">
                    <span class="mod-label">MOD {{ mod.num }}</span>
                    <span class="status-icon">{{ getIcon(mod.state) }}</span>
                  </div>
                  <h3 class="module-title">{{ mod.title }}</h3>
                  <p class="module-desc">{{ mod.desc }}</p>
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const completedModules = ref([])

onMounted(() => {
  // Read memory to see what the user has actually finished
  let saved = JSON.parse(localStorage.getItem('completed_modules') || 'null')
  if (!saved) {
    saved = ['w1', 'w2', 'w3', 'w4']
    localStorage.setItem('completed_modules', JSON.stringify(saved))
  }
  completedModules.value = saved
})

const handleCardClick = (mod) => {
  if (mod.state !== 'locked') {
    router.push(`/module/${mod.id}`)
  }
}

const getIcon = (state) => {
  if (state === 'completed') return '✅'
  if (state === 'active') return '⚡'
  return '🔒'
}

// THE BASE DATA (Notice 'state' is removed. It's just raw data now)
const fullRoadmap = [
  {
    title: "Phase 1: The Anatomy of the Web",
    modules: [
      { id: 'w1', num: 1, title: 'The Client-Server Architecture', desc: 'Understand what happens when you type a URL.' },
      { id: 'w2', num: 2, title: 'HTML5: The Skeleton', desc: 'Learn to write semantic markup for browsers.' },
      { id: 'w3', num: 3, title: 'CSS3: The Beauty', desc: 'Add styling, colors, and layouts to your interface.' },
    ]
  },
  {
    title: "Phase 2: Core JavaScript Engine",
    modules: [
      { id: 'w4', num: 4, title: 'Variables & The TDZ', desc: 'Deconstruct the V8 Engine and memory allocation.' },
      { id: 'w5', num: 5, title: 'Operators & Coercion', desc: 'Master the rules of Implicit vs. Explicit type conversion.' },
      { id: 'w6', num: 6, title: 'Control Flow Architecture', desc: 'Eradicate the Pyramid of Doom using Guard Clauses.' },
      { id: 'w7', num: 7, title: 'The Loop Engine', desc: 'Understand thread-blocking and Infinite Loops.' },
    ]
  },
  {
    title: "Phase 3: The Browser & DOM Manipulation",
    modules: [
      { id: 'w8', num: 8, title: 'Function Architecture', desc: 'Master scope, closures, and arrow functions.' },
      { id: 'w9', num: 9, title: 'Event Listeners', desc: 'Capture user inputs, clicks, and keystrokes.' },
      { id: 'w10', num: 10, title: 'Asynchronous JavaScript', desc: 'Master Promises, Async/Await, and API fetching.' },
    ]
  },
  {
    title: "Phase 4: Frontend Architecture (React)",
    modules: [
      { id: 'w11', num: 11, title: 'Component Thinking', desc: 'Shift your mindset to reusable UI components.' },
      { id: 'w12', num: 12, title: 'State & Props', desc: 'Manage data flow within React applications.' },
      { id: 'w13', num: 13, title: 'The useEffect Hook', desc: 'Handle side effects and component lifecycles.' },
      { id: 'w14', num: 14, title: 'Routing', desc: 'Build Single Page Applications (SPAs).' },
      { id: 'w15', num: 15, title: 'Global State', desc: 'Master Context API and Redux.' },
    ]
  },
  {
    title: "Phase 5: Backend Engineering (Node.js)",
    modules: [
      { id: 'w16', num: 16, title: 'Node.js Runtime', desc: 'Run JavaScript on the server.' },
      { id: 'w17', num: 17, title: 'Express.js Framework', desc: 'Build robust RESTful APIs.' },
      { id: 'w18', num: 18, title: 'Authentication (JWT)', desc: 'Secure your API endpoints.' },
      { id: 'w19', num: 19, title: 'Middleware', desc: 'Intercept and process requests securely.' },
      { id: 'w20', num: 20, title: 'WebSockets', desc: 'Implement real-time communication.' },
    ]
  },
  {
    title: "Phase 6: Databases & Deployment",
    modules: [
      { id: 'w21', num: 21, title: 'SQL vs NoSQL', desc: 'Understand relational vs non-relational data.' },
      { id: 'w22', num: 22, title: 'PostgreSQL Architecture', desc: 'Design schemas and manage data.' },
      { id: 'w23', num: 23, title: 'ORMs (Prisma)', desc: 'Connect your server to your database.' },
      { id: 'w24', num: 24, title: 'Docker', desc: 'Containerize your application.' },
      { id: 'w25', num: 25, title: 'CI/CD Pipeline', desc: 'Automate testing and deployment.' },
    ]
  }
]

// 🔥 THE PROGRESSION ENGINE 🔥
// This automatically calculates which module is next based on your memory.
const dynamicRoadmap = computed(() => {
  let foundActive = false;
  
  return fullRoadmap.map(phase => {
    return {
      ...phase,
      modules: phase.modules.map(mod => {
        
        // 1. If it's in the memory array, it's completed
        if (completedModules.value.includes(mod.id)) {
          return { ...mod, state: 'completed' }
        } 
        // 2. The FIRST module it finds that isn't completed becomes the Active one
        else if (!foundActive) {
          foundActive = true;
          return { ...mod, state: 'active' }
        } 
        // 3. Everything else is locked down
        else {
          return { ...mod, state: 'locked' }
        }

      })
    }
  })
})
</script>


<style scoped>
/* 🔥 FOOLPROOF FLEXBOX GRID & CSS VARIABLES 🔥 */
.roadmap-page {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* HEADER */
.header-section { text-align: center; position: relative; margin-bottom: 60px; }
.back-btn {
  position: absolute; left: 0; top: 10px; background: transparent;
  border: 1px solid var(--border-color); color: var(--text-muted);
  padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: 0.2s; font-weight: bold;
}
.back-btn:hover { background: var(--hover-bg); color: var(--text-main); }
.page-title { font-size: 2.8rem; color: var(--text-main); margin: 0 0 10px 0; transition: color 0.3s; }
.page-subtitle { color: #10B981; font-size: 1.1rem; margin: 0; font-weight: bold; }

/* PHASE BLOCKS */
.phase-block { margin-bottom: 60px; }
.phase-marker { display: flex; justify-content: center; margin-bottom: 40px; position: relative; z-index: 2; }
.phase-badge {
  border: 1px solid #10B981; color: #10B981; padding: 10px 24px;
  border-radius: 30px; font-weight: bold; background: rgba(16, 185, 129, 0.05); font-size: 1.1rem;
}

/* 🔥 THE BULLETPROOF TIMELINE ARCHITECTURE 🔥 */
.timeline-container { position: relative; width: 100%; display: flex; flex-direction: column; gap: 40px; }

/* Center Line */
.center-line {
  position: absolute; left: 50%; transform: translateX(-50%);
  top: 0; bottom: -40px; width: 2px; background-color: var(--border-color); z-index: 1;
}

/* The Row (Flexbox prevents dots from misaligning) */
.timeline-row {
  display: flex; width: 100%; align-items: center; position: relative; z-index: 2;
}

.spacer { width: 45%; }
.card-wrapper { width: 45%; display: flex; }
.marker-wrapper { width: 10%; display: flex; justify-content: center; align-items: center; }

/* CARDS */
.module-card {
  width: 100%; background: var(--bg-panel); border: 1px solid var(--border-color);
  border-radius: 12px; padding: 25px; cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 🔥 HOVER EFFECTS RESTORED 🔥 */
.module-card.completed { border-color: #10B981; }
.module-card.completed:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(16, 185, 129, 0.15); border-color: #10B981; }

.module-card.active { border-color: #F59E0B; box-shadow: 0 0 15px rgba(245, 158, 11, 0.1); }
.module-card.active:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.25); }


/* 🔥 LOCK LOGIC WITH RED HOVER RESTORED 🔥 */
.module-card.locked { 
  border-color: var(--border-color); 
  opacity: 0.6; 
  cursor: not-allowed; 
  filter: grayscale(0.8);
}

.module-card.locked:hover { 
  transform: translateY(-5px); 
  border-color: #EF4444; 
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.15); 
  opacity: 1; 
  filter: grayscale(0);
}

/* DOTS */
.dot { width: 16px; height: 16px; border-radius: 50%; background: var(--bg-main); border: 3px solid var(--border-color); transition: all 0.3s ease; }
.completed-dot { border-color: #10B981; background: var(--bg-main); box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }
.active-dot { border-color: #F59E0B; background: #F59E0B; box-shadow: 0 0 20px rgba(245, 158, 11, 0.8); width: 22px; height: 22px; }
.locked-dot { border-color: var(--border-color); background: var(--bg-panel); }

/* TEXT */
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: bold; }
.mod-label { color: var(--text-muted); letter-spacing: 2px; font-size: 0.85rem; text-transform: uppercase; }
.module-title { color: var(--text-main); font-size: 1.4rem; margin: 0 0 10px 0; transition: color 0.3s; }
.module-desc { color: var(--text-muted); line-height: 1.5; margin: 0; font-size: 1rem; transition: color 0.3s; }
.status-icon { font-size: 1.2rem; }
</style>
