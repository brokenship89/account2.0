<script setup>
import { computed } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  fields: {
    type: Array,
    default: () => ['username', 'email']
  }
})

const emit = defineEmits(['update:account', 'save'])

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '用户名不能为空' }
  ],
  email: [
    { required: true, message: '邮箱不能为空' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ]
}

// 处理保存
const handleSave = () => {
  emit('save', props.account)
}
</script>

<template>
  <div class="account-info max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <form @submit.prevent="handleSave">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6">账户信息</h2>
      
      <div v-for="field in fields" :key="field" class="mb-6">
        <label 
          :for="field" 
          class="block mb-2 text-sm font-medium text-gray-700 capitalize"
        >
          {{ field === 'username' ? '用户名' : '邮箱' }}
        </label>
        <input
          :id="field"
          v-model="account[field]"
          :readonly="readonly"
          :class="[
            'w-full px-4 py-2.5 bg-white border rounded-lg text-sm transition-all duration-200',
            readonly 
              ? 'bg-gray-50 cursor-not-allowed border-gray-200 text-gray-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-400'
          ]"
        />
      </div>
      
      <div v-if="!readonly" class="mt-8">
        <button 
          type="submit" 
          class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
                 transition-colors duration-200 ease-in-out shadow-sm"
        >
          保存更改
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* 移除之前的样式，直接使用 Tailwind 类名 */
</style> 