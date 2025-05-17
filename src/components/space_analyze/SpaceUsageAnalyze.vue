<template>
  <a-flex gap="middle">
    <a-card title="存储空间" style="width: 50%">
      <div style="height: 320px; text-align: center">
        <h3>{{ formatSize(data.usedSize) }} / {{ data.maxSize ? formatSize(data.maxSize) : '无限制' }}</h3>
        <a-progress type="dashboard" :percent="(100*data.sizeUsageRatio).toFixed(2) ?? 0" />
      </div>
    </a-card>
    <a-card title="图片数量" style="width: 50%">
      <div style="height: 320px; text-align: center">
        <h3>{{ data.usedCount }} / {{ data.maxCount ?? '无限制' }} </h3>
        <a-progress type="dashboard" :percent="data.countUsageRatio*100 ?? 0" />
      </div>
    </a-card>
  </a-flex>

</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { formatSize } from '@/types/picture'
import { AnalyzeSpaceUsageAPI } from '@/service/AnalyzeController'

interface Props {
  queryAll?: boolean
  queryPublic?: boolean
  spaceId?: string
}

const props = withDefaults(defineProps<Props>(), {
  queryAll: false,
  queryPublic: false,
  spaceId:"",
})
// 图表数据
const data = ref<AnalyzeSpaceUsageResponse>({
  countUsageRatio: 0,
  maxCount: 0,
  maxSize: 0,
  sizeUsageRatio: 0,
  usedCount: 0,
  usedSize: 0
})
const loading = ref(true)

/**
 * 加载数据
 */
const fetchData = async () => {
  loading.value = true
  const res = await AnalyzeSpaceUsageAPI({
    request:{
      queryAll: props.queryAll,
      queryPublic: props.queryPublic,
      spaceId: props.spaceId,
    }
  })
  if (res.code === 0 && res.data) {
    data.value = res.data
  } else {
  }
  loading.value = false
}

/**
 * 监听变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  fetchData()
})

</script>

<style scoped lang="less">

</style>