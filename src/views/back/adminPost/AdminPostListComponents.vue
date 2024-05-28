<template>
  <view>
    <!--对话框 用于查看用户文章数据-->
    <el-dialog v-model="dialogFormVisible2" title="活动信息" width="1200">
      <iframe src="C:\Users\WTS\Desktop\666.pdf" type="application/x-google-chrome-pdf" width="100%"
              height="100%"></iframe>
      <!--      <embed :src="urlOdf" type="application/pdf" width="100%" height="100%">-->
    </el-dialog>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">文章ID</span>
      <el-input
        v-model="searchPost.id"
        style="width: 200px"
        placeholder="请输入文章ID"
        :suffix-icon="Search"
        :maxlength="20"
      />
      <span style="padding-top: 5px">文章标题</span>
      <el-input
        v-model="searchPost.title"
        style="width: 300px"
        placeholder="请输入文章标题"
        :prefix-icon="Search"
        maxlength="60"
      />
      <span style="padding-top: 5px">作者名称</span>
      <el-input
        v-model="searchPost.author"
        style="width: 200px"
        placeholder="请输入作者名称"
        :prefix-icon="Search"
        maxlength="40"
      />
      <span style="padding-top: 5px">期刊ID</span>
      <el-input
        v-model="searchPost.periodical"
        style="width: 200px"
        placeholder="期刊ID"
        :prefix-icon="Search"
        maxlength="40"
      />
      <el-button type="primary" @click="searchPostList">搜索</el-button>
    </div>
    <div>
      <!--对话框 用于查看用户文章数据-->
      <el-dialog v-model="dialogFormVisible" title="文章信息" width="1200">
        <el-form :model="postMessage">
          <el-form-item label="标题">
            <p>{{ postMessage.title }}</p>
          </el-form-item>
          <el-form-item label="文章头像">
            <el-image :src="postMessage.postAvatar"
                      style="width: 400px;height: 400px"
                      fit="scale-down" />
          </el-form-item>
          <el-form-item v-model="postMessage.context">
            <MdViewer :value="postMessage.context"></MdViewer>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--prop要求必须和集合中的字段对应-->
      <el-table :data="tablePostData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="300" />
        <el-table-column prop="author" label="作者" width="100" />
        <el-table-column prop="periodical" label="期刊id" width="200" />
        <el-table-column prop="periodicalName" label="期刊名称" width="200" />
        <el-table-column prop="receiveTime" label="接收时间" width="180" />
        <el-table-column prop="hireTime" label="录用时间" width="180" />
        <el-table-column prop="publishTime" label="出版时间" width="180" />
        <el-table-column prop="view" label="阅读量" width="100" />
        <el-table-column prop="upload" label="下载量" width="100" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button size="small" @click="handleView(scope.row)">查看引言</el-button>
            <el-button type="info" size="small" @click="handleViewPost(scope.row)">查看文章</el-button>
            <el-button type="success" size="small" @click="handleEdit(scope.row)">编辑文章设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="example-pagination-block">
        <el-pagination
          background
          :page-size="15"
          layout="prev, pager, next"
          :total="pageCount"
          v-model:current-page="postPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">

//用户的基本信息
import { onMounted, ref } from 'vue'
import type { postList, postView, SearchPost } from '@/types/Post'
import { Search } from '@element-plus/icons-vue'
import type { PageParams } from '@/types/Pages'
import {
  getAdminPostMessageSearchAPI, ViewPostAPI
} from '@/service/PostController'
import { ElMessage, ElMessageBox } from 'element-plus'
import MdViewer from '@/components/MdViewer.vue'
import router from '@/router'

// 控制对话框是否打开
const dialogFormVisible = ref(false)
const dialogFormVisible2 = ref(false)

//查看用户文章内容
const postMessage = ref<postView>({})


//分页查询页数
const postPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})


//搜索内容选项
const searchPost = ref<SearchPost>({})

//分页下标
const pageCount = ref<number>(0)


const tablePostData = ref<postList[]>([
  {}
])


//定义对用户文章操作 禁用 解禁 查看基本 修改信息
const handleView = (post: postList) => { //查看文章
  dialogFormVisible.value = true
  postMessage.value.title = post.title
  postMessage.value.context = post.content
}
//编辑文章
const handleEdit = (post: postList) => {
  router.push({
    path: `/index/adminPostEdit/${post.id}`
  })
}
const urlOdf = ref<string>()
// 查看文章
const handleViewPost = async (post: postList) => {
  console.log(post.id)
  // dialogFormVisible2.value = true
  // const res = await ViewPostAPI(post.id!)
  // console.log(res.data)
  // urlOdf.value = res.data
  window.open('http://localhost:8101/api/admin/post/openNewPost/' + post.id)
}


// //表单关闭的时候清除基本的数据
// const handleClose = (done: () => void) => {
//   ElMessageBox.confirm('确定要关闭页面吗')
//     .then(() => {
//       //只要关闭表单，就刷新表单
//       postMessage.value = {}
//       done()
//     })
//     .catch(() => {
//       // catch error
//     })
// }


//获取用户信息
const getPostMessageList = async (page: number, pageSize: number) => {
  const res = await getAdminPostMessageSearchAPI({
    id: searchPost.value.id,
    title: searchPost.value.title,
    author: searchPost.value.author,
    periodical: searchPost.value.periodical,
    page: page,
    pageSize: pageSize
  })

  //将后端的内容添加到集合内
  tablePostData.value = res.data.records
  pageCount.value = res.data.total
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getPostMessageList(val, postPage.value.pageSize)
}
onMounted(() => {
  getPostMessageList(1, 20)
})

//获取文章列表信息 模糊搜索
const searchPostList = () => {
  getPostMessageList(postPage.value.page, postPage.value.page)
}

</script>

<style scoped lang="less"></style>
