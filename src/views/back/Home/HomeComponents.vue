<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">应用搜索</span>
      <el-input
        v-model="searchApp.appName"
        style="width: 240px"
        placeholder="请输入应用昵称"
        :prefix-icon="Search"
        maxlength="10"
      />
      <el-button type="primary" @click="searchappList">搜索</el-button>
    </div>

    <div class="manage" style="display: block">
      <div
        style="
          flex-wrap: wrap;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-left: 100px;
          padding-right: 200px;
        "
      >
        <view v-for="item in tableData" :key="item.id" @click="goToDetail(item.id)">
          <AppCard :app="item"></AppCard>
        </view>
      </div>
      <!--分页下标-->
      <div class="example-pagination-block">
        <el-pagination
          background
          :page-size="12"
          layout="prev, pager, next"
          :total="pageCount"
          v-model:current-page="appPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, ref } from 'vue'
import type { PageParams } from '@/types/Pages'
import { Calendar, Search } from '@element-plus/icons-vue'
import { listAppVOByPageAPI } from '@/service/AppController'
import type { AppQueryDTO, AppVO } from '@/types/App'
import AppCard from '@/components/AppCard.vue'
import router from '@/router'
// 控制对话框是否打开
//分页下标
const pageCount = ref<number>(0)
//分页查询页数
const appPage = ref<PageParams>({
  page: 1,
  pageSize: 12
})
//搜索
const searchApp = ref<AppQueryDTO>({})
//表格数据
const tableData = ref<AppVO[]>([])

const goToDetail = (id: string) => {
  router.push({
    path: `/index/appDetail/${id}`
  })
}

//获取用户信息
const getAppMessageList = async (page: number, pageSize: number) => {
  const res = await listAppVOByPageAPI({
    id: searchApp.value.id,
    appName: searchApp.value.appName,
    page: page,
    pageSize: pageSize
  })
  //将后端的内容添加到集合内
  tableData.value = res.data.records
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = () => {
  getAppMessageList(appPage.value.page, appPage.value.pageSize)
}

onMounted(() => {
  getAppMessageList(1, appPage.value.pageSize)
})
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
