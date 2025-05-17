<template>
  <view>
    <div class="main">
      <el-container>
        <el-aside width="auto">
          <AdminCommonAside />
        </el-aside>
        <el-container>
          <el-header>
            <AdminCommonHeader />
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
import AdminCommonHeader from '@/components/admin/AdmineCommonHeader.vue'
import AdminCommonAside from '@/components/admin/AdminCommonAside.vue'
</script>

<style scoped lang="less">
.main {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-footer {
  padding: 0;
}

.el-header {
  padding: 0px;
}
</style>
