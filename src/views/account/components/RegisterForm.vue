<script setup>
import { ref } from 'vue'
import { accountApi } from '@/api'
import { useRouter } from 'vue-router'

const registerForm = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
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
  
  // 添加手机号验证
  if (!registerForm.value.phone) {
    alert('请输入手机号')
    return
  }
  
  // 添加手机号格式验证
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(registerForm.value.phone)) {
    alert('请输入正确的手机号格式')
    return
  }

  try {
    await accountApi.sendCode(registerForm.value.phone, 'register')
    startCountdown()
  } catch (error) {
    // 处理频率限制错误
    if (error.response?.data?.remaining_time) {
      countdown.value = error.response.data.remaining_time
      startCountdown()
      alert(`请等待 ${error.response.data.remaining_time} 秒后再试`)
    } else {
      // 其他错误处理
      const errorMsg = error.response?.data?.error || 
                      error.response?.data?.message || 
                      '发送验证码失败'
      alert(errorMsg)
    }
    console.error('发送验证码失败：', error.response?.data)
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
      // 1. 先验证验证码
      const verifyRes = await accountApi.verifyPhone({
        phone: registerForm.value.phone,
        code: registerForm.value.code
      })
      console.log('验证码验证成功：', verifyRes)

      // 2. 设置密码
      if (!verifyRes.temp_token) {
        throw new Error('未获取到临时令牌')
      }

      const setPasswordRes = await accountApi.setPassword({
        password: registerForm.value.password,
        confirm_password: registerForm.value.confirmPassword
      }, verifyRes.temp_token)
      console.log('密码设置成功：', setPasswordRes)

      // 3. 注册成功后自动登录
      const loginRes = await accountApi.login({
        phone: registerForm.value.phone,
        password: registerForm.value.password
      })
      console.log('登录成功：', loginRes)

      // 4. 保存token并直接跳转
      const token = `Token ${loginRes.access_token}`
      localStorage.setItem('token', token)

      if (loginRes.refresh_token) {
        localStorage.setItem('refresh_token', loginRes.refresh_token)
      }

      // 直接跳转到首页，不显示提示
      router.push('/')
      
    } catch (error) {
      let errorMsg = '操作失败'
      if (error.response?.data) {
        if (error.response.data.non_field_errors) {
          errorMsg = error.response.data.non_field_errors[0]
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message
        } else if (error.response.data.error) {
          errorMsg = error.response.data.error
        }
      }
      alert(errorMsg)
      console.error('注册过程错误：', error.response?.data || error)
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