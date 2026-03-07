<template>
  <div class="dashboard-page">
    <div class="dash-header">
      <h1 class="welcome-text">PathGen <span class="accent-name">Terminal</span></h1>
      <p class="subtitle">System Status: <span class="text-green">Online</span> | Architecture Track</p>
      <div class="date-badge">{{ currentDate }}</div>
    </div>

    <div class="dash-grid">
      <div class="dash-card mastery-card">
        <div class="mastery-info">
          <div class="card-label">Current Mastery</div>
          <div class="status-pill pending">DATA SYNCED</div>
        </div>
        
        <div class="progress-ring" :style="`--progress: ${progressPercentage}`">
          <div class="ring-text">{{ progressPercentage }}%</div>
        </div>
        
        <div class="mastery-stats">
          <div class="stat-text"><strong>{{ completedCount }} / 25</strong><br>Modules Completed</div>
          <button class="resume-btn" @click="$router.push('/roadmap')">RESUME PATH ➔</button>
        </div>
      </div>

      <div class="dash-card streak-card">
        <h3 class="card-title">Active Streak</h3>
        <div class="streak-value">3 <span class="fire-icon">🔥</span></div>
        <div class="card-label center">Days Active</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentDate = ref('')
const completedCount = ref(0)
const progressPercentage = ref(0)

onMounted(() => {
  const options = { weekday: 'long', month: 'short', day: 'numeric' }
  currentDate.value = new Date().toLocaleDateString('en-US', options)

  // Load from memory
  const saved = JSON.parse(localStorage.getItem('completed_modules') || '[]')
  completedCount.value = saved.length
  // Calculate based on the full 25 modules
  progressPercentage.value = Math.round((saved.length / 25) * 100)
})
</script>

<style scoped>
.dashboard-page { padding: 50px 40px; max-width: 1200px; margin: 0 auto; animation: slideUp 0.4s ease; }
@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.dash-header { margin-bottom: 40px; position: relative; }
.welcome-text { font-size: 2.5rem; margin: 0; color: var(--text-main); }
.accent-name { color: var(--accent-user); }
.date-badge { position: absolute; top: 10px; right: 0; background: var(--bg-panel); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 20px; font-weight: bold; }
.dash-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.dash-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; display: flex; flex-direction: column; justify-content: space-between; }
.mastery-card { flex-direction: row; align-items: center; }
.progress-ring { 
  width: 110px; height: 110px; border-radius: 50%; 
  background: conic-gradient(var(--accent-user) calc(var(--progress) * 1%), var(--border-color) 0);
  display: flex; align-items: center; justify-content: center; position: relative; 
}
.progress-ring::before { content: ''; position: absolute; inset: 8px; background: var(--bg-card); border-radius: 50%; }
.ring-text { position: relative; z-index: 1; font-size: 1.5rem; font-weight: bold; }
.resume-btn { background: var(--accent-user); color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
.streak-value { font-size: 3rem; font-weight: 900; text-align: center; }
</style>
