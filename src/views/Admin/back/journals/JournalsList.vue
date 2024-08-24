<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除期刊"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除期刊</span>
        <span>ID:{{ deleteJournalsId.jid }}</span>
        <span>标题:{{ deleteJournalsId.journalsName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

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
      <span style="padding-top: 5px">期刊审核状态</span>
      <el-select
        v-model="searchJournals.isPublish"
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
      <el-button type="primary" @click="searchJournalsList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="jid" label="ID" width="180" />
        <el-table-column prop="journalsName" label="期刊名称" width="200" />
        <el-table-column prop="elssn" label="ELSSN" width="180" />
        <!--        <el-table-column prop="content" label="期刊简介" />-->
        <el-table-column prop="eic" label="EIC" width="200" />
        <el-table-column prop="journalsPhoto" label="封面图" width="200">
          <template #default="scope">
            <el-image :src="scope.row.journalsPhoto" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="frequency" label="Frequency" width="150" />
        <el-table-column prop="apc" label="APC" width="200" />
        <!--        <el-table-column prop="doi" label="doi" width="150" />-->
        <el-table-column prop="publishingModel" label="Publishing Model" width="200" />
        <el-table-column prop="peerReviewModel" label="Peer Review Model" width="200" />
        <el-table-column prop="indexArchiving" label="index Archiving" width="200" />
        <el-table-column prop="launched" label="Launched" width="150" />
        <el-table-column prop="count" label="期刊文章数量" width="150" />
        <el-table-column prop="createTime" label="创建时间" width="150" />
        <el-table-column prop="isPublish" label="期刊发布状态" width="150">
          <template #default="scope">
            <span v-html="resultFormatPublish(scope.row.isPublish)"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="600">
          <template #default="scope">
            <el-button size="small"  @click="handleEdit(scope.row)"
              >内容编辑
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="SetJournalsNotPublish(scope.row)"
              v-if="scope.row.isPublish == 1"
            >下架文章
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="SetJournalsPublish(scope.row)"
              v-if="scope.row.isPublish == 0"
            >发布文章
            </el-button>
            <el-button size="small" type="primary" @click="handleAddJournals(scope.row)"
              >添加文章
            </el-button>
            <el-button size="small" type="primary" @click="handleAddEditorial(scope.row)"
              >添加编辑
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
          v-model:current-page="JournalsPage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//期刊的基本信息
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
  deleteJournalsIdAPI,
  SelectJournalsByPageAPI,
  SetJournalsNotPublishAPI,
  SetJournalsPublishAPI
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

//期刊状态数据格式化  0 不发布 1已发布
const resultFormatPublish = (value: number) => {
  if (value == 1) {
    return `已发布`
  } else if (value == 0) {
    return `未发布`
  } else {
    return '未知'
  }
}

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

//发布文章
const SetJournalsNotPublish = async (journalsQueryVO: JournalsQueryVO) => {
  if (journalsQueryVO.isPublish == 0) {
    ElMessage.error('文章已发布')
    return
  }
  const res = await SetJournalsNotPublishAPI({
    jid: journalsQueryVO.jid,
    isPublish: 0
  })
  if (res.code === 0) {
    //封禁成功刷新期刊当页期刊信息
    getJournalsList(JournalsPage.value.page, JournalsPage.value.page)
  }
}

//发布文章
const SetJournalsPublish = async (journalsQueryVO: JournalsQueryVO) => {
  if (journalsQueryVO.isPublish == 1) {
    ElMessage.error('期刊已发布')
    return
  }
  const res = await SetJournalsPublishAPI({
    jid: journalsQueryVO.jid,
    isPublish: 1
  })
  if (res.code === 0) {
    //解封成功刷新期刊当页期刊信息
    getJournalsList(JournalsPage.value.page, JournalsPage.value.page)
  }
}

// 编辑内容
const handleEdit = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journals/JournalsEdit/${journalsQueryVO.jid}`
  })
}
// 添加文章
const handleAddJournals = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journals/JournalsArticle/${journalsQueryVO.jid}`
  })
}

// 添加文章
const handleAddEditorial = (journalsQueryVO: JournalsQueryVO) => {
  router.push({
    path: `/back/journals/JournalsAddEditorial/${journalsQueryVO.jid}`
  })
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
let deleteJournalsId = ref<JournalsDeleteShow>({
  jid: '',
  journalsName: ''
})

// 点击打开弹窗
const handleDelete = (journalsQueryVO: JournalsQueryVO) => {
  deleteJournalsId.value.jid = journalsQueryVO.jid!
  deleteJournalsId.value.journalsName = journalsQueryVO.journalsName!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteJournalsIdAPI(deleteJournalsId.value.jid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getJournalsList(JournalsPage.value.page, JournalsPage.value.page)
  }
}

//获取期刊信息
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
