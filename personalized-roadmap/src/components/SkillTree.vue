<template>
  <div class="roadmap-container">
    <VueFlow v-model="elements" :fit-view-on-init="true">
      <Background pattern-color="#334155" gap="20" />
      
      <Controls />
      
      <template #node-input="props">
        <div class="custom-node start-node">{{ props.label }}</div>
      </template>
      
      <template #node-default="props">
        <div class="custom-node default-node" @click="openTopic(props.label)">
          {{ props.label }}
        </div>
      </template>
      
      <template #node-output="props">
        <div class="custom-node end-node">{{ props.label }} 🏆</div>
      </template>
    </VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'

// Import CSS for the library
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

// Import our Syllabus Data
import { pythonNodes, pythonEdges } from '../data/pythonSyllabus.js'

// Combine them into one list for Vue Flow
const elements = ref([...pythonNodes, ...pythonEdges])

const openTopic = (topic) => {
  console.log(`User clicked: ${topic}`)
  // LATER: This is where we open the PDF summary!
}
</script>

<style scoped>
.roadmap-container {
  height: 80vh; /* Takes up most of the screen */
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
}

/* NODE STYLES */
.custom-node {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;
  border: 2px solid transparent;
}
.custom-node:hover { transform: scale(1.1); }

.start-node {
  background: #10b981; /* Cyan */
  color: #0f172a;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
}

.default-node {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}
.default-node:hover { border-color: #8b5cf6; }

.end-node {
  background: #8b5cf6; /* Violet */
  color: white;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}
</style>
