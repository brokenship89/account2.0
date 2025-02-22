<script setup>
import { ref } from 'vue'

const registerForm = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const countdown = ref(0)
const timer = ref(null)

const emit = defineEmits(['register', 'switchToLogin'])

const startCountdown = () => {
  countdown.value = 60
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer.value)
    }
  }, 1000)
}

const handleSendCode = () => {
  if (countdown.value > 0) return
  // 这里添加发送验证码的逻辑
  console.log('发送验证码到：', registerForm.value.phone)
  startCountdown()
}

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  emit('register', registerForm.value)
}
</script>

<template>
  <div class="register-form">
    <h3 class="text-3xl font-bold mb-12">注册</h3>
    <form @submit.prevent="handleRegister" class="w-[400px]">
      <div class="form-item">
        <label for="phone" class="form-label">手机号</label>
        <input
          id="phone"
          v-model="registerForm.phone"
          type="tel"
          class="form-input"
          placeholder="请输入手机号"
        />
      </div>
      
      <div class="form-item">
        <label for="code" class="form-label">验证码</label>
        <div class="flex gap-3">
          <input
            id="code"
            v-model="registerForm.code"
            type="text"
            class="form-input"
            placeholder="请输入验证码"
          />
          <button 
            type="button"
            class="verify-code-btn"
            :disabled="countdown > 0"
            @click="handleSendCode"
          >
            {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
          </button>
        </div>
      </div>
      
      <div class="form-item">
        <label for="password" class="form-label">密码</label>
        <input
          id="password"
          v-model="registerForm.password"
          type="password"
          class="form-input"
          placeholder="请输入密码"
        />
      </div>
      
      <div class="form-item">
        <label for="confirmPassword" class="form-label">确认密码</label>
        <input
          id="confirmPassword"
          v-model="registerForm.confirmPassword"
          type="password"
          class="form-input"
          placeholder="请再次输入密码"
        />
      </div>
      
      <button type="submit" class="btn-submit">
        注册
      </button>
      
      <div class="text-center mt-6">
        <a href="#" class="text-secondary hover:text-primary transition-colors" @click.prevent="emit('switchToLogin')">
          已有账号？立即登录
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.register-form {
  @apply w-full px-16 py-8;
}

.form-item {
  @apply mb-6;
}

.form-label {
  @apply block mb-2 text-sm font-medium text-gray-600;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all;
}

.verify-code-btn {
  @apply px-4 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-primary/5 
    disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed
    transition-colors whitespace-nowrap text-sm font-medium min-w-[120px];
}

.btn-submit {
  @apply w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg;
}

:root {
  --color-primary: #2966ED;
  --color-secondary: #29D2ED;
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.bg-primary {
  background-color: var(--color-primary);
}
</style> 