<template>
  <div class="space-tag-analyze">
    <a-card title="图库标签词云">
      <v-chart :option="options" style="height: 320px; max-width: 100%;" :loading="loading" />
    </a-card>
  </div>

</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'
import {  AnalyzeSpaceTagsAPI } from '@/service/AnalyzeController'

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
const dataList = ref<AnalyzeSpaceTagsResponse>({ data: [], })
const loading = ref(true)

/**
 * 加载数据
 */
const fetchData = async () => {
  loading.value = true
  const res = await AnalyzeSpaceTagsAPI({
    request:{
      queryAll: props.queryAll,
      queryPublic: props.queryPublic,
      spaceId: props.spaceId,
    }
  })
  if (res.code === 0) {
    dataList.value.data = res.data.data ?? []
  } else {
  }
  loading.value = false
}

const options = computed(() => {
  const tagData = dataList.value.data.map((item) => ({
    name: item.tags,
    value: item.count,
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => `${params.name}: ${params.value} 次`,
    },
    series: [
      {
        type: 'wordCloud',
        gridSize: 10,
        sizeRange: [12, 50], // 字体大小范围
        rotationRange: [-90, 90],
        shape: 'circle',
        textStyle: {
          color: () =>
            `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
              Math.random() * 255,
            )}, ${Math.round(Math.random() * 255)})`, // 随机颜色
        },
        data: tagData,
      },
    ],
  }
})


/**
 * 监听变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  fetchData()
})

</script>

<style scoped lang="less">

</style>