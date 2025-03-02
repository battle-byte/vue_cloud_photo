<template>
  <view>
    <div style="margin-bottom: 10px">
      <el-col>
        <text style="font-size: 20px">正在添加编辑人员成员的高校:{{ journalsMessage.jid }}</text>
        <div style="font-size: 20px">{{ journalsMessage.journalsName }}</div>
      </el-col>
    </div>
    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">高校ID</span>
      <el-input
        v-model="searchEditorial.jid"
        style="width: 240px"
        placeholder="请输入高校ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">编辑人员成员ID</span>
      <el-input
        v-model="searchEditorial.eid"
        style="width: 240px"
        placeholder="请输入编辑人员成员ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">编辑人员成员名称</span>
      <el-input
        v-model="searchEditorial.eName"
        style="width: 240px"
        placeholder="编辑人员成员名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchEditorialList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="eid" label="ID" width="180" />
        <el-table-column prop="eName" label="名称" width="180" />
        <el-table-column prop="ePhoto" label="照片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.ePhoto" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="sections" label="评价" width="400" />
        <el-table-column prop="comment" label="简介" width="300" />
        <el-table-column prop="rank" label="编辑人员成员状态" width="150">
          <template #default="scope">
            <span v-html="resultFormatEditorial(scope.row.rank)"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              @click="JournalsAddEditorial(scope.row, 1)"
              v-if="scope.row.rank !==1"
              >设为主编
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="JournalsAddEditorial(scope.row, 2)"
              v-if="scope.row.rank !== 2"
              >设为副编
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="JournalsAddEditorial(scope.row, 3)"
              v-if="scope.row.rank !== 3"
              >设为成员
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="JournalsRemoveEditorial(scope.row)"
              v-if="scope.row.rank === 1 || scope.row.rank === 2 || scope.row.rank === 3"
              >从该高校移除
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
          v-model:current-page="editorialPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//编辑人员的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageParams } from '@/types/Pages'

import { Calendar, Search } from '@element-plus/icons-vue'
import type { EditorialQueryByPageParam } from '@/types/Editorial'
import type { JournalsQueryVO } from '@/types/Journals'
import {
  JournalsAddEditorialAPI,
  JournalsRemoveEditorialAPI,
  SelectJournalsAndEditorialByPageAPI,
  SelectJournalsByIdAPI
} from '@/service/JournalsController'
import type {
  EditorialAndJournalsQueryParam,
  EditorialAndJournalsQueryVO
} from '@/types/Editorialandjournal'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//高校泛型
const journalsMessage = ref<JournalsQueryVO>({})
//获取高校基础内容

// 搜索高校内容
const getJournalsOne = async () => {
  let res = await SelectJournalsByIdAPI(props.id)
  if (res.code === 0) {
    journalsMessage.value = res.data
  }
}

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const editorialPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchEditorial = ref<EditorialAndJournalsQueryParam>({})

//表格数据
const tableData = ref<EditorialAndJournalsQueryVO[]>([])

//编辑人员成员状态数据格式化  0 不发布 1已发布
const resultFormatEditorial = (value: number) => {
  if (value == 3) {
    return `成员`
  } else if (value == 2) {
    return `副主编`
  } else if (value == 1) {
    return `主编`
  } else {
    return '不属于该高校'
  }
}

// 添加编辑人员成员
const JournalsAddEditorial = async (
  editorialQueryAndPeriodicalVO: EditorialAndJournalsQueryVO,
  rank: number
) => {
  const res = await JournalsAddEditorialAPI({
    eid: editorialQueryAndPeriodicalVO.eid,
    jid: journalsMessage.value.jid,
    rank: rank
  })
  if (res.code === 0) {
    //刷新编辑人员当页编辑人员信息
    getEditorialList(editorialPage.value.page, editorialPage.value.pageSize)
  }
}

// 移除编辑人员成员
const JournalsRemoveEditorial = async (
  editorialQueryAndPeriodicalVO: EditorialAndJournalsQueryVO
) => {
  const res = await JournalsRemoveEditorialAPI({
    eid: editorialQueryAndPeriodicalVO.eid,
    jid: journalsMessage.value.jid
  })
  if (res.code === 0) {
    //封禁成功刷新编辑人员当页编辑人员信息
    getEditorialList(editorialPage.value.page, editorialPage.value.pageSize)
  }
}

//获取编辑人员信息
const getEditorialList = async (page: number, pageSize: number) => {
  const res = await SelectJournalsAndEditorialByPageAPI({
    eid: searchEditorial.value.eid,
    jid: searchEditorial.value.jid,
    eName: searchEditorial.value.eName,
    currentJid: props.id,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新编辑人员成员数据')
  } else {
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getEditorialList(val, editorialPage.value.pageSize)
}

onMounted(async () => {
  await getJournalsOne()
  await getEditorialList(1, 15)
})

//模糊搜索
const searchEditorialList = () => {
  getEditorialList(editorialPage.value.page, editorialPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
