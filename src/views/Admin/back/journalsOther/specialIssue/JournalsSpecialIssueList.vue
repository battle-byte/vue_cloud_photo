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
        <span>确认删除SpecialIssue下的导航栏</span>
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
      <el-button type="primary" @click="createSpecialIssue">创建新的SpecialIssue栏</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="aid" label="ID" width="180" />
        <el-table-column prop="name" label="SpecialIssue栏名称" width="400" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="EditSpecialIssue(scope.row)">编辑</el-button>
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
          v-model:current-page="SpecialIssuePage.page"
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

import { DeleteSpecialIssueByAidAPI, SelectSpecialIssueByPageAPI } from '@/service/SpecialIssueController'
import router from '@/router'
import type { SpecialIssueDelete, SpecialIssueParam, SpecialIssueVO } from '@/types/SpecialIssue'
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
const SpecialIssuePage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchSpecialIssue = ref<SpecialIssueParam>({})

//表格数据
const tableData = ref<SpecialIssueVO[]>([])

// 创建新的
const createSpecialIssue = () => {
  router.push({
    path: `/back/journalsOther/JournalsSpecialIssueMake/0/${props.id}`
  })
}

// 编辑
const EditSpecialIssue = (specialIssueVO: SpecialIssueVO) => {
  router.push({
    path: `/back/journalsOther/JournalsSpecialIssueMake/${specialIssueVO.aid}/${props.id}`
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
let deleteJournalsId = ref<SpecialIssueDelete>({
  aid: '',
  name: ''
})
// 点击打开弹窗
const handleDelete = (specialIssueVO: SpecialIssueVO) => {
  deleteJournalsId.value.aid = specialIssueVO.aid!
  deleteJournalsId.value.name = specialIssueVO.name!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await DeleteSpecialIssueByAidAPI(deleteJournalsId.value.aid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getSpecialIssueList(SpecialIssuePage.value!.page!, SpecialIssuePage.value.pageSize!)
  }
}

//获取用户信息
const getSpecialIssueList = async (page: number, pageSize: number) => {
  const res = await SelectSpecialIssueByPageAPI({
    jid: props.id,
    name: searchSpecialIssue.value.jid,
    aid: searchSpecialIssue.value.aid,
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
  getSpecialIssueList(val, SpecialIssuePage.value.pageSize)
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
  console.log("props.id",props.id)
  await getJournalsOne()
  await getSpecialIssueList(1, 15)
})

//模糊搜索
const searchSpecialIssueList = () => {
  getSpecialIssueList(SpecialIssuePage.value.page, SpecialIssuePage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
