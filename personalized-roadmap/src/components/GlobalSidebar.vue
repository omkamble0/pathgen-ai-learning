<template>
  <div>
    <button class="menu-toggle" @click="toggleMenu">☰</button>

    <div class="backdrop" v-if="isOpen" @click="closeMenu"></div>

    <aside class="sidebar" :class="{ 'open': isOpen }">
      <div class="sidebar-header">
        <div class="logo-area">
          <span class="bolt">⚡</span> PATHGEN
        </div>
        <button class="close-btn" @click="closeMenu">✕</button>
      </div>

      <nav class="nav-links">
        <router-link to="/" class="nav-item" @click="closeMenu">
          <span>🏠</span> Home
        </router-link>
        <router-link to="/dashboard" class="nav-item" @click="closeMenu">
          <span>📊</span> Dashboard
        </router-link>
        <router-link to="/roadmap" class="nav-item" @click="closeMenu">
          <span>🗺️</span> My Roadmap
        </router-link>
        <router-link to="/achievements" class="nav-item" @click="closeMenu">
          <span>🏆</span> Achievements
        </router-link>
        <router-link to="/settings" class="nav-item" @click="closeMenu">
          <span>⚙️</span> Settings
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="avatar">O</div>
          <div class="user-info">
            <span class="username">Om</span>
            <span class="role">STUDENT ACCOUNT</span>
          </div>
        </div>
        <button @click="$router.push('/login')" class="logout-icon" title="Log Out">
          ➔
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const toggleMenu = () => { isOpen.value = !isOpen.value }
const closeMenu = () => { isOpen.value = false }
</script>

<style scoped>
/* Basic Sidebar Setup */
.menu-toggle {
  position: fixed; top: 20px; left: 20px; z-index: 200;
  background: var(--bg-secondary); color: var(--text-primary);
  border: 1px solid var(--border-color); font-size: 24px; padding: 5px 12px; border-radius: 8px; cursor: pointer;
}
.backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(2px); z-index: 290;
}
.sidebar {
  width: 280px; height: 100vh;
  background: var(--bg-primary); border-right: 1px solid var(--border-color);
  display: flex; flex-direction: column;
  position: fixed; top: 0; left: 0;
  transform: translateX(-100%); transition: transform 0.3s ease-in-out;
  z-index: 300;
}
.sidebar.open { transform: translateX(0); }

/* Header & Nav */
.sidebar-header { padding: 25px; display: flex; justify-content: space-between; align-items: center; }
.logo-area { font-size: 24px; font-weight: 800; color: var(--text-primary); }
.bolt { color: var(--accent-color); }
.close-btn { background: none; border: none; color: var(--text-secondary); font-size: 24px; cursor: pointer; }

.nav-links { padding: 0 15px; display: flex; flex-direction: column; gap: 10px; flex-grow: 1; }
.nav-item {
  text-decoration: none; color: var(--text-secondary); padding: 12px 15px; border-radius: 8px;
  display: flex; align-items: center; gap: 12px; font-weight: 500; transition: all 0.2s;
}
.nav-item:hover, .router-link-active { background: var(--bg-secondary); color: var(--text-primary); }
.router-link-active { border-left: 3px solid var(--accent-color); }

/* NEW FOOTER STYLES */
.sidebar-footer {
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-secondary);
}

.user-profile { display: flex; align-items: center; gap: 12px; }
.avatar {
  width: 40px; height: 40px;
  background: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  font-weight: bold; font-size: 1.2rem;
}
.user-info { display: flex; flex-direction: column; }
.username { font-weight: bold; color: var(--text-primary); font-size: 0.95rem; }
.role { font-size: 0.7rem; color: var(--text-secondary); letter-spacing: 0.5px; }

.logout-icon {
  background: transparent; border: none;
  color: #eb1736; /* Painful Red for logout */
  font-size: 1.2rem; cursor: pointer;
  transition: transform 0.2s;
}
.logout-icon:hover { transform: translateX(3px); }
</style>
