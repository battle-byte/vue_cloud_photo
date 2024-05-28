<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">用户ID</span>
      <el-input
        v-model="searchUser.id"
        style="width: 240px"
        placeholder="请输入用户ID"
        :suffix-icon="Search"
        :maxlength="20"
      />
      <span style="padding-top: 5px">用户昵称</span>
      <el-input
        v-model="searchUser.userName"
        style="width: 240px"
        placeholder="请输入用户昵称"
        :prefix-icon="Search"
        maxlength="10"
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
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="userName" label="用户名称" width="180" />
        <el-table-column prop="userAccount" label="用户账号" width="180" />
        <el-table-column prop="userProfile" label="用户简介" />
        <el-table-column prop="userAvatar" label="头像">
          <template #default="scope">
            <el-image :src="scope.row.userAvatar" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="userRole" label="用户状态">
          <template #default="scope">
            <span v-html="resultFormatRole(scope.row.userRole)"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleBan(scope.row)"
              v-if="scope.row.userRole == 0"
              >封禁
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleNotBan(scope.row)"
              v-if="scope.row.userRole == 1"
              >解禁
            </el-button>
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
// 控制对话框是否打开
const dialogFormVisible = ref(false)

//定义一个存储用户信息的中间变量
const userMessage = ref<updateUser>({})

//定义一个空的值用于清空中间值
const userMessageNotFull = ref<User>()

//分页下标
const pageCount = ref<number>(0)
//分页查询页数
const userPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})
//搜索
const searchUser = ref<SearchUser>({})

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
    getAdminMessageList(userPage.value.page, userPage.value.pageSize)
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
const tableData = ref<UserListVO[]>([])
//性别数据格式化
const resultFormatRole = (value: number) => {
  if (value == 0) {
    return `普通用户`
  } else if (value == 1) {
    return `已被封禁`
  } else {
    return `管理员`
  }
}

//定义对用户操作 禁用和 编辑基本信息
//编辑信息
const handleEdit = (User: UserList) => {
  dialogFormVisible.value = true
  userMessage.value.userProfile = User.userProfile
  userMessage.value.userName = User.userName
  userMessage.value.userAvatar = User.userAvatar
  userMessage.value.id = User.id
}
//封禁用户
const handleBan = async (User: UserList) => {
  if (User.userRole == 1) {
    ElMessage.error('该用户已被封禁')
    return
  }
  const res = await handleBanAPI(User.id!)
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getAdminMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}
//解禁用户
const handleNotBan = async (User: UserList) => {
  if (User.userRole == 0) {
    ElMessage.error('该用户未被封禁')
    return
  }
  const res = await handleNotBanAPI(User.id!)
  if (res.code === 0) {
    //解封成功刷新用户当页用户信息
    getAdminMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}
//获取用户信息
const getAdminMessageList = async (page: number, pageSize: number) => {
  const res = await getUserMessageSearchAPI({
    id: searchUser.value.id,
    userName: searchUser.value.userName,
    page: page,
    pageSize: pageSize
  })
  //将后端的内容添加到集合内
  tableData.value = res.data.records
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getAdminMessageList(val, userPage.value.pageSize)
}

onMounted(() => {
  getAdminMessageList(1, 20)
})

//模糊搜索
const searchUserList = () => {
  getAdminMessageList(userPage.value.page, userPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
