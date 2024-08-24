<template>
  <view>
    <div style="margin-bottom: 10px">
      <el-col>
        <text style="font-size: 20px">正在添加文章的期刊:{{ journalsMessage.jid }}</text>
        <div style="font-size: 20px" >{{ journalsMessage.journalsName }}</div>
      </el-col>
    </div>
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
      <span style="padding-top: 5px">文章所属期刊状态</span>
      <el-select
        v-model="searchArticle.periodical"
        placeholder="筛选是否属于该期刊的文章"
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
        <!--        <el-table-column prop="doi" label="doi" width="150" />-->
        <el-table-column prop="publishTime" label="发布时间" width="200" />
        <el-table-column prop="periodical" label="所属期刊id" width="150" />
        <el-table-column prop="periodicalName" label="所属期刊名称" width="150" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="JournalsAddArticle(scope.row)"
              v-if="scope.row.periodical !== journalsMessage.jid"
              >加入该期刊
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="JournalsRemoveArticle(scope.row)"
              v-if="scope.row.periodical === journalsMessage.jid"
              >移除该文章
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
import type { ArticleQueryAndPeriodicalVO, ArticleQueryByPageParam } from '@/types/Article'
import {
  deleteArticleIdAPI,
  SelectArticleByPageAPI,
  SetArticleNotPerfectAPI,
  SetArticleNotPublishAPI,
  SetArticlePerfectAPI,
  SetArticlePublishAPI
} from '@/service/ArticleController'
import router from '@/router'
import {
  JournalsAddArticleAPI,
  JournalsRemoveArticleAPI,
  SelectJournalsByIdAPI
} from '@/service/JournalsController'
import type { JournalsQueryVO } from '@/types/Journals'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//期刊泛型
const journalsMessage = ref<JournalsQueryVO>({})
//获取期刊基础内容

// 搜索期刊内容
const getJournalsOne = async () => {
  let res = await SelectJournalsByIdAPI(props.id)
  if (res.code === 0) {
    journalsMessage.value = res.data
  }
}

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
    value: props.id,
    label: '本期刊'
  },
  {
    value: '',
    label: '全部'
  }
]

// 添加文章
const JournalsAddArticle = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.periodical === journalsMessage.value.jid) {
    ElMessage.error('文章已添加到本期刊')
    return
  }
  console.log("periodical",articleQueryAndPeriodicalVO.periodical)
  console.log("journalsMessage.value.jid",journalsMessage.value.jid)
  const res = await JournalsAddArticleAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    jid: journalsMessage.value.jid
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getArticleList(articlePage.value.page, articlePage.value.pageSize)
  }
}

// 移除文章
const JournalsRemoveArticle = async (articleQueryAndPeriodicalVO: ArticleQueryAndPeriodicalVO) => {
  if (articleQueryAndPeriodicalVO.periodical !== journalsMessage.value.jid) {
    ElMessage.error('文章不在本期刊内')
    return
  }
  const res = await JournalsRemoveArticleAPI({
    pid: articleQueryAndPeriodicalVO.pid,
    jid: journalsMessage.value.jid
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
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

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getArticleList(val, articlePage.value.pageSize)
}

onMounted(async () => {
  await getJournalsOne()
  await getArticleList(1, 15)
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
