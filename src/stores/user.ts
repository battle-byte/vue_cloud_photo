import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserLoginVO } from '@/types/Admin'
// 管理员 token setToken removeToken
export const userStore = defineStore(
  'user',
  () => {
    //设置token
    const user = ref<UserLoginVO>()
    const setUser = (newToken: UserLoginVO) => {
      user.value = newToken
    }
    //移除token
    const removeUser = () => {
      user.value = {}
    }
    return { user, setUser, removeUser }
  },
  {
    persist: true
  }
)
