<template>
  <div class="space-size-analyze">
    <a-card title="空间图片大小分析">
      <v-chart :option="options" style="height: 320px; max-width: 100%" :loading="loading" />
    </a-card>
  </div>


</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'
import { AnalyzeSpaceAnalyzeSizeAPI, AnalyzeSpaceTagsAPI } from '@/service/AnalyzeController'

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
const dataList = ref<AnalyzeSpaceAnalyzeSizeResponse>({ data: [], })
const loading = ref(true)

/**
 * 加载数据
 */
const fetchData = async () => {
  loading.value = true
  try {
    const res = await AnalyzeSpaceAnalyzeSizeAPI({
      request:{
        queryAll: props.queryAll,
        queryPublic: props.queryPublic,
        spaceId: props.spaceId,
      }
    })
    if (res.code === 0) {
      dataList.value.data = res.data.data ?? []
    }
  }finally {
    loading.value = false
  }


}


const options = computed(() => {
  const pieData = dataList.value.data.map((item) => ({
    name: item.sizeRange,
    value: item.count,
  }))

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      top: 'bottom',
    },
    series: [
      {
        name: '图片大小',
        type: 'pie',
        radius: '50%',
        data: pieData,
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