<template>
  <div class="achievements-container">
    <header class="achievements-header">
      <div class="header-text">
        <h2>Trophy Room</h2>
        <p>Track your neural link milestones and operative ranks.</p>
      </div>
      <div class="stats-overview">
        <div class="stat-box">
          <span class="stat-label">Total XP</span>
          <span class="stat-value highlight">{{ totalXP }}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Badges</span>
          <span class="stat-value">{{ unlockedCount }} / {{ badges.length }}</span>
        </div>
      </div>
    </header>

    <div class="badge-grid">
      <div 
        v-for="(badge, index) in badges" 
        :key="index"
        class="badge-card"
        :class="{ 'locked': !badge.unlocked }"
      >
        <div class="badge-icon-wrapper">
          <div class="badge-icon">{{ badge.icon }}</div>
          <div v-if="!badge.unlocked" class="lock-overlay">🔒</div>
        </div>
        
        <div class="badge-info">
          <h3>{{ badge.title }}</h3>
          <p>{{ badge.description }}</p>
        </div>
        
        <div class="badge-status">
          <span v-if="badge.unlocked" class="status-text earned">Earned</span>
          <span v-else class="status-text missing">Locked</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { AuthService } from '../AuthService.js'

// We will fetch real XP from Supabase later, but here is a placeholder
const totalXP = ref(500) 

// Mock Badge Data
const badges = ref([
  {
    title: "Initiation",
    description: "Successfully created an Architect profile.",
    icon: "⚡",
    unlocked: true
  },
  {
    title: "First Blood",
    description: "Completed your first learning module.",
    icon: "🎯",
    unlocked: true
  },
  {
    title: "Cloud Commander",
    description: "Mastered cloud infrastructure and virtualization deployments.",
    icon: "☁️",
    unlocked: false
  },
  {
    title: "Security Sentinel",
    description: "Built an AI-driven intruder detection protocol.",
    icon: "🛡️",
    unlocked: false
  },
  {
    title: "Frontend Virtuoso",
    description: "Built a fully responsive, state-managed UI.",
    icon: "🎨",
    unlocked: false
  },
  {
    title: "Database Architect",
    description: "Successfully implemented Row-Level Security in Postgres.",
    icon: "🗄️",
    unlocked: true
  }
])

const unlockedCount = computed(() => {
  return badges.value.filter(b => b.unlocked).length
})

onMounted(async () => {
  // In the future, we will query Supabase here to check which modules the user has finished!
  // const userProgress = await AuthService.getUserProgress()
  // if (userProgress) totalXP.value = userProgress.xp
})
</script>

<style scoped>
.achievements-container {
  padding: 40px;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--text-primary);
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* HEADER & STATS */
.achievements-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 25px;
}

.header-text h2 {
  font-size: 2.2rem;
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.header-text p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 1.1rem;
}

.stats-overview {
  display: flex;
  gap: 20px;
}

.stat-box {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 15px 25px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.stat-value.highlight {
  color: var(--accent-color);
}

/* GRID LAYOUT */
.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

/* BADGE CARDS */
.badge-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  position: relative;
  overflow: hidden;
}

.badge-card:not(.locked):hover {
  transform: translateY(-5px);
  border-color: var(--accent-color);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.badge-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 15px rgba(var(--accent-color), 0.2);
}

.badge-icon {
  font-size: 2.5rem;
}

.badge-info h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.badge-info p {
  margin: 0 0 20px 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.badge-status {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
}

.status-text {
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-text.earned { color: #10B981; }
.status-text.missing { color: var(--text-secondary); }

/* LOCKED STATE STYLES */
.badge-card.locked {
  opacity: 0.6;
  background: rgba(15, 23, 42, 0.4);
  border-style: dashed;
}

.badge-card.locked .badge-icon-wrapper {
  border-color: var(--border-color);
  background: transparent;
  box-shadow: none;
  filter: grayscale(100%);
}

.lock-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(11, 14, 20, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

/* LIGHT THEME OVERRIDES */
:global(body.light-theme) .badge-card { background-color: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
:global(body.light-theme) .stat-box { background-color: #FFFFFF; border: 1px solid #E2E8F0; }
:global(body.light-theme) .badge-card.locked { background-color: #F8FAFC; border-color: #CBD5E1; }
:global(body.light-theme) .lock-overlay { background: rgba(255, 255, 255, 0.7); }
</style>
