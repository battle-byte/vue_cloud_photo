<template>
  <div class="space-user-analyze">
    <a-card title="用户上传分析">
      <v-chart :option="options" style="height: 320px" />
      <template #extra>
        <a-space>
          <a-segmented v-model:value="timeDimension" :options="timeDimensionOptions" />
          <a-input-search v-if="user?.rid!=2" placeholder="请输入用户 id" enter-button="搜索用户" @search="doSearch" />
        </a-space>
      </template>
    </a-card>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'
import 'echarts-wordcloud'
import {
  AnalyzeSpaceAnalyzeUserAPI,
} from '@/service/AnalyzeController'
import { userStore } from '@/stores'

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
const dataList = ref<AnalyzeSpaceAnalyzeUserResponse>({ data: [], })
const loading = ref(true)

const user = userStore().user
const userId = ref<string>(user?.uid??"")
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
    const res = await AnalyzeSpaceAnalyzeUserAPI({
      request:{
        queryAll: props.queryAll,
        queryPublic: props.queryPublic,
        spaceId: props.spaceId,
      },
      timeDimension: timeDimension.value,
      userId: userId.value,
    })
    if (res.code === 0) {
      dataList.value.data= res.data.data ?? []
    }

  }finally {
    loading.value = false
  }

}

const doSearch = (value: string) => {
  userId.value = value
}


const options = computed(() => {
  const periods = dataList.value.data.map((item) => item.period) // 时间区间
  const counts = dataList.value.data.map((item) => item.count) // 上传数量

  return {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: periods, name: '时间区间' },
    yAxis: { type: 'value', name: '上传数量' },
    series: [
      {
        name: '上传数量',
        type: 'line',
        data: counts,
        smooth: true, // 平滑折线
        emphasis: {
          focus: 'series',
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