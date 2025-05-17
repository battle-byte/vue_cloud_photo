<template>
  <div id="mySpace">
    <p>正在跳转,请稍后...</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { userStore } from '@/stores'
import { SpaceUserFindByUserIdAPI } from '@/service/SpaceController'
import { onMounted } from 'vue'
import { SPACE_TYPE_ENUM } from '@/types/space'

const router = useRouter()
const loginUserStore  =userStore()
const checkUserSpace = async ()=>{
  if (!loginUserStore.user){ //用户未登录
    router.replace('/login')
    return;
  }
  // 用户已登录 获取该用户创建的空间
  const res = await SpaceUserFindByUserIdAPI({
    spaceType: SPACE_TYPE_ENUM.PRIVATE,
  })
  if (res.code === 0){ //获取成功
    const space =res.data.data
    if (!space.id||space.id==''){
      router.replace('/space_add')
    }else {
      router.replace(`/space_detail/${space.id}`)
    }
  }
}

onMounted(()=>{
  checkUserSpace()
})

</script>

<style scoped lang="less">

</style>