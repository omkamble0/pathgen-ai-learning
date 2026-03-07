<template>
  <div class="loader-overlay">
    <div class="loader-content">
      <div class="spinner"></div>
      <div class="loading-text">SYSTEM INITIALIZING...</div>
      <div class="loading-subtext">Accessing Secure Data Modules</div>
    </div>
  </div>
</template>

<script setup>
/* Visual component only */
</script>

<style scoped>
.loader-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: #05080a; z-index: 99999;
  display: flex; justify-content: center; align-items: center; flex-direction: column;
}
.spinner {
  width: 60px; height: 60px;
  border: 4px solid rgba(99, 102, 241, 0.1); border-top: 4px solid #6366f1;
  border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}
.loading-text {
  font-family: monospace; font-weight: 900; color: white; letter-spacing: 4px;
  font-size: 18px; animation: pulse 1.5s infinite;
}
.loading-subtext {
  margin-top: 8px; color: #64748b; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; text-shadow: 0 0 10px #6366f1; } 100% { opacity: 0.5; } }
</style>
