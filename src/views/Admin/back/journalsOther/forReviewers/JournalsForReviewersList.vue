<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除高校"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除ForReviewers下的导航栏</span>
        <span>ID:{{ deleteJournalsId.aid }}</span>
        <span>标题:{{ deleteJournalsId.name }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">正在编辑的高校{{ props.id }}的导航栏</span>
      <span style="padding-top: 5px">正在编辑的高校名称:{{ journalsMessage.journalsName }}</span>

      <el-button type="primary" @click="createForReviewers">创建新的ForReviewers栏</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="aid" label="ID" width="180" />
        <el-table-column prop="name" label="ForReviewers栏名称" width="400" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="EditForReviewers(scope.row)">编辑</el-button>
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
          v-model:current-page="ForReviewersPage.page"
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

import { DeleteForReviewersByAidAPI, SelectForReviewersByPageAPI } from '@/service/ForReviewersController'
import router from '@/router'
import type { ForReviewersDelete, ForReviewersParam, ForReviewersVO } from '@/types/ForReviewers'
import { SelectJournalsByIdAPI } from '@/service/JournalsController'
import type { JournalsQueryVO } from '@/types/Journals'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const ForReviewersPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchForReviewers = ref<ForReviewersParam>({})

//表格数据
const tableData = ref<ForReviewersVO[]>([])

// 创建新的
const createForReviewers = () => {
  router.push({
    path: `/back/journalsOther/JournalsForReviewersMake/0/${props.id}`
  })
}

// 编辑
const EditForReviewers = (forReviewersVO: ForReviewersVO) => {
  router.push({
    path: `/back/journalsOther/JournalsForReviewersMake/${forReviewersVO.aid}/${props.id}`
  })
}

////////////////////// 删除
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
let deleteJournalsId = ref<ForReviewersDelete>({
  aid: '',
  name: ''
})
// 点击打开弹窗
const handleDelete = (forReviewersVO: ForReviewersVO) => {
  deleteJournalsId.value.aid = forReviewersVO.aid!
  deleteJournalsId.value.name = forReviewersVO.name!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await DeleteForReviewersByAidAPI(deleteJournalsId.value.aid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getForReviewersList(ForReviewersPage.value!.page!, ForReviewersPage.value.pageSize!)
  }
}

//获取用户信息
const getForReviewersList = async (page: number, pageSize: number) => {
  const res = await SelectForReviewersByPageAPI({
    jid: props.id,
    name: searchForReviewers.value.jid,
    aid: searchForReviewers.value.aid,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新高校数据')
  } else {

  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getForReviewersList(val, ForReviewersPage.value.pageSize)
}

const journalsMessage = ref<JournalsQueryVO>({})

//获取高校基础内容
const getJournalsOne = async () => {
  let res = await SelectJournalsByIdAPI(props.id)
  if (res.code === 0) {
    journalsMessage.value = res.data
  }
}

onMounted(async () => {
  await getJournalsOne()
  await getForReviewersList(1, 15)
})

//模糊搜索
const searchForReviewersList = () => {
  getForReviewersList(ForReviewersPage.value.page, ForReviewersPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
