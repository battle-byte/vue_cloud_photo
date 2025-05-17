import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SysUserLoginResponse } from '@/types/Users'
// 管理员 token setToken removeToken
export const userStore = defineStore(
  'user',
  () => {
    //设置token
    const user = ref<SysUserLoginResponse>()
    const setUser = (newToken: SysUserLoginResponse) => {
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
