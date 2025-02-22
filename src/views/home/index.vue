<script setup>
import { useRouter } from 'vue-router'
import { accountApi } from '@/api'

const router = useRouter()

const handleLogout = async () => {
  try {
    const token = localStorage.getItem('token')
    console.log('退出登录时的 token：', token)
    
    await accountApi.logout()

    // 清除所有相关的存储数据
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('phone')
    
    // 可以考虑使用 localStorage.clear() 清除所有数据
    // localStorage.clear()

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
            <h1 class="text-xl font-bold text-gray-900">Account</h1>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-4 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                     bg-white hover:bg-gray-100 rounded-md border border-gray-300 
                     transition-colors duration-200"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">欢迎使用 Account 系统</h2>
        <p class="text-gray-600">
          这是一个安全的账户管理系统，您可以在这里管理您的账户信息。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style> 