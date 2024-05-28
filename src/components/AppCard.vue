<template>
  <el-row style="padding-bottom: 20px">
    <el-card :body-style="{ padding: '15px' }" style="height: 360px; width: 300px">
      <img style="width: 100%; height: 200px" :src="props.app.appIcon" class="image" />
      <div style="padding: 10px">
        <text style="font-size: 22px"> {{ props.app.appName }}</text>
        <div class="bottom">
          <time class="time">{{ props.app.createTime }}</time>
          <el-image style="border-radius: 50%;width: 50px" :src="props.app.user?.userAvatar"></el-image>
          <span style="font-size: 22px"> {{ props.app.user.userName }}</span>
        </div>
      </div>
    </el-card>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps } from 'vue'
import type { AppVO } from '@/types/App'

const currentDate = ref(new Date())

interface Props {
  app: AppVO
}

const props = withDefaults(defineProps<Props>(), {
  app: () => {}
})
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
