import { defineStore } from 'pinia'
import { ref } from 'vue'
import persist from 'pinia-plugin-persistedstate'
// 控制主页面的左侧导航栏伸缩
export const tabClick = defineStore('tab-click', () => {
  //设置token
  const tab = ref(false)
  const setTab= (newCliek: boolean) => {
    tab.value = newCliek
  }
  //移除token
  const removeTab = () => {
    tab.value = false
  }
  return { tab, setTab, removeTab }
}, {
  persist: true
})