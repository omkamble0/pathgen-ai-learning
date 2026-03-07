<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const answers = ref({})

const questions = [
  {
    id: 'goal',
    text: 'What is your primary tech goal?',
    options: ['Web Development', 'Cybersecurity', 'AI/Data Science', 'Cloud Computing']
  },
  {
    id: 'level',
    text: 'What is your current experience level?',
    options: ['Beginner', 'Intermediate', 'Advanced']
  }
]

const selectOption = (option) => {
  answers.value[questions[currentStep.value].id] = option
  if (currentStep.value < questions.length - 1) {
    currentStep.value++
  } else {
    alert('Generating your unique roadmap...')
    console.log('User Data:', answers.value)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
    <div class="mb-8">
      <p class="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-2">Step {{ currentStep + 1 }} of {{ questions.length }}</p>
      <h2 class="text-2xl font-bold text-gray-900">{{ questions[currentStep].text }}</h2>
    </div>

    <div class="space-y-3">
      <button 
        v-for="option in questions[currentStep].options" 
        :key="option"
        @click="selectOption(option)"
        class="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-gray-700"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
