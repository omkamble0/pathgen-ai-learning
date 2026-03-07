import { createRouter, createWebHistory } from 'vue-router'

// Notice the single dot './' instead of '../'
import Login from './views/Login.vue'
import LandingPage from './views/LandingPage.vue'
import Dashboard from './views/Dashboard.vue'
import RoadmapView from './views/RoadmapView.vue'
import Achievements from './views/Achievements.vue'
import Settings from './views/Settings.vue'
import Survey from './views/Survey.vue'

// Import both your original Mission view AND the new Module view
import MissionView from './views/MissionView.vue' 
import ModuleView from './views/ModuleView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: LandingPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/survey', name: 'Survey', component: Survey },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/roadmap', name: 'Roadmap', component: RoadmapView },
  { path: '/achievements', name: 'Achievements', component: Achievements },
  { path: '/settings', name: 'Settings', component: Settings },
  
  // Your original Mission route (untouched)
  { path: '/mission', name: 'Mission', component: MissionView },
  
  // The NEW dynamic Module route
  { path: '/module/:id', name: 'Module', component: ModuleView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
