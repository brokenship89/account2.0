<script setup>
import AccountInfo from './components/AccountInfo.vue'
import { ref } from 'vue'
import type { AccountInfo as AccountInfoType } from './types'

// 可配置项
const props = defineProps({
  title: {
    type: String,
    default: '账户管理'
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})

// 提供事件
const emit = defineEmits(['update:account', 'save'])

// 状态管理
const accountData = ref<AccountInfoType>({
  id: 0,
  username: '',
  email: ''
})
</script>

<template>
  <div class="account-module">
    <div v-if="showHeader" class="account-header">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    </div>
    
    <div class="account-content">
      <AccountInfo 
        v-model:account="accountData"
        @save="(data) => emit('save', data)"
      />
    </div>
  </div>
</template>

<style scoped>
.account-module {
  @apply w-full;
}

.account-header {
  @apply border-b pb-4 mb-6;
}

.account-content {
  @apply p-4;
}
</style> 