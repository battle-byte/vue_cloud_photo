<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">ID</span>
      <el-input
        v-model="searchUserAnswer.id"
        style="width: 240px"
        placeholder="请输入ID"
        :prefix-icon="Search"
        maxlength="20"
      />
      <span style="padding-top: 5px">结果名称</span>
      <el-input
        v-model="searchUserAnswer.resultName"
        style="width: 240px"
        placeholder="请输入结果名称"
        :prefix-icon="Search"
        maxlength="100"
      />
      <span style="padding-top: 5px">创建用户ID</span>
      <el-input
        v-model="searchUserAnswer.userId"
        style="width: 240px"
        placeholder="请输入创建用户ID"
        :prefix-icon="Search"
        maxlength="100"
      />
      <span style="padding-top: 5px">应用ID</span>
      <el-input
        v-model="searchUserAnswer.appId"
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
      <el-table-column prop="appId" label="应用ID" width="200px" />
      <el-table-column prop="userId" label="创建用户ID" width="200px" />
      <el-table-column prop="appType" label="应用类型">
        <template #default="scope">
          <span v-html="resultFormatType(scope.row.appType)"> </span>
        </template>
      </el-table-column>
      <el-table-column prop="scoringStrategy" label="评分策略">
        <template #default="scope">
          <span v-html="resultFormatScoringStrategy(scope.row.scoringStrategy)"> </span>
        </template>
      </el-table-column>
      <el-table-column prop="resultId" label="结果ID" width="200" />
      <el-table-column prop="resultName" label="结果名称" width="200" />
      <el-table-column prop="resultPicture" label="结果图片" width="200px">
        <template #default="scope">
          <el-image :src="scope.row.resultPicture" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="choices" label="选项结果" width="200" />
      <el-table-column prop="resultDesc" label="结果描述" width="200" />
      <el-table-column prop="resultScore" label="结果得分" width="200px" />
      <el-table-column prop="createTime" label="创建时间" width="200px" />
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
        v-model:current-page="userAnswerPage.page"
        @current-change="handlePage"
      />
    </div>
  </view>
</template>

<script setup lang="ts">
//分页下标
import { onMounted, ref } from 'vue'
import type { UserAnswerQueryDTO, UserAnswerVO } from '@/types/UserAnswer'
import type { PageParams } from '@/types/Pages'
import { Search } from '@element-plus/icons-vue'
import { deleteUserAnswerAPI, listUserAnswerByPageAPI } from '@/service/UserAnswerController'
import { ElMessage } from 'element-plus'

const pageCount = ref<number>(0)
//分页查询页数
const userAnswerPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

const resultFormatType = (value: number) => {
  if (value == 0) {
    return `得分类`
  } else if (value == 1) {
    return `测评类`
  } else {
    return `未知`
  }
}
const resultFormatScoringStrategy = (value: number) => {
  if (value == 0) {
    return `自定义`
  } else if (value == 1) {
    return `AI`
  } else {
    return `未知`
  }
}

//搜索
const searchUserAnswer = ref<UserAnswerQueryDTO>({})

//表格数据
const tableData = ref<UserAnswerVO[]>([])

//定义对用户操作 禁用和 编辑基本信息
//编辑信息
const handleDelete = async (userAnswerVO: UserAnswerVO) => {
  const res = await deleteUserAnswerAPI({
    id: userAnswerVO.id,
    isDelete: 1
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getUserAnswerMessageList(userAnswerPage.value.page, userAnswerPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}

//获取用户信息
const getUserAnswerMessageList = async (page: number, pageSize: number) => {
  const res = await listUserAnswerByPageAPI({
    id: searchUserAnswer.value.id,
    resultName: searchUserAnswer.value.resultName,
    userId: searchUserAnswer.value.userId,
    appId: searchUserAnswer.value.appId,
    page: page,
    pageSize: pageSize
  })
  //将后端的内容添加到集合内
  tableData.value = res.data.records
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getUserAnswerMessageList(val, userAnswerPage.value.pageSize)
}

onMounted(() => {
  getUserAnswerMessageList(1, 15)
})

//模糊搜索
const searchUserList = () => {
  getUserAnswerMessageList(userAnswerPage.value.page, userAnswerPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
