<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { accountApi } from '@/api'

const router = useRouter()
const userInfo = ref({
  phone: '15116224937',
  gender: '♀',
  uid: '12345678',
  address: '浙江省杭州市',
  age: '21',
  signature: '世界是一个巨大的菜鸟驿站'
})

const handleSave = async () => {
  try {
    // 这里添加保存逻辑
    await Promise.all([
      accountApi.updateGender(userInfo.value.gender),
      // 其他更新接口...
    ])
    
    alert('保存成功')
    router.back()
  } catch (error) {
    alert('保存失败：' + error.message)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <button 
              @click="router.back()" 
              class="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 class="text-xl font-bold text-gray-900">编辑个人资料</h1>
          </div>
          <div class="flex items-center">
            <button
              @click="handleSave"
              class="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 
                     rounded-md transition-colors duration-200"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="space-y-6">
          <!-- 头像上传 -->
          <div class="flex items-center">
            <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button class="ml-5 text-primary hover:text-primary/80">更换头像</button>
          </div>

          <!-- 基本信息 -->
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">性别</label>
              <select v-model="userInfo.gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option value="♀">女</option>
                <option value="♂">男</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">地址</label>
              <input type="text" v-model="userInfo.address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">年龄</label>
              <input type="number" v-model="userInfo.age" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">个性签名</label>
              <textarea 
                v-model="userInfo.signature" 
                rows="3" 
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 