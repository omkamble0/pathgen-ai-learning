<template>
  <div class="settings-page">
    <h1 class="page-title">Settings</h1>

    <div class="settings-grid">
      <div class="settings-card">
        <h3 class="card-header">🎨 Appearance</h3>
        <div class="setting-row">
          <div class="info">
            <span class="label">Interface Mode</span>
            <span class="desc">Switch between Light and Dark mode</span>
          </div>
          <button class="mode-toggle" @click="toggleTheme">
            {{ isLightMode ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>

        <div class="setting-row no-border">
          <div class="info">
            <span class="label">System Accent</span>
            <span class="desc">Select your primary system color</span>
          </div>
          <div class="accent-picker">
            <div v-for="c in colors" :key="c.val" 
                 class="swatch" 
                 :style="{ background: c.val }"
                 :class="{ selected: tempAccent === c.val }"
                 @click="tempAccent = c.val">
            </div>
          </div>
        </div>
        <button class="apply-btn" @click="saveChanges" :disabled="isSaving">
          {{ isSaving ? 'Syncing...' : 'Apply System Changes' }}
        </button>
      </div>

      <div class="settings-card">
        <h3 class="card-header">👤 User Profile</h3>
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" v-model="tempName" placeholder="Enter your name" class="pro-input" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="text" :value="userEmail" disabled class="pro-input disabled" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase.js'

const isLightMode = ref(false)
const tempAccent = ref('')
const tempName = ref('')
const userEmail = ref('')
const isSaving = ref(false)

const colors = [
  { name: 'Purple', val: '#8B5CF6' },
  { name: 'Blue', val: '#3B82F6' },
  { name: 'Green', val: '#10B981' },
  { name: 'Red', val: '#EF4444' },
  { name: 'Gold', val: '#F59E0B' }
]

onMounted(async () => {
  isLightMode.value = document.body.classList.contains('light-mode')
  tempAccent.value = getComputedStyle(document.documentElement).getPropertyValue('--accent-user').trim() || '#8B5CF6'
  
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    tempName.ref = session.user.user_metadata?.full_name || ''
    tempName.value = session.user.user_metadata?.full_name || ''
    userEmail.value = session.user.email
  }
})

const toggleTheme = () => {
  isLightMode.value = !isLightMode.value
  document.body.classList.toggle('light-mode', isLightMode.value)
  localStorage.setItem('pathgen_theme', isLightMode.value ? 'light' : 'dark')
}

const saveChanges = async () => {
  isSaving.value = true
  
  // 1. Update Global CSS
  document.documentElement.style.setProperty('--accent-user', tempAccent.value)
  localStorage.setItem('pathgen_accent', tempAccent.value)

  // 2. Update Supabase User Metadata (The Fix for Display Name)
  const { error } = await supabase.auth.updateUser({
    data: { full_name: tempName.value }
  })

  if (error) alert("Error syncing profile: " + error.message)
  
  isSaving.value = false
  alert("Settings updated successfully!")
}
</script>

<style scoped>
.settings-page { animation: fadeIn 0.4s ease; }
.page-title { font-size: 2rem; font-weight: 800; margin-bottom: 30px; }
.settings-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; }

.settings-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
.card-header { margin-top: 0; margin-bottom: 25px; font-size: 1.1rem; color: var(--accent-user); text-transform: uppercase; letter-spacing: 1px; }

.setting-row { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--border-color); }
.no-border { border: none; }
.info { display: flex; flex-direction: column; }
.label { font-weight: 700; color: var(--text-main); }
.desc { font-size: 0.85rem; color: var(--text-muted); }

.mode-toggle { background: var(--bg-panel); border: 1px solid var(--border-color); color: var(--text-main); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.accent-picker { display: flex; gap: 10px; }
.swatch { width: 32px; height: 32px; border-radius: 8px; cursor: pointer; transition: 0.2s; border: 2px solid transparent; }
.swatch.selected { border-color: var(--text-main); transform: scale(1.1); box-shadow: 0 0 15px var(--accent-user); }

.apply-btn { width: 100%; margin-top: 20px; background: var(--accent-user); color: white; border: none; padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.2s; }
.apply-btn:hover { filter: brightness(1.2); transform: translateY(-2px); }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 0.9rem; font-weight: 700; margin-bottom: 8px; color: var(--text-muted); }
.pro-input { width: 100%; background: var(--bg-panel); border: 1px solid var(--border-color); padding: 12px; border-radius: 10px; color: var(--text-main); font-family: inherit; font-size: 1rem; }
.pro-input:focus { outline: none; border-color: var(--accent-user); }
.disabled { opacity: 0.5; cursor: not-allowed; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
