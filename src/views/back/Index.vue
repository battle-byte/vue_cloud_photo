<template>
  <view>
    <div class="main">
      <el-container>
        <el-aside width="auto">
          <CommonAside />
        </el-aside>
        <el-container>
          <el-header>
            <CommonHeader />
          </el-header>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </view>
</template>

<script setup lang="ts">
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
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

html,
body,
h3,
p {
}

.el-header {
  padding: 0px;
}
</style>
