<template>
  <div class="app-wrapper">
    <aside class="sidebar">
      <div class="brand"><span class="lightning-icon">⚡</span> PATHGEN</div>
      <nav class="nav-menu">
        <router-link to="/home" class="nav-link">🏠 Home</router-link>
        <router-link to="/dashboard" class="nav-link">📊 Dashboard</router-link>
        <router-link to="/roadmap" class="nav-link">🗺️ My Roadmap</router-link>
        <router-link to="/achievements" class="nav-link">🏆 Achievements</router-link>
        <router-link to="/settings" class="nav-link">⚙️ Settings</router-link>
      </nav>
    </aside>

    <div class="main-container">
      <header class="top-header">
        <div class="header-spacer"></div>
        <div class="header-profile" v-if="session" @click="$router.push('/settings')">
          <div class="user-details">
            <span class="header-user-name">{{ userName }}</span>
            <span class="header-user-role">Student Account</span>
          </div>
          <div class="header-avatar">{{ userInitial }}</div>
          <button class="header-logout" @click.stop="nuclearLogout" title="Log Out">➔</button>
        </div>
      </header>

      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from './supabase.js' 

const session = ref(null)

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  supabase.auth.onAuthStateChange((_event, newSession) => { session.value = newSession })

  // Initialize Theme & Accent
  const savedTheme = localStorage.getItem('pathgen_theme') || 'dark'
  if (savedTheme === 'light') document.body.classList.add('light-mode')
  
  const savedAccent = localStorage.getItem('pathgen_accent') || '#8B5CF6'
  document.documentElement.style.setProperty('--accent-user', savedAccent)
})

const userName = computed(() => {
  if (!session.value?.user) return 'Guest'
  return session.value.user.user_metadata?.full_name || session.value.user.email.split('@')[0]
})
const userInitial = computed(() => userName.value.charAt(0).toUpperCase())

const nuclearLogout = async () => {
  await supabase.auth.signOut()
  localStorage.clear()
  window.location.href = '/login'
}
</script>

<style>
:root {
  /* DARK THEME (Pro Grade) */
  --bg-main: #050505;
  --bg-panel: #0B0E14;
  --bg-card: #121822;
  --border-color: #1E293B;
  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
  --accent-user: #8B5CF6; 
  --hover-bg: rgba(255, 255, 255, 0.05);
}

body.light-mode {
  /* LIGHT THEME (Using your exact palette: image_bd55c7.jpg) */
  --bg-main: #BDD8E9;         /* Pale Blue */
  --bg-panel: #F4F9FD;        /* Off White */
  --bg-card: #FFFFFF;         /* Pure White Cards */
  --border-color: #7BBDE8;    /* Sky Blue */
  --text-main: #001D39;       /* Darkest Blue */
  --text-muted: #49769F;      /* Muted Blue */
  --hover-bg: rgba(10, 65, 116, 0.1);
}

body { margin: 0; background-color: var(--bg-main); color: var(--text-main); font-family: 'Inter', sans-serif; transition: 0.3s ease; }
.app-wrapper { display: flex; min-height: 100vh; }

/* SIDEBAR */
.sidebar { width: 260px; background-color: var(--bg-panel); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; z-index: 100; }
.brand { padding: 30px 25px; font-size: 1.4rem; font-weight: 900; letter-spacing: 1px; color: var(--text-main); }
.lightning-icon { color: var(--accent-user); }
.nav-menu { padding: 0 15px; display: flex; flex-direction: column; gap: 8px; }
.nav-link { text-decoration: none; color: var(--text-muted); padding: 12px 15px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 12px; transition: 0.2s; }
.nav-link:hover { background: var(--hover-bg); color: var(--text-main); }
.router-link-active { background-color: var(--hover-bg); color: var(--accent-user); border-right: 4px solid var(--accent-user); border-radius: 8px 0 0 8px; }

/* MAIN AREA */
.main-container { flex: 1; display: flex; flex-direction: column; background-color: var(--bg-main); transition: background 0.3s; }

/* HEADER (TOP RIGHT PROFILE) */
.top-header { height: 70px; padding: 0 40px; display: flex; align-items: center; background: transparent; }
.header-spacer { flex: 1; }
.header-profile { display: flex; align-items: center; gap: 15px; cursor: pointer; padding: 8px 15px; border-radius: 12px; transition: 0.2s; }
.header-profile:hover { background: var(--hover-bg); }
.user-details { text-align: right; display: flex; flex-direction: column; }
.header-user-name { font-weight: 700; font-size: 0.95rem; color: var(--text-main); }
.header-user-role { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
.header-avatar { width: 40px; height: 40px; background: var(--accent-user); color: #fff; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.header-logout { background: transparent; border: none; color: #EF4444; font-size: 1.2rem; cursor: pointer; margin-left: 10px; opacity: 0.6; transition: 0.2s; }
.header-logout:hover { opacity: 1; transform: translateX(3px); }

.content-area { flex: 1; padding: 0 40px 40px 40px; overflow-y: auto; }
</style>
