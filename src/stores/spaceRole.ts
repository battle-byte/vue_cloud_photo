import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SysUserLoginResponse } from '@/types/Users'
// 管理员 token setToken removeToken
export const spaceRoleStore = defineStore(
  'spaceRole',
  () => {
    //设置权限
    const spaceRole = ref<string>("")
    const setSpaceRole = (role: string) => {
      spaceRole.value = role
    }
    //移除token
    const removeSpaceRole = () => {
      spaceRole.value = ""
    }
    return { spaceRole, setSpaceRole, removeSpaceRole }
  },
  {
    persist: true
  }
)
