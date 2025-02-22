<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { accountApi } from '@/api'

const router = useRouter()

// 生成8位随机数字UID
const generateUID = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

// 模拟用户信息
const userInfo = ref({
  phone: '15116224937',
  gender: '♀',
  uid: generateUID(),
  address: '浙江省杭州市',
  age: '21',
  signature: '世界是一个巨大的菜鸟驿站',
  lastLogin: '2024-02-16 15:30'
})

// 复制UID到剪贴板
const copyUID = () => {
  navigator.clipboard.writeText(userInfo.value.uid)
    .then(() => {
      alert('UID已复制到剪贴板')
    })
    .catch(() => {
      alert('复制失败，请手动复制')
    })
}

const handleLogout = async () => {
  try {
    await accountApi.logout()

    // 退出时清除所有本地存储的信息
    const keysToRemove = [
      'token',
      'refresh_token',
      'phone',
      'rememberMe',
      'expiresAt'
    ]
    
    keysToRemove.forEach(key => localStorage.removeItem(key))

    router.push('/auth')
  } catch (error) {
    console.error('退出登录失败：', error)
    alert('退出失败，请重试')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">用户中心</h1>
          </div>
          <div class="flex items-center space-x-4">
            <!-- 用户头像和弹窗 -->
            <div class="relative group">
              <div 
                class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                @click="router.push('/profile/edit')"
              >
                <svg 
                  class="w-6 h-6 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              
              <!-- 悬浮弹窗 -->
              <div class="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-lg py-6 px-6 
                          invisible opacity-0 group-hover:visible group-hover:opacity-100 
                          transition-all duration-300 z-50">
                <!-- 用户信息 -->
                <div class="relative">
                  <div class="flex items-start space-x-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mt-1">
                      <svg class="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span class="font-medium text-gray-900 text-lg">{{ userInfo.phone }}</span>
                        <div class="w-5 h-5 rounded-full bg-[#ffb6c9] flex items-center justify-center">
                          <span class="text-sm text-white">{{ userInfo.gender }}</span>
                        </div>
                      </div>
                      <div class="text-sm text-gray-400 mt-1 flex items-center gap-1">
                        <span>UID：{{ userInfo.uid }}</span>
                        <button 
                          @click="copyUID"
                          class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          title="复制UID"
                        >
                          <svg 
                            class="w-4 h-4 text-gray-400 hover:text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              stroke-linecap="round" 
                              stroke-linejoin="round" 
                              stroke-width="2" 
                              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="mt-2">
                        <div class="flex items-center gap-6 text-sm text-gray-500">
                          <div class="flex items-center gap-2">
                            <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <span>{{ userInfo.address }}</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M12 7v5l3 3" />
                              </svg>
                            </div>
                            <span>{{ userInfo.age }}岁</span>
                          </div>
                        </div>
                        <div class="mt-3 text-sm text-gray-600 font-medium">{{ userInfo.signature }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-100 pt-4 mt-2">
                    <div class="text-sm text-gray-500">
                      上次登录时间：{{ userInfo.lastLogin }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 退出按钮 -->
            <button @click="handleLogout" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                   bg-white hover:bg-gray-100 rounded-md border border-gray-300 transition-colors duration-200">
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">欢迎使用用户中心</h2>
        <p class="text-gray-600">
          这是一个安全的账户管理系统，您可以在这里管理您的账户信息。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除了箭头相关的样式 */
</style> 