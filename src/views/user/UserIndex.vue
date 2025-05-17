<template>
  <view>
    <div class="main">
      <el-container>
        <el-header>
          <IndexHead />
        </el-header>
        <el-container>
          <el-aside width="200px" v-if="user.user">
            <IndexAside/>
          </el-aside>
          <el-main style="background-color:#f7f8f9 ">
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </view>
</template>


<script setup lang="ts">

import IndexHead from '@/components/index/IndexHead.vue'
import IndexAside from '@/components/index/IndexAside.vue'
import { userStore } from '@/stores'

const user = userStore()

</script>


<style scoped lang="less">

.main {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: -100px;
  left: 0;
  width: 100%;
  height: 100%;
}

html, body, h3, p {
}

.el-header {
  padding: 0px;
}
</style>
