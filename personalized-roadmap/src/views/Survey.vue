<template>
  <div class="survey-container">
    <div class="survey-card">
      
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: (currentStep / totalSteps) * 100 + '%' }"></div>
      </div>
      <div class="step-counter">LEVEL {{ currentStep }} OF {{ totalSteps }}</div>

      <div v-if="currentStep === 1" class="step-content fade-in">
        <h2>Choose Your Class 🎮</h2>
        <p>What tech superpower do you want to learn?</p>
        <div class="options-grid">
          <div v-for="opt in pathOptions" :key="opt.value" class="option-card" :class="{ 'selected': surveyData.path === opt.value }" @click="surveyData.path = opt.value">
            <div class="icon">{{ opt.icon }}</div>
            <h3>{{ opt.label }}</h3>
            <p>{{ opt.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 2" class="step-content fade-in">
        <h2>Current Skill Level 📊</h2>
        <p>Be honest! Where are we starting from?</p>
        <div class="options-list">
          <div v-for="opt in expOptions" :key="opt.value" class="list-card" :class="{ 'selected': surveyData.experience === opt.value }" @click="surveyData.experience = opt.value">
            <h3>{{ opt.icon }} {{ opt.label }}</h3>
            <p>{{ opt.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 3" class="step-content fade-in">
        <h2>Weekly Time ⏱️</h2>
        <p>How much time can you play... err, learn each week?</p>
        <div class="options-list">
          <div v-for="opt in timeOptions" :key="opt.value" class="list-card" :class="{ 'selected': surveyData.time === opt.value }" @click="surveyData.time = opt.value">
            <h3>{{ opt.icon }} {{ opt.label }}</h3>
            <p>{{ opt.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 4" class="step-content fade-in">
        <h2>Learning Style 🧠</h2>
        <p>How do you learn best?</p>
        <div class="options-list">
          <div v-for="opt in styleOptions" :key="opt.value" class="list-card" :class="{ 'selected': surveyData.style === opt.value }" @click="surveyData.style = opt.value">
            <h3>{{ opt.icon }} {{ opt.label }}</h3>
            <p>{{ opt.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 5" class="step-content fade-in">
        <h2>Main Quest 🎯</h2>
        <p>What is your final goal?</p>
        <div class="options-list">
          <div v-for="opt in goalOptions" :key="opt.value" class="list-card" :class="{ 'selected': surveyData.goal === opt.value }" @click="surveyData.goal = opt.value">
            <h3>{{ opt.icon }} {{ opt.label }}</h3>
            <p>{{ opt.desc }}</p>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 6" class="step-content fade-in">
        <h2>Choose Your Vibe 🦸‍♂️</h2>
        <p>Pick an avatar style for your profile.</p>
        <div class="options-grid">
          <div v-for="opt in avatarOptions" :key="opt.value" class="option-card" :class="{ 'selected': surveyData.avatar === opt.value }" @click="surveyData.avatar = opt.value">
            <div class="icon">{{ opt.icon }}</div>
            <h3>{{ opt.label }}</h3>
          </div>
        </div>
      </div>

      <div class="survey-footer">
        <button v-if="currentStep > 1" class="btn-secondary" @click="currentStep--">Back</button>
        <div class="spacer"></div>
        <button v-if="currentStep < totalSteps" class="btn-primary" :disabled="!canProceed" @click="currentStep++">Next</button>
        <button v-if="currentStep === totalSteps" class="btn-primary" :disabled="!canProceed" @click="finishSurvey">Generate Roadmap 🚀</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const totalSteps = ref(6)

const surveyData = ref({ path: '', experience: '', time: '', style: '', goal: '', avatar: '' })

// Friendly, gamified options
const pathOptions = [
  { label: "Web Dev", value: "web", icon: "🌐", desc: "Build cool websites and apps." },
  { label: "AI & Data", value: "ai", icon: "🧠", desc: "Train smart AI models." },
  { label: "Cyber Security", value: "cyber", icon: "🛡️", desc: "Learn to hack and defend." },
  { label: "Game Dev", value: "game", icon: "🎮", desc: "Make your own games." },
  { label: "Cloud Computing", value: "cloud", icon: "☁️", desc: "Master web servers." }
]
const expOptions = [
  { label: "Beginner", value: "beginner", icon: "🌱", desc: "I am starting from total scratch!" },
  { label: "Intermediate", value: "intermediate", icon: "⚡", desc: "I know the basics and have coded a bit." },
  { label: "Advanced", value: "advanced", icon: "🔥", desc: "I want the hard stuff right away." }
]
const timeOptions = [
  { label: "Chill Mode", value: "casual", icon: "🚶", desc: "1-3 hours a week." },
  { label: "Part-Time", value: "part_time", icon: "🏃", desc: "5-10 hours a week." },
  { label: "Hardcore", value: "intensive", icon: "🚀", desc: "15+ hours a week. Let's go!" }
]
const styleOptions = [
  { label: "Builder", value: "build", icon: "🛠️", desc: "I want to build projects immediately." },
  { label: "Watcher", value: "video", icon: "📺", desc: "I learn best by watching videos first." },
  { label: "Reader", value: "read", icon: "📚", desc: "I like to read the docs and theory." }
]
const goalOptions = [
  { label: "Get a Job/Internship", value: "career", icon: "💼", desc: "I want to get hired." },
  { label: "Build a Startup", value: "project", icon: "💡", desc: "I want to build my own app idea." },
  { label: "Just for Fun", value: "hobby", icon: "🎯", desc: "I love learning new tech." }
]
const avatarOptions = [
  { label: "The Hacker", value: "hacker", icon: "🥷" },
  { label: "The Architect", value: "architect", icon: "🏗️" },
  { label: "The Wizard", value: "wizard", icon: "🧙‍♂️" }
]

const canProceed = computed(() => {
  if (currentStep.value === 1) return surveyData.value.path !== ''
  if (currentStep.value === 2) return surveyData.value.experience !== ''
  if (currentStep.value === 3) return surveyData.value.time !== ''
  if (currentStep.value === 4) return surveyData.value.style !== ''
  if (currentStep.value === 5) return surveyData.value.goal !== ''
  if (currentStep.value === 6) return surveyData.value.avatar !== ''
  return false
})

const finishSurvey = () => {
  localStorage.setItem('selected_path', surveyData.value.path)
  // We save all data so we can use it to personalize the backend later!
  localStorage.setItem('user_survey', JSON.stringify(surveyData.value))
  router.push('/roadmap')
}
</script>

<style scoped>
/* Same clean CSS as before, just adapted for the new steps */
.survey-container { display: flex; justify-content: center; align-items: center; min-height: 100%; padding: 40px 20px; }
.survey-card { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 16px; width: 100%; max-width: 800px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.progress-bar { height: 8px; background: var(--bg-primary); border-radius: 10px; overflow: hidden; margin-bottom: 15px; }
.progress-fill { height: 100%; background: #10B981; transition: width 0.4s ease; }
.step-counter { text-align: center; color: var(--text-secondary); font-size: 0.85rem; font-weight: bold; letter-spacing: 2px; margin-bottom: 30px; }
.step-content { text-align: center; margin-bottom: 40px; }
.step-content h2 { font-size: 2rem; margin: 0 0 10px 0; }
.step-content p { color: var(--text-secondary); margin: 0 0 30px 0; font-size: 1.1rem; }
.options-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; }
.option-card { background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 12px; padding: 25px 20px; cursor: pointer; transition: all 0.2s; }
.option-card:hover { border-color: #10B981; transform: translateY(-3px); }
.option-card.selected { border-color: #10B981; background: rgba(16, 185, 129, 0.05); }
.option-card .icon { font-size: 2.5rem; margin-bottom: 15px; }
.option-card h3 { margin: 0 0 5px 0; font-size: 1.1rem; }
.option-card p { margin: 0; font-size: 0.85rem; color: var(--text-secondary); }
.options-list { display: flex; flex-direction: column; gap: 15px; max-width: 500px; margin: 0 auto; }
.list-card { background: var(--bg-primary); border: 2px solid var(--border-color); border-radius: 12px; padding: 20px; text-align: left; cursor: pointer; transition: all 0.2s; }
.list-card:hover { border-color: #10B981; }
.list-card.selected { border-color: #10B981; background: rgba(16, 185, 129, 0.05); }
.list-card h3 { margin: 0 0 5px 0; color: var(--text-primary); display: flex; align-items: center; gap: 10px;}
.list-card p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }
.survey-footer { display: flex; align-items: center; margin-top: 20px; }
.spacer { flex: 1; }
button { padding: 12px 25px; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-primary { background: #10B981; color: white; border: none; }
.btn-primary:not(:disabled):hover { background: #059669; transform: translateY(-2px); }
.btn-secondary { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); }
.fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
