<template>
  <div class="space-rank-analyze">
    <a-card title="空间使用排行">
      <v-chart :option="options" style="height: 320px" />
    </a-card>
  </div>

</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'
import {
  AnalyzeSpaceAnalyzeSizeAPI,
  AnalyzeSpaceAnalyzeUserAPI, AnalyzeSpaceRankAnalyzeAPI,
  AnalyzeSpaceTagsAPI
} from '@/service/AnalyzeController'

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
const datalist = ref<AnalyzeSpaceRankAnalyzeResponse>({
  data:[]
})
const loading = ref(true)
const userId = ref<string>("")
const timeDimension = ref<string>('day')
const timeDimensionOptions = [
  {
    label: '日',
    value: 'day',
  },
  {
    label: '周',
    value: 'week',
  },
  {
    label: '月',
    value: 'month',
  },
]

/**
 * 加载数据
 */
const fetchData = async () => {
  loading.value = true
  try {
    const res = await AnalyzeSpaceRankAnalyzeAPI({
      top: 10,
    })
    if (res.code === 0) {
      datalist.value.data = res.data.data ?? []
    }
  }finally {
    loading.value = false
  }


}


const doSearch = (value: string) => {
  userId.value = value
}


const options = computed(() => {
  const spaceNames = datalist.value.data.map((item) => item.spaceName)
  const usageData = datalist.value.data.map((item) => (item.totalSize / (1024 * 1024)).toFixed(2)) // 转为 MB

  return {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: spaceNames,
    },
    yAxis: {
      type: 'value',
      name: '空间使用量 (MB)',
    },
    series: [
      {
        name: '空间使用量 (MB)',
        type: 'bar',
        data: usageData,
        itemStyle: {
          color: '#5470C6', // 自定义柱状图颜色
        },
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