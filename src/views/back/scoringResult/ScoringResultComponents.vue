<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">ID</span>
      <el-input
        v-model="searchScoringResult.id"
        style="width: 240px"
        placeholder="请输入ID"
        :prefix-icon="Search"
        maxlength="20"
      />
      <span style="padding-top: 5px">结果名称</span>
      <el-input
        v-model="searchScoringResult.resultName"
        style="width: 240px"
        placeholder="请输入结果名称"
        :prefix-icon="Search"
        maxlength="100"
      />
      <span style="padding-top: 5px">创建用户ID</span>
      <el-input
        v-model="searchScoringResult.userId"
        style="width: 240px"
        placeholder="请输入创建用户ID"
        :prefix-icon="Search"
        maxlength="100"
      />
      <span style="padding-top: 5px">应用ID</span>
      <el-input
        v-model="searchScoringResult.appId"
        style="width: 240px"
        placeholder="请输入应用ID"
        :prefix-icon="Search"
        maxlength="20"
      />
      <el-button type="primary" @click="searchUserList">搜索</el-button>
    </div>

    <!--表格-->
    <!--prop要求必须和集合中的字段对应-->
    <el-table height="90%" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="200" />
      <el-table-column prop="resultName" label="结果名称" width="200" />
      <el-table-column prop="resultDesc" label="结果描述" width="200" />
      <el-table-column prop="resultPicture" label="结果图片" width="200px">
        <template #default="scope">
          <el-image :src="scope.row.resultPicture" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="resultProp" label="结果属性集合" width="200" />
      <el-table-column prop="resultScoreRange" label="结果得分范围" width="200px" />
      <el-table-column prop="appId" label="应用ID" width="200px" />
      <el-table-column prop="userId" label="创建用户ID" width="200px" />
      <el-table-column prop="createTime" label="创建时间" width="200px" />
      <el-table-column prop="updateTime" label="更新时间" width="200px" />
      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页下标-->
    <div class="example-pagination-block">
      <el-pagination
        background
        :page-size="15"
        layout="prev, pager, next"
        :total="pageCount"
        v-model:current-page="scoringResultPage.page"
        @current-change="handlePage"
      />
    </div>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageParams } from '@/types/Pages'
import { Search } from '@element-plus/icons-vue'
import type { ScoringResultQueryDTO, ScoringResultVO } from '@/types/ScoringResult'
import {
  deleteScoringResultAPI,
  listScoringResultByPageAPI
} from '@/service/ScroingResultController'


//分页下标
const pageCount = ref<number>(0)
//分页查询页数
const scoringResultPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})
//搜索
const searchScoringResult = ref<ScoringResultQueryDTO>({})

//表格数据
const tableData = ref<ScoringResultVO[]>([])

//定义对用户操作 禁用和 编辑基本信息
//编辑信息
const handleDelete = async (scoringResultVO: ScoringResultVO) => {
  const res = await deleteScoringResultAPI({
    id: scoringResultVO.id,
    isDelete: 1
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}


//获取用户信息
const getScoringResultMessageList = async (page: number, pageSize: number) => {
  const res = await listScoringResultByPageAPI({
    id: searchScoringResult.value.id,
    resultName: searchScoringResult.value.resultName,
    userId: searchScoringResult.value.userId,
    appId: searchScoringResult.value.appId,
    page: page,
    pageSize: pageSize
  })
  //将后端的内容添加到集合内
  tableData.value = res.data.records
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getScoringResultMessageList(val, scoringResultPage.value.pageSize)
}

onMounted(() => {
  getScoringResultMessageList(1, 15)
})

//模糊搜索
const searchUserList = () => {
  getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
