<template>
  <div class="portal-wrapper">
    <div class="portal-card">
      <form @submit.prevent="handleLogin">
        <h1>Portal Access</h1>
        
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="username" required />
          <i class='bx bxs-user'></i>
        </div>
        
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required />
          <i class='bx bxs-lock-alt'></i>
        </div>

        <div class="options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" class="auth-btn">Enter System</button>

        <div class="footer-link">
          <p>Don't have an account? <a href="#" @click.prevent="router.push('/register')">Register</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  const btn = document.querySelector('.auth-btn')
  btn.innerText = 'Authenticating...'
  
  // 1. Get users from storage
  const users = JSON.parse(localStorage.getItem('system_users') || '[]')
  
  // 2. Find user
  const validUser = users.find(u => u.username === username.value && u.password === password.value)

  setTimeout(() => {
    if (validUser) {
      // Success
      localStorage.setItem('user-name', validUser.username)
      router.push('/dashboard')
    } else {
      // Failure
      alert('Invalid Username or Password!')
      btn.innerText = 'Enter System'
      btn.style.opacity = '1'
    }
  }, 1000)
}
</script>

<style scoped>
/* ... Keep your existing CSS styles exactly as they are ... */
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* { box-sizing: border-box; }
/* Copy the rest of the styles from your previous PortalLogin.vue here */
/* (I am omitting the CSS here to save space, but make sure you keep the CSS you had!) */

.portal-wrapper {
  position: fixed; inset: 0; display: flex; justify-content: center; align-items: center; z-index: 10000;
  background: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop') no-repeat center center;
  background-size: cover; background-color: #2c0b4f; font-family: 'Poppins', sans-serif;
}

.portal-card {
  position: relative; width: 420px; max-width: 90%; background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); color: #fff; border-radius: 10px; padding: 30px 40px;
}

.portal-card h1 { font-size: 36px; text-align: center; margin-bottom: 20px; }

.input-group { position: relative; width: 100%; height: 50px; margin: 30px 0; }
.input-group input {
  width: 100%; height: 100%; background: transparent; border: none; outline: none;
  border: 2px solid rgba(255, 255, 255, 0.2); border-radius: 40px; font-size: 16px;
  color: #fff; padding: 0 45px 0 20px; 
}
.input-group input::placeholder { color: #fff; }
.input-group i { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 20px; }

.options { display: flex; justify-content: space-between; font-size: 14.5px; margin: -15px 0 15px; }
.options label input { accent-color: #fff; margin-right: 3px; }
.options a { color: #fff; text-decoration: none; }
.options a:hover { text-decoration: underline; }

.auth-btn {
  width: 100%; height: 45px; background: #fff; border: none; outline: none;
  border-radius: 40px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); cursor: pointer;
  font-size: 16px; color: #333; font-weight: 600; transition: all 0.3s;
}
.auth-btn:hover { background: #ddd; transform: scale(1.02); }

.footer-link { font-size: 14.5px; text-align: center; margin-top: 20px; }
.footer-link p a { color: #fff; text-decoration: none; font-weight: 600; }
.footer-link p a:hover { text-decoration: underline; }
</style>
