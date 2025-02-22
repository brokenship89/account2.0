<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const currentView = ref('login')

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
        <div class="auth-left">
          <div class="brand-content">
            <h2 class="welcome-text">Account</h2>
            <p class="slogan-text">简单 · 高效 · 安全</p>
            <div class="decoration-circle"></div>
            <div class="decoration-circle-2"></div>
          </div>
        </div>
        <div class="auth-right">
          <Transition name="fade" mode="out-in">
            <LoginForm
              v-if="currentView === 'login'"
              @login="handleLogin"
              @switch-to-register="switchView('register')"
            />
            <RegisterForm
              v-else
              @register="handleRegister"
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
  @apply flex w-[1100px] h-[650px] bg-white rounded-[24px] shadow-2xl overflow-hidden;
}

.auth-left {
  @apply w-[45%] bg-primary relative overflow-hidden;
}

.brand-content {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30;
}

.welcome-text {
  @apply text-6xl font-bold text-white mb-6 relative z-30;
}

.slogan-text {
  @apply text-2xl text-white/80 relative z-30;
}

.decoration-circle {
  @apply absolute w-[400px] h-[400px] rounded-full bg-secondary/20;
  top: -150px;
  right: -150px;
  z-index: 10;
}

.decoration-circle-2 {
  @apply absolute w-[300px] h-[300px] rounded-full bg-secondary/30;
  bottom: -80px;
  left: -80px;
  z-index: 10;
}

.auth-right {
  @apply w-[55%] flex items-center justify-center bg-white px-8;
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
</style> 