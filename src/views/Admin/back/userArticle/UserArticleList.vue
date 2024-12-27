<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除用户信息"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除用户提交的文章和信息</span>
        <span>ID:{{ deleteUserArticleId.uid }}</span>
        <span>标题:{{ deleteUserArticleId.title }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">用户ID</span>
      <el-input
        v-model="searchUserArticle.uid"
        style="width: 240px"
        placeholder="用户ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">用户文章标题</span>
      <el-input
        v-model="searchUserArticle.title"
        style="width: 240px"
        placeholder="用户文章标题"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">FirstName</span>
      <el-input
        v-model="searchUserArticle.firstName"
        style="width: 240px"
        placeholder="FirstName"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">LastName</span>
      <el-input
        v-model="searchUserArticle.lastName"
        style="width: 240px"
        placeholder="LastName"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchUserArticleList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="uid" label="ID" width="150" />
        <el-table-column prop="title" label="用户信息标题" width="200" />
        <el-table-column prop="firstName" label="FirstName" width="200" />
        <el-table-column prop="lastName" label="LastName" width="200" />
        <el-table-column prop="email" label="Email" width="200" />
        <el-table-column prop="title" label="用户文章标题" width="200" />
        <el-table-column prop="journal" label="要投递的期刊" width="200" />
        <el-table-column prop="file" label="用户文件" width="200">
          <template #default="scope">
            <el-link :href="scope.row.file" type="primary" target="_blank">下载</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="用户提交时间" width="200" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
          v-model:current-page="userArticlePage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageParams } from '@/types/Pages'
import { Calendar, Search } from '@element-plus/icons-vue'
import router from '@/router'
import type { DeleteUserArticle, UserArticleParam, UserArticleVO } from '@/types/UserArticle'
import { DeleteUserArticleIdAPI, SelectUserArticleByPageAPI } from '@/service/UserArticleController'

// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const userArticlePage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchUserArticle = ref<UserArticleParam>({})

//表格数据
const tableData = ref<UserArticleVO[]>([])

//获取用户信息
const getUserArticleList = async (page: number, pageSize: number) => {
  const res = await SelectUserArticleByPageAPI({
    uid: searchUserArticle.value.uid,
    title: searchUserArticle.value.title,
    firstName: searchUserArticle.value.firstName,
    lastName: searchUserArticle.value.lastName,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新用户信息数据')
  } else {
  }
}

// 控制对话框是否打开
const deleteDialogFormVisible = ref(false)

//取消提交表单
const cancel = () => {
  //只要关闭表单，就刷新表单
  deleteDialogFormVisible.value = false
}
//表单关闭的时候清除基本的数据
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭页面吗')
    .then(() => {
      //只要关闭表单，就刷新表单
      done()
    })
    .catch(() => {
      // catch error
    })
}
let deleteUserArticleId = ref<DeleteUserArticle>({
  uid: '',
  title: ''
})
// 删除
const handleDelete = (userArticleQueryAndPeriodicalVO: UserArticleVO) => {
  deleteUserArticleId.value.uid = userArticleQueryAndPeriodicalVO.uid!
  deleteUserArticleId.value.title = userArticleQueryAndPeriodicalVO.title!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await DeleteUserArticleIdAPI(deleteUserArticleId.value.uid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getUserArticleList(userArticlePage.value.page, userArticlePage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getUserArticleList(val, userArticlePage.value.pageSize)
}

onMounted(() => {
  getUserArticleList(1, 15)
})

//模糊搜索
const searchUserArticleList = () => {
  getUserArticleList(userArticlePage.value.page, userArticlePage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
