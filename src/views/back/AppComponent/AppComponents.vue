<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">快速搜索你想要的内容</span>
      <el-input
        v-model="searchApp.appDesc"
        style="width: 240px"
        placeholder="请输入你想要的内容"
        :prefix-icon="Search"
        maxlength="100"
      />
      <el-button type="primary" @click="searchUserList">搜索</el-button>
    </div>

    <div class="manage">
      <!--对话框 用于修改用户数据-->
      <el-dialog
        v-model="dialogFormVisible"
        title="用户信息"
        width="500"
        :before-close="handleClose"
      >
        <el-form :model="userMessage">
          <el-form-item label="用户昵称">
            <el-input
              maxlength="10"
              v-model="userMessage.userName"
              placeholder="请输入姓名"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="用户简介">
            <el-input
              :maxlength="20"
              v-model="userMessage.userProfile"
              placeholder="请输入用户简介"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item v-model="userMessage.userAvatar">
            <img
              style="height: 400px; width: 450px"
              :src="userMessage.userAvatar"
              v-if="userMessage.userAvatar"
            />
            <!--            <el-button v-else>用户尚未设置头像点击修改</el-button>-->
            <!--            <view v-else>用户尚未设置头像点击修改</view>-->
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="cancel">取消修改</el-button>
            <el-button @click="submit" type="primary">确定修改</el-button>
          </div>
        </template>
      </el-dialog>

      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="200" />
        <el-table-column prop="appName" label="应用名称" width="200" />
        <el-table-column prop="appDesc" label="应用描述" width="200" />
        <el-table-column prop="appIcon" label="应用图标" width="200px">
          <template #default="scope">
            <el-image :src="scope.row.appIcon" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
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
        <el-table-column prop="reviewStatus" label="审核状态">
          <template #default="scope">
            <span v-html="resultFormatReviewStatus(scope.row.reviewStatus)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="reviewMessage" label="审核信息" width="200px" />
        <el-table-column prop="reviewerId" label="审核人ID" width="200px" />
        <el-table-column prop="userId" label="创建用户ID" width="200px" />
        <el-table-column prop="reviewTime" label="修改时间" width="200px" />
        <el-table-column prop="createTime" label="创建时间" width="200px" />
        <el-table-column prop="updateTime" label="更新时间" width="200px" />
        <el-table-column label="操作" width="200px">
          <template #default="scope">
            <el-button
              size="small"
              type="success"
              @click="handleNotBan(scope.row)"
              v-if="scope.row.reviewStatus == 0 || scope.row.reviewStatus == 2"
              >通过
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="handleBan(scope.row)"
              v-if="scope.row.reviewStatus == 0 || scope.row.reviewStatus == 1"
              >拒绝
            </el-button>
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
          v-model:current-page="userPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, ref } from 'vue'
import type { SearchUser, updateUser, User, UserList } from '@/types/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageParams } from '@/types/Pages'
import {
  getUserMessageSearchAPI,
  handleBanAPI,
  handleEditAPI,
  handleNotBanAPI
} from '@/service/AdminController'
import { Calendar, Search } from '@element-plus/icons-vue'
import type { UserListVO, UserVO } from '@/types/Admin'
import { deleteAppAPI, doAppReviewAPI, listAppByPageAPI } from '@/service/AppController'
import type { AppQueryDTO, AppVO } from '@/types/App'
import App from '@/App.vue'
// 控制对话框是否打开
const dialogFormVisible = ref(false)

//定义一个存储用户信息的中间变量
const userMessage = ref<updateUser>({})

//分页下标
const pageCount = ref<number>(0)
//分页查询页数
const userPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})
//搜索
const searchApp = ref<AppQueryDTO>({})

//确认提交表单
const submit = async () => {
  dialogFormVisible.value = false
  const res = await handleEditAPI({
    id: userMessage.value.id,
    userName: userMessage.value.userName,
    userProfile: userMessage.value.userProfile
  })
  if (res.code == 0) {
    ElMessage.success('修改成功')
    getAppMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}

//取消提交表单
const cancel = () => {
  //只要关闭表单，就刷新表单
  userMessage.value = {}
  dialogFormVisible.value = false
}
//表单关闭的时候清除基本的数据
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭页面吗')
    .then(() => {
      //只要关闭表单，就刷新表单
      userMessage.value = {}
      done()
    })
    .catch(() => {
      // catch error
    })
}
//表格数据
const tableData = ref<AppVO[]>([])

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
const resultFormatReviewStatus = (value: number) => {
  if (value == 0) {
    return `待审核`
  } else if (value == 1) {
    return `已通过`
  } else {
    return `拒绝`
  }
}

//定义对用户操作 禁用和 编辑基本信息
//编辑信息
const handleDelete = async (app: AppVO) => {
  const res = await deleteAppAPI({
    id: app.id,
    isDelete: 1
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getAppMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}
//拒绝应用
const handleBan = async (App: AppVO) => {
  const res = await doAppReviewAPI({
    id: App.id,
    reviewStatus: 2,
    reviewMessage: '不符合条件'
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getAppMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}
//通过应用
const handleNotBan = async (App: AppVO) => {
  const res = await doAppReviewAPI({
    id: App.id,
    reviewStatus: 1,
    reviewMessage: '符合条件'
  })
  if (res.code === 0) {
    //解封成功刷新用户当页用户信息
    getAppMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}
//获取用户信息
const getAppMessageList = async (page: number, pageSize: number) => {
  const res = await listAppByPageAPI({
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
const handlePage = (val: number) => {
  getAppMessageList(val, userPage.value.pageSize)
}

onMounted(() => {
  getAppMessageList(1, 20)
})

//模糊搜索
const searchUserList = () => {
  getAppMessageList(userPage.value.page, userPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
