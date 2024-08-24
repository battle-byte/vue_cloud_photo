<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除文章"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除文章</span>
        <span>ID:{{ deleteArticleId.pid }}</span>
        <span>标题:{{ deleteArticleId.title }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">文章ID</span>
      <el-input
        v-model="searchArticle.pid"
        style="width: 240px"
        placeholder="请输入文章ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">文章标题</span>
      <el-input
        v-model="searchArticle.title"
        style="width: 240px"
        placeholder="文章标题"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">期刊ID</span>
      <el-input
        v-model="searchArticle.periodical"
        style="width: 240px"
        placeholder="期刊ID"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">文章审核状态</span>
      <el-select
        v-model="searchArticle.isPublish"
        placeholder="选择应用审核状态"
        style="width: 240px"
      >
        <el-option
          style="font-size: 18px"
          v-for="item in publishOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="searchArticleList">搜索</el-button>
    </div>

    <div class="manage">
      <!--      &lt;!&ndash;对话框 用于修改用户数据&ndash;&gt;-->
      <!--      <el-dialog-->
      <!--        v-model="dialogFormVisible"-->
      <!--        title="文章信息"-->
      <!--        width="500"-->
      <!--        :before-close="handleClose"-->
      <!--      >-->
      <!--        <el-form :model="userMessage">-->
      <!--          <el-form-item label="用户昵称">-->
      <!--            <el-input-->
      <!--              maxlength="10"-->
      <!--              v-model="userMessage.userName"-->
      <!--              placeholder="请输入姓名"-->
      <!--              autocomplete="off"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item label="用户简介">-->
      <!--            <el-input-->
      <!--              :maxlength="20"-->
      <!--              v-model="userMessage.userProfile"-->
      <!--              placeholder="请输入用户简介"-->
      <!--              autocomplete="off"-->
      <!--            />-->
      <!--          </el-form-item>-->
      <!--          <el-form-item v-model="userMessage.userAvatar">-->
      <!--            <img-->
      <!--              style="height: 400px; width: 450px"-->
      <!--              :src="userMessage.userAvatar"-->
      <!--              v-if="userMessage.userAvatar"-->
      <!--            />-->
      <!--            &lt;!&ndash;            <el-button v-else>用户尚未设置头像点击修改</el-button>&ndash;&gt;-->
      <!--            &lt;!&ndash;            <view v-else>用户尚未设置头像点击修改</view>&ndash;&gt;-->
      <!--          </el-form-item>-->
      <!--        </el-form>-->
      <!--        <template #footer>-->
      <!--          <div class="dialog-footer">-->
      <!--            <el-button @click="cancel">取消修改</el-button>-->
      <!--            <el-button @click="submit" type="primary">确定修改</el-button>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-dialog>-->

      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="pid" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="intro" label="简介" width="180" />
        <!--        <el-table-column prop="content" label="用户简介" />-->
        <el-table-column prop="author" label="作者" width="200" />
        <el-table-column prop="postAvatar" label="封面图" width="200">
          <template #default="scope">
            <el-image :src="scope.row.postAvatar" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="periodical" label="所属期刊id" width="150" />
        <el-table-column prop="periodicalName" label="所属期刊名称" width="150" />
        <!--        <el-table-column prop="doi" label="doi" width="150" />-->
        <el-table-column prop="publishTime" label="发布时间" width="150" />
        <el-table-column prop="updateTime" label="修改时间" width="150" />
        <el-table-column prop="views" label="阅读量" width="150" />
        <el-table-column prop="upload" label="下载量" width="150" />
        <el-table-column prop="kuote" label="引用量" width="150" />
        <el-table-column prop="model" label="收费模式" width="150" />
        <el-table-column prop="status" label="状态" width="150" />
        <el-table-column prop="isPublish" label="文章发布状态" width="150">
          <template #default="scope">
            <span v-html="resultFormatPublish(scope.row.isPublish)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="isPublish" label="文章品质状态" width="150">
          <template #default="scope">
            <span v-html="resultFormatPerfect(scope.row.perfect)"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" @click="handleBaseEdit(scope.row)">基础编辑</el-button>
            <el-button size="small" type="primary" @click="handleCommentEdit(scope.row)"
              >内容编辑
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="SetArticleNotPublish(scope.row)"
              v-if="scope.row.isPublish == 1"
              >下架文章
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="SetArticlePublish(scope.row)"
              v-if="scope.row.isPublish == 0"
              >发布文章
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="SetArticleNotPerfect(scope.row)"
              v-if="scope.row.perfect == 1"
              >普通文章
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="SetArticlePerfect(scope.row)"
              v-if="scope.row.perfect == 0"
              >精选文章
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
          v-model:current-page="articlePage.page"
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
import type {
  Article,
  ArticleContentDeleteParam,
  ArticleQueryAndPeriodicalVO,
  ArticleQueryByPageParam
} from '@/types/Article'
import {
  deleteArticleIdAPI,
  SelectArticleByPageAPI,
  SetArticleNotPerfectAPI,
  SetArticleNotPublishAPI,
  SetArticlePerfectAPI,
  SetArticlePublishAPI
} from '@/service/ArticleController'
import router from '@/router'

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const articlePage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchArticle = ref<ArticleQueryByPageParam>({})

//表格数据
const tableData = ref<ArticleQueryAndPeriodicalVO[]>([])

//文章状态数据格式化  0 不发布 1已发布
const resultFormatPublish = (value: number) => {
  if (value == 1) {
    return `已发布`
  } else if (value == 0) {
    return `未发布`
  } else {
    return '未知'
  }
}
// 文章状态品质状态
const resultFormatPerfect = (value: number) => {
  if (value == 1) {
    return `精品文章`
  } else if (value == 0) {
    return `普通文章`
  } else {
    return '未知'
  }
}

// 文章发布状态选择框
const publishOptions = [
  {
    value: '0',
    label: '未发布'
  },
  {
    value: '1',
    label: '已发布'
  },
  {
    value: '',
    label: '全部'
  }
]

// 基础编辑

// 基础内容编辑
const handleBaseEdit = (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  router.push({
    path: `/back/article/ArticleUpdate/${articleQueryAndPeriodicalVO.pid}`
  })
}
// 核心内容编辑
const handleCommentEdit = (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  router.push({
    path: `/back/article/MakePublishPage/${articleQueryAndPeriodicalVO.pid}`
  })
}

//发布文章
const SetArticleNotPublish = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.isPublish == 0) {
    ElMessage.error('文章已发布')
    return
  }
  const res = await SetArticleNotPublishAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    isPublish: 0
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

