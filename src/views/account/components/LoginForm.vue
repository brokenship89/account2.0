<script setup>
import { ref, onUnmounted } from 'vue'
import { accountApi } from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginForm = ref({
  phone: '',
  password: ''
})

const rememberMe = ref(false)

const emit = defineEmits(['login', 'switchToRegister'])

const handleLogin = async () => {
  try {
    const res = await accountApi.login(loginForm.value)
    console.log('登录响应：', res)
    
    if (!res || !res.access_token) {
      throw new Error('登录响应格式错误')
    }
    
    // 保存token
    const token = `Token ${res.access_token}`
    localStorage.setItem('token', token)
    
    // 保存 refresh_token
    if (res.refresh_token) {
      localStorage.setItem('refresh_token', res.refresh_token)
    }
    
    // 如果记住我，保存登录信息
    if (rememberMe.value) {
      localStorage.setItem('phone', loginForm.value.phone)
      // 使用简单加密保存密码（生产环境建议使用更安全的方式）
      localStorage.setItem('password', btoa(loginForm.value.password))
      localStorage.setItem('rememberMe', 'true')
    } else {
      // 如果取消记住我，清除所有保存的登录信息
      localStorage.removeItem('phone')
      localStorage.removeItem('password')
      localStorage.removeItem('rememberMe')
    }

    router.push('/')
  } catch (error) {
    console.error('登录失败：', error)
    if (error.response?.data) {
      alert(error.response.data.message || error.response.data.detail || '登录失败')
    } else {
      alert(error.message || '登录失败')
    }
  }
}

// 页面加载时检查是否有保存的登录信息
const initSavedLoginInfo = () => {
  const savedRememberMe = localStorage.getItem('rememberMe')
  if (savedRememberMe === 'true') {
    const savedPhone = localStorage.getItem('phone')
    const savedPassword = localStorage.getItem('password')
    
    if (savedPhone) {
      loginForm.value.phone = savedPhone
    }
    if (savedPassword) {
      // 解密密码
      try {
        loginForm.value.password = atob(savedPassword)
      } catch (e) {
        console.error('密码解密失败')
      }
    }
    rememberMe.value = true
  }
}

// 在组件挂载时初始化
initSavedLoginInfo()

// 在组件卸载时清理（如果需要的话）
onUnmounted(() => {
  if (!rememberMe.value) {
    loginForm.value.phone = ''
    loginForm.value.password = ''
  }
})
</script>

<template>
  <div class="register-form">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12">登录</h3>
    <form @submit.prevent="handleLogin" class="w-full max-w-[400px]">
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
            <input 
              type="checkbox" 
              v-model="rememberMe"
              class="w-4 h-4 rounded border-2 border-gray-300 text-primary"
            >
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
  @apply w-full px-4 md:px-16 py-4 md:py-8;
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