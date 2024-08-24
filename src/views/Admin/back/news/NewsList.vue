<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除新闻"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除新闻</span>
        <span>ID:{{ deleteNewsId.nid }}</span>
        <span>标题:{{ deleteNewsId.title }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">新闻ID</span>
      <el-input
        v-model="searchNews.nid"
        style="width: 240px"
        placeholder="请输入新闻ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">新闻标题</span>
      <el-input
        v-model="searchNews.title"
        style="width: 240px"
        placeholder="新闻名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchNewsList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="nid" label="ID" width="200" />
        <el-table-column prop="title" label="新闻标题" width="300" />
        <el-table-column prop="photo" label="封面图" width="200">
          <template #default="scope">
            <el-image :src="scope.row.photo" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" width="150" />
        <el-table-column prop="nTime" label="新闻发布时间" width="200" />
        <el-table-column prop="comment" label="评价" width="400" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small"  @click="handleNewsBaseEdit(scope.row)"
              >基础编辑
            </el-button>
            <el-button size="small" type="primary" @click="handleNewsContentEdit(scope.row)"
              >内容编辑
            </el-button>
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
          v-model:current-page="newsPage.page"
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
import type { NewsDeleteShow, NewsQueryByPageParam, NewsQueryVO } from '@/types/News'
import { deleteNewsIdAPI, SelectNewsByPageAPI } from '@/service/NewsController'

// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const newsPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchNews = ref<NewsQueryByPageParam>({})

//表格数据
const tableData = ref<NewsQueryVO[]>([])

// 基础内容编辑
const handleNewsBaseEdit = (newsQueryAndPeriodicalVO: NewsQueryVO) => {
  router.push({
    path: `/back/news/NewsUpdate/${newsQueryAndPeriodicalVO.nid}`
  })
}

// 核心内容编辑 handleNewsContentEdit
const handleNewsContentEdit = (newsQueryAndPeriodicalVO: NewsQueryVO) => {
  router.push({
    path: `/back/news/MakeNewsPage/${newsQueryAndPeriodicalVO.nid}`
  })
}

//获取用户信息
const getNewsList = async (page: number, pageSize: number) => {
  const res = await SelectNewsByPageAPI({
    nid: searchNews.value.nid,
    title: searchNews.value.title,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新新闻数据')
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
let deleteNewsId = ref<NewsDeleteShow>({
  nid: '',
  title: ''
})
// 删除
const handleDelete = (newsQueryAndPeriodicalVO: NewsQueryVO) => {
  deleteNewsId.value.nid = newsQueryAndPeriodicalVO.nid!
  deleteNewsId.value.title = newsQueryAndPeriodicalVO.title!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteNewsIdAPI(deleteNewsId.value.nid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getNewsList(newsPage.value.page, newsPage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getNewsList(val, newsPage.value.pageSize)
}

onMounted(() => {
  getNewsList(1, 15)
})

//模糊搜索
const searchNewsList = () => {
  getNewsList(newsPage.value.page, newsPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