//发布文章
const SetArticlePublish = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.isPublish == 1) {
    ElMessage.error('文章已发布')
    return
  }
  const res = await SetArticlePublishAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    isPublish: 1
  })
  if (res.code === 0) {
    //解封成功刷新用户当页用户信息
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

//设为精品 SetArticlePerfect
const SetArticlePerfect = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.perfect == 1) {
    ElMessage.error('文章已经是精品了')
    return
  }
  const res = await SetArticlePerfectAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    perfect: 1
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

//取消精品 SetArticleNotPerfect
const SetArticleNotPerfect = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.perfect == 0) {
    ElMessage.error('文章已经是普通文章了')
    return
  }
  const res = await SetArticleNotPerfectAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    perfect: 0
  })
  if (res.code === 0) {
    //解封成功刷新用户当页用户信息
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

//获取用户信息
const getArticleList = async (page: number, pageSize: number) => {
  const res = await SelectArticleByPageAPI({
    pid: searchArticle.value.pid,
    title: searchArticle.value.title,
    isPublish: searchArticle.value.isPublish,
    periodical: searchArticle.value.periodical,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新文章数据')
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
let deleteArticleId = ref<ArticleContentDeleteParam>({
  pid: '',
  title: ''
})
// 删除
const handleDelete = (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  deleteArticleId.value.pid = articleQueryAndPeriodicalVO.pid!
  deleteArticleId.value.title = articleQueryAndPeriodicalVO.title!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteArticleIdAPI(deleteArticleId.value.pid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getArticleList(val, articlePage.value.pageSize)
}

onMounted(() => {
  getArticleList(1, 15)
})

//模糊搜索
const searchArticleList = () => {
  getArticleList(articlePage.value.page, articlePage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
