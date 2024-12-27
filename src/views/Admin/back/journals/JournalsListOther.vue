<template>
  <view>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">期刊ID</span>
      <el-input
        v-model="searchJournals.jid"
        style="width: 240px"
        placeholder="请输入期刊ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">期刊标题</span>
      <el-input
        v-model="searchJournals.journalsName"
        style="width: 240px"
        placeholder="期刊标题"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchJournalsList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="jid" label="ID" width="180" />
        <el-table-column prop="journalsName" label="期刊名称" width="200" />
        <el-table-column label="About" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="GoAbout(scope.row)"
              >Edit About
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="Special Issue" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="GoAboutSpecialIssue(scope.row)"
              >Edit Special Issue
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="For Authors" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="GoAboutForAuthors(scope.row)"
              >Edit For Authors
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="For Reviewers" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="GoAboutForReviewers(scope.row)"
              >Edit For Reviewers
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="Focus" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="GOFocus(scope.row)"
              >Edit Focus
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
          v-model:current-page="JournalsPage.page"
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
  JournalsDeleteShow,
  JournalsQueryByPageParam,
  JournalsQueryVO
} from '@/types/Journals'
import {
  SelectJournalsByPageAPI,
} from '@/service/JournalsController'
import router from '@/router'


//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const JournalsPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchJournals = ref<JournalsQueryByPageParam>({})

//表格数据
const tableData = ref<JournalsQueryVO[]>([])


// 期刊发布状态选择框
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

// 跳转 About
const GoAbout = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journalsOther/JournalsAboutList/${journalsQueryVO.jid}`
  })
}

// 跳转 GoAboutSpecialIssue
const GoAboutSpecialIssue = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journalsOther/JournalsSpecialIssueList/${journalsQueryVO.jid}`
  })
}

// 跳转 GoAboutForAuthors
const GoAboutForAuthors = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journalsOther/JournalsForAuthorsList/${journalsQueryVO.jid}`
  })
}


// 跳转 GoAboutForReviewers
const GoAboutForReviewers = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journalsOther/JournalsForReviewersList/${journalsQueryVO.jid}`
  })
}


// 跳转 GOFocus
const GOFocus = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journalsOther/JournalsFocusList/${journalsQueryVO.jid}`
  })
}



//获取用户信息
const getJournalsList = async (page: number, pageSize: number) => {
  const res = await SelectJournalsByPageAPI({
    jid: searchJournals.value.jid,
    journalsName: searchJournals.value.journalsName,
    isPublish: searchJournals.value.isPublish,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新期刊数据')
  } else {
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getJournalsList(val, JournalsPage.value.pageSize)
}

onMounted(() => {
  getJournalsList(1, 15)
})

//模糊搜索
const searchJournalsList = () => {
  getJournalsList(JournalsPage.value.page, JournalsPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
