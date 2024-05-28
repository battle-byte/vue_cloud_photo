import { defineStore } from 'pinia'
import { ref } from 'vue'
import persist from 'pinia-plugin-persistedstate'
import type { adminMessage } from '@/types/Admin'
// 管理员 token setToken removeToken
export const adminStore = defineStore('admin', () => {
  //设置token
  const admin = ref<adminMessage>()
  const setAdmin = (newToken: adminMessage) => {
    admin.value = newToken
  }
  //移除token
  const removeAdmin = () => {
    admin.value = {}
  }
  return { admin, setAdmin, removeAdmin }
}, {
  persist: true
})