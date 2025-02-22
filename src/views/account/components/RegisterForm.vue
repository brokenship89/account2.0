<script setup>
import { ref } from 'vue'
import { accountApi } from '@/api'
import { useRouter } from 'vue-router'

const registerForm = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  tempToken: ''
})

const countdown = ref(0)
const timer = ref(null)

const emit = defineEmits(['register', 'switchToLogin'])

const router = useRouter()

const startCountdown = () => {
  countdown.value = 60
  timer.value = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer.value)
    }
  }, 1000)
}

const handleSendCode = async () => {
  if (countdown.value > 0) return
  
  // 手机号验证
  if (!registerForm.value.phone) {
    alert('请输入手机号')
    return
  }
  
  // 手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(registerForm.value.phone)) {
    alert('请输入正确的手机号格式')
    return
  }

  try {
    const res = await accountApi.sendCode(registerForm.value.phone, 'register')
    // 保存临时token
    if (res.temp_token) {
      registerForm.value.tempToken = res.temp_token
    }
    startCountdown()
  } catch (error) {
    if (error.data?.remaining_time) {
      countdown.value = error.data.remaining_time
      startCountdown()
    }
    alert(error.message)
  }
}

const handleRegister = async () => {
  try {
    // 表单验证
    if (!registerForm.value.phone) {
      alert('请输入手机号')
      return
    }
    if (!registerForm.value.code) {
      alert('请输入验证码')
      return
    }
    if (!registerForm.value.password) {
      alert('请输入密码')
      return
    }
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }

    try {
      // 使用发送验证码时获得的临时token设置密码
      await accountApi.setPassword({
        password: registerForm.value.password,
        confirm_password: registerForm.value.confirmPassword
      }, registerForm.value.tempToken)

      // 注册成功后自动登录
      const loginRes = await accountApi.login({
        phone: registerForm.value.phone,
        password: registerForm.value.password
      })

      // 保存token
      const token = `Token ${loginRes.access_token}`
      localStorage.setItem('token', token)
      
      if (loginRes.refresh_token) {
        localStorage.setItem('refresh_token', loginRes.refresh_token)
      }

      router.push('/')
    } catch (error) {
      alert(error.message)
      console.error('注册过程错误：', error.data)
    }
  } catch (error) {
    console.error('注册失败：', error)
  }
}
</script>

<template>
  <div class="register-form">
    <h3 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12">注册</h3>
    <form @submit.prevent="handleRegister" class="w-full max-w-[400px]">
      <div class="form-item">
        <label for="phone" class="form-label">手机号</label>
        <input
          id="phone"
          v-model="registerForm.phone"
          type="tel"
          class="form-input"
          placeholder="请输入手机号"
          maxlength="11"
          @input="registerForm.phone = registerForm.phone.replace(/\D/g, '')"
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