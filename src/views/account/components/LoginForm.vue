<script setup>
import { ref } from 'vue'

const loginForm = ref({
  phone: '',
  password: ''
})

const emit = defineEmits(['login', 'switchToRegister'])

const handleLogin = () => {
  emit('login', loginForm.value)
}
</script>

<template>
  <div class="register-form">
    <h3 class="text-3xl font-bold mb-12">登录</h3>
    <form @submit.prevent="handleLogin" class="w-[400px]">
      <div class="form-item">
        <label for="phone" class="form-label">手机号</label>
        <input
          id="phone"
          v-model="loginForm.phone"
          type="tel"
          class="form-input"
          placeholder="请输入手机号"
        />
      </div>
      
      <div class="form-item">
        <label for="password" class="form-label">密码</label>
        <input
          id="password"
          v-model="loginForm.password"
          type="password"
          class="form-input"
          placeholder="请输入密码"
        />
      </div>
      
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <label class="flex items-center">
            <input type="checkbox" class="w-4 h-4 rounded border-2 border-gray-300 text-primary">
          </label>
          <span class="text-sm text-gray-600">记住我</span>
        </div>
        <a href="#" class="text-sm text-secondary hover:text-primary transition-colors">忘记密码？</a>
      </div>
      
      <button type="submit" class="btn-submit">
        登录
      </button>
      
      <div class="text-center mt-6">
        <a href="#" class="text-secondary hover:text-primary transition-colors" @click.prevent="emit('switchToRegister')">
          还没有账号？立即注册
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