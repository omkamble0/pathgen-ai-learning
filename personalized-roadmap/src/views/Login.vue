<template>
  <div class="login-page">
    <div class="container" :class="{ 'right-panel-active': isSignUp }">
      
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social">G</a>
            <a href="#" class="social">in</a>
            <a href="#" class="social">f</a>
          </div>
          <span>or use your email for registration</span>
          
          <input type="text" v-model="registerName" placeholder="Name" required />
          <input type="email" v-model="registerEmail" placeholder="Email" required />
          <input type="password" v-model="registerPassword" placeholder="Password" required />
          
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Sign Up' }}
          </button>
        </form>
      </div>

      <div class="form-container sign-in-container">
        <form @submit.prevent="handleSignIn">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social">G</a>
            <a href="#" class="social">in</a>
            <a href="#" class="social">f</a>
          </div>
          <span>or use your account</span>
          
          <input type="email" v-model="loginEmail" placeholder="Email" required />
          <input type="password" v-model="loginPassword" placeholder="Password" required />
          
          <a href="#" class="forgot">Forgot your password?</a>
          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Loading...' : 'Sign In' }}
          </button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="isSignUp = false">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Architect!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button class="ghost" @click="isSignUp = true">Sign Up</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '../AuthService.js'

const router = useRouter()
const isSignUp = ref(false)
const isLoading = ref(false)

const loginEmail = ref('')
const loginPassword = ref('')
const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const handleSignUp = async () => {
  isLoading.value = true
  const result = await AuthService.register(registerName.value, registerEmail.value, registerPassword.value)
  isLoading.value = false
  
  if (result.success) {
    alert("Account Created! Redirecting to setup...")
    router.push('/survey')
  } else {
    alert(result.message)
  }
}

const handleSignIn = async () => {
  isLoading.value = true
  const result = await AuthService.login(loginEmail.value, loginPassword.value)
  isLoading.value = false
  
  if (result.success) {
    if (result.hasData) {
      router.push('/dashboard')
    } else {
      router.push('/survey')
    }
  } else {
    alert(result.message)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

.login-page {
  background: var(--bg-primary); 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: 0;
}

h1 { font-weight: bold; margin: 0; color: var(--text-primary); }
p { font-size: 14px; font-weight: 100; line-height: 20px; letter-spacing: 0.5px; margin: 20px 0 30px; color: white; }
span { font-size: 12px; color: var(--text-secondary); margin-bottom: 10px; }
a { color: var(--text-primary); font-size: 14px; text-decoration: none; margin: 15px 0; }

button {
  border-radius: 20px;
  border: 1px solid var(--accent-color);
  background-color: var(--accent-color);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}
button:active { transform: scale(0.95); }
button:focus { outline: none; }
button:disabled { opacity: 0.6; cursor: not-allowed; }
button.ghost { background-color: transparent; border-color: #FFFFFF; }

form {
  background-color: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 4px;
  outline: none;
}

/* MAIN CONTAINER WITH THE OVERFLOW FIX */
.container {
  background-color: var(--bg-secondary);
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden; /* This fixes the text overlapping! */
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container { left: 0; width: 50%; z-index: 2; }
.container.right-panel-active .sign-in-container { transform: translateX(100%); }
.sign-up-container { left: 0; width: 50%; opacity: 0; z-index: 1; }
.container.right-panel-active .sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s; }

@keyframes show { 0%, 49.99% { opacity: 0; z-index: 1; } 50%, 100% { opacity: 1; z-index: 5; } }

.overlay-container { position: absolute; top: 0; left: 50%; width: 50%; height: 100%; overflow: hidden; transition: transform 0.6s ease-in-out; z-index: 100; }
.container.right-panel-active .overlay-container { transform: translateX(-100%); }
.overlay { background: linear-gradient(to right, var(--accent-color), #781a44); background-repeat: no-repeat; background-size: cover; background-position: 0 0; color: #FFFFFF; position: relative; left: -100%; height: 100%; width: 200%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
.container.right-panel-active .overlay { transform: translateX(50%); }
.overlay-panel { position: absolute; display: flex; align-items: center; justify-content: center; flex-direction: column; padding: 0 40px; text-align: center; top: 0; height: 100%; width: 50%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
.overlay-left { transform: translateX(-20%); }
.container.right-panel-active .overlay-left { transform: translateX(0); }
.overlay-right { right: 0; transform: translateX(0); }
.container.right-panel-active .overlay-right { transform: translateX(20%); }
.social-container { margin: 20px 0; }
.social-container a { border: 1px solid #DDDDDD; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; margin: 0 5px; height: 40px; width: 40px; }
</style>
