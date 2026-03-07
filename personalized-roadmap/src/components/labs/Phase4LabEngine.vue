<template>
  <div class="lab-engine-wrapper">
    <component 
      v-if="activeLabComponent" 
      :is="activeLabComponent" 
      :lab-data="labData" 
      @lab-completed="handleCompletion"
    />
    
    <div v-else class="system-loading">
      <span class="pulse">Booting Interactive Environment...</span>
    </div>
  </div>
</template>

<script setup>
import { shallowRef, watch, defineAsyncComponent } from 'vue';

// 1. Receive the JSON data from your main ModuleView
const props = defineProps({
  labData: { type: Object, required: true }
});

const emit = defineEmits(['lab-completed']);

// 2. This variable holds the actual Game Component once loaded
const activeLabComponent = shallowRef(null);

// 3. THE REGISTRY: This connects the database ID to your actual Vue files.
// defineAsyncComponent ensures the browser ONLY downloads the code if the user reaches this specific module.
const labRegistry = {
  'jank-buster': defineAsyncComponent(() => import('./phase4/JankBuster.vue')),
  // Add this new line below!
  'router-visualizer': defineAsyncComponent(() => import('./phase4/RouterVisualizer.vue'))
};

// 4. Watch the database data. If it says 'jank-buster', load that file!
watch(() => props.labData?.lab_id, (newLabId) => {
  if (newLabId && labRegistry[newLabId]) {
    activeLabComponent.value = labRegistry[newLabId];
  } else {
    console.error(`[Lab Engine] System Error: Lab ID '${newLabId}' not found in registry.`);
  }
}, { immediate: true });

// 5. When the user wins the lab, pass that message up to ModuleView
const handleCompletion = () => {
  emit('lab-completed'); 
};
</script>

<style scoped>
.lab-engine-wrapper {
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  background: #0F172A;
  margin-top: 20px;
}
.system-loading {
  padding: 60px; 
  text-align: center; 
  color: #10B981; 
  font-family: 'Fira Code', monospace;
}
.pulse { 
  animation: pulseAnim 1.5s infinite; 
}
@keyframes pulseAnim { 
  0%, 100% { opacity: 1; } 
  50% { opacity: 0.5; } 
}
</style>
