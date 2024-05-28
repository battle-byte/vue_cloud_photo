import { defineStore } from 'pinia'
import { ref } from 'vue'
import persist from 'pinia-plugin-persistedstate'
import type { userMessage } from '@/types/Admin'
// 管理员 token setToken removeToken
export const userStore = defineStore('user', () => {
  //设置token
  const user = ref<userMessage>()
  const setUser = (newToken: userMessage) => {
    user.value = newToken
  }
  //移除token
  const removeUser = () => {
    user.value = {}
  }
  return { user, setUser, removeUser }
}, {
  persist: true
})