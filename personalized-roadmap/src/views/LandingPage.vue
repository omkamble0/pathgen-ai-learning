<template>
  <div class="home-page">
    <div class="hero-section">
      <h1 class="title">Architect Your <br><span class="highlight">Technical Future.</span></h1>
      <p class="subtitle">
        Personalized curriculum for Python, JS, and C++.<br>
        Engineered for precision learning and career growth.
      </p>
      
      <div class="action-buttons">
        <button class="primary-btn" @click="$router.push('/roadmap')">Initialize Path</button>
        <button class="secondary-btn" @click="$router.push('/dashboard')">Open Dashboard</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🔥 FULLY BOUND TO CSS VARIABLES 🔥 */
.home-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  /* Uses the global background so it switches automatically */
  background-color: transparent; 
}

.hero-section {
  max-width: 800px;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  font-size: 4rem;
  font-weight: 900;
  color: var(--text-main);
  margin-bottom: 20px;
  line-height: 1.1;
  transition: color 0.3s ease;
}

.highlight {
  /* Keeps the purple gradient glow in both modes */
  background: linear-gradient(90deg, #8B5CF6, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 40px;
  transition: color 0.3s ease;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.primary-btn {
  background: #8B5CF6;
  color: #FFFFFF;
  border: none;
  padding: 16px 36px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
}

.secondary-btn {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 16px 36px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.secondary-btn:hover {
  background: var(--hover-bg);
  border-color: var(--text-muted);
}
</style>
<style scoped>
.home-page { 
  height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center;
  background-color: transparent; 
}
.title { 
  font-size: 4.5rem; font-weight: 900; color: var(--text-main); 
  line-height: 1; margin-bottom: 25px; 
}
.highlight { 
  background: linear-gradient(90deg, var(--accent-user), #3B82F6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.subtitle { font-size: 1.3rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px auto; }
.primary-btn { 
  background: var(--accent-user); color: #fff; border: none; 
  padding: 18px 40px; border-radius: 14px; font-size: 1.1rem; font-weight: 800; 
  cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.primary-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.2); }
</style>