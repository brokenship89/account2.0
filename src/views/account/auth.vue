<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ResetPasswordForm from './components/ResetPasswordForm.vue'

const router = useRouter()
const currentView = ref('login')

// 检查是否已登录
onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    router.push('/') // 如果已登录，跳转到首页
  }
})

const handleLogin = (formData) => {
  console.log('登录数据：', formData)
  // 这里处理登录逻辑
}

const handleRegister = (formData) => {
  console.log('注册数据：', formData)
  // 这里处理注册逻辑
}

const switchView = (view) => {
  currentView.value = view
}
</script>

<template>
  <div class="bg-primary">
    <div class="auth-container">
      <div class="auth-content">
        <div class="auth-left hidden md:block">
          <div class="brand-content">
            <h2 class="welcome-text">Account</h2>
            <p class="slogan-text">简单 · 高效 · 安全</p>
            <div class="decoration-circle"></div>
            <div class="decoration-circle-2"></div>
          </div>
        </div>
        <div class="auth-right">
          <div class="brand-content-mobile md:hidden mb-8">
            <h2 class="text-4xl font-bold text-primary mb-2">Account</h2>
            <p class="text-gray-500">简单 · 高效 · 安全</p>
          </div>
          
          <Transition name="fade" mode="out-in">
            <LoginForm
              v-if="currentView === 'login'"
              @login="handleLogin"
              @switch-to-register="switchView('register')"
              @switch-to-reset="switchView('reset')"
            />
            <RegisterForm
              v-else-if="currentView === 'register'"
              @register="handleRegister"
              @switch-to-login="switchView('login')"
            />
            <ResetPasswordForm
              v-else-if="currentView === 'reset'"
              @switch-to-login="switchView('login')"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  @apply min-h-screen flex items-center justify-center bg-gray-50;
}

.auth-content {
  @apply flex w-full md:w-[1100px] h-auto md:h-[650px] bg-white 
    rounded-none md:rounded-[24px] shadow-none md:shadow-2xl overflow-hidden;
}

.auth-left {
  @apply w-[45%] bg-primary relative overflow-hidden;
}

.brand-content {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30;
}

.welcome-text {
  @apply text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 relative z-30;
}

.slogan-text {
  @apply text-xl md:text-2xl text-white/80 relative z-30;
}

.decoration-circle {
  @apply absolute w-[400px] h-[400px] rounded-full bg-secondary/20;
  top: -150px;
  right: -150px;
  z-index: 10;
  animation: float1 12s ease-in-out infinite;
}

.decoration-circle-2 {
  @apply absolute w-[300px] h-[300px] rounded-full;
  background-color: rgba(82, 219, 213, 0.12);
  bottom: -80px;
  left: -80px;
  z-index: 10;
  animation: float2 10s ease-in-out infinite;
}

@keyframes float1 {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-40px, 40px) rotate(8deg);
  }
  50% {
    transform: translate(30px, -35px) rotate(-6deg);
  }
  75% {
    transform: translate(35px, 25px) rotate(4deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

@keyframes float2 {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(35px, -35px) rotate(-8deg);
  }
  66% {
    transform: translate(-30px, 30px) rotate(10deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

.auth-right {
  @apply w-full md:w-[55%] flex flex-col items-center justify-center bg-white px-4 md:px-8 py-8;
}

.auth-right :deep(.form-container) {
  @apply w-full max-w-[360px] flex flex-col;
}

.auth-right :deep(.form-group) {
  @apply mb-6 w-full;
}

.auth-right :deep(input) {
  @apply w-full h-12 px-4 rounded-lg border border-gray-300 text-base;
}

.auth-right :deep(.form-title) {
  @apply text-3xl font-semibold mb-8 text-center;
}

.auth-right :deep(.form-subtitle) {
  @apply text-gray-500 text-center mb-8;
}

.auth-right :deep(button) {
  @apply w-full h-12 rounded-lg font-medium text-base bg-primary text-white hover:bg-primary/90;
}

.auth-right :deep(.form-footer) {
  @apply mt-6 text-center text-gray-600;
}

.auth-right :deep(a) {
  @apply text-primary hover:text-primary/80 font-medium;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style> 