<template>
  <view>
    <div class="main">
      <RouterView />
    </div>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

.el-footer {
  padding: 0px;
}

.el-header {
  padding: 0px;
}
</style>
