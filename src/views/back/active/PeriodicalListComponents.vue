<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">期刊ID</span>
      <el-input
        v-model="searchPeriodical.id"
        style="width: 200px"
        placeholder="请输入期刊ID"
        :suffix-icon="Search"
        :maxlength="20"
      />
      <span style="padding-top: 5px">期刊名称</span>
      <el-input
        v-model="searchPeriodical.periodicalName"
        style="width: 600px"
        placeholder="请输入期刊名称"
        :prefix-icon="Search"
        maxlength="60"
      />
      <el-button type="primary" @click="searchPeriodicalList">搜索</el-button>
    </div>
    <div>
      <!--对话框 用于查看用户文章数据-->
      <el-dialog v-model="dialogFormVisible" title="活动信息" width="1200">
        <el-form :model="periodicalMessage">
          <el-form-item label="活动标题">
            <p>{{ periodicalMessage.periodicalName }}</p>
          </el-form-item>
          <el-form-item label="活动封面图">
            <el-image :src='periodicalMessage.periodicalPhoto'
                      style="width: 400px;height: 400px" />
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--prop要求必须和集合中的字段对应-->
      <el-table :data="tablePeriodicalData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="periodicalName" label="期刊名称" width="180" />
        <el-table-column prop="elSSN" label="ElSSN" width="200" />
        <el-table-column prop="eic" label="EiC" width="180" />
        <el-table-column prop="apc" label="APC" width="180" />
        <el-table-column prop="publishingModel" label="Publishing Model" width="180" />
        <el-table-column prop="peerReviewModel" label="Peer Review Model" width="180" />
        <el-table-column prop="indexArchiving" label="Index & Archiving" width="180" />
        <el-table-column prop="publishTime" label="发布时间" width="180" />
        <!--        <el-table-column prop="view" label="参与人数" width="100" />-->
        <!--        <el-table-column prop="isDelete" label="活动状态" width="100">-->
        <!--          <template #default="scope">-->
        <!--            <span v-html="resultFormatStatus(scope.row.isDelete)">-->
        <!--            </span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="操作" width="250" style="display: flex">
          <template #default="scope">
            <!--            <el-button size="small" @click="handleView(scope.row)">查看封面</el-button>-->
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">重新编辑期刊</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="example-pagination-block">
        <el-pagination
          background
          :page-size="15"
          layout="prev, pager, next"
          :total="pageCount"
          v-model:current-page="periodicalPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">

//用户的基本信息
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { PageParams } from '@/types/Pages'
import router from '@/router'
import { selectPeriodicalListAPI } from '@/service/PeriodicalController'
import type { periodical } from '@/types/Periodical'

// 控制对话框是否打开
const dialogFormVisible = ref(false)

//查看用户文章内容
const periodicalMessage = ref<periodical>({})


//分页查询页数
const periodicalPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})


//搜索内容选项
const searchPeriodical = ref<periodical>({})

//分页下标
const pageCount = ref<number>(0)


const tablePeriodicalData = ref<periodical[]>([{}])


//编辑文章
const handleEdit = (active: periodical) => {
  router.push({
    path: `/index/periodicalEdit/${active.id}`
  })
}


//获取活动信息
const getActiveMessageList = async (page: number, pageSize: number) => {
  const res = await selectPeriodicalListAPI({
    id: searchPeriodical.value.id,
    periodicalName: searchPeriodical.value.periodicalName,
    page: page,
    pageSize: pageSize
  })
  console.log(res.data)
  //将后端的内容添加到集合内
  tablePeriodicalData.value = res.data.records
  console.log(tablePeriodicalData)
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getActiveMessageList(val, periodicalPage.value.pageSize)
}

//点击搜索按钮
const searchPeriodicalList = () => {
  getActiveMessageList(periodicalPage.value.page, periodicalPage.value.pageSize)
}

onMounted(() => {
  getActiveMessageList(1, 20)
})


</script>

<style scoped lang="less"></style>
