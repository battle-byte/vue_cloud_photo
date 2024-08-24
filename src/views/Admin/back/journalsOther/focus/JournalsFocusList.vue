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
        <span>确认删除Focus下的导航栏</span>
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
      <span style="padding-top: 5px">正在编辑的期刊{{ props.id }}的导航栏</span>
      <span style="padding-top: 5px">正在编辑的期刊名称:{{ journalsMessage.journalsName }}</span>

      <el-button type="primary" @click="createFocus">创建新的Focus栏</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="aid" label="ID" width="180" />
        <el-table-column prop="name" label="Focus栏名称" width="400" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" type="primary" @click="EditFocus(scope.row)">编辑</el-button>
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
          v-model:current-page="FocusPage.page"
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
import router from '@/router'
import { SelectJournalsByIdAPI } from '@/service/JournalsController'
import type { JournalsQueryVO } from '@/types/Journals'
import { DeleteFocusByAidAPI, SelectFocusByPageAPI } from '@/service/FocusController'
import type { FocusDelete, FocusParam, FocusVO } from '@/types/Focus'

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
const FocusPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchFocus = ref<FocusParam>({})

//表格数据
const tableData = ref<FocusVO[]>([])

// 创建新的
const createFocus = () => {
  router.push({
    path: `/back/journalsOther/JournalsFocusMake/0/${props.id}`
  })
}

// 编辑
const EditFocus = (focusVO: FocusVO) => {
  router.push({
    path: `/back/journalsOther/JournalsFocusMake/${focusVO.aid}/${props.id}`
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
let deleteJournalsId = ref<FocusDelete>({
  aid: '',
  name: ''
})
// 点击打开弹窗
const handleDelete = (focusVO: FocusVO) => {
  deleteJournalsId.value.aid = focusVO.aid!
  deleteJournalsId.value.name = focusVO.name!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await DeleteFocusByAidAPI(deleteJournalsId.value.aid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getFocusList(FocusPage.value!.page!, FocusPage.value.pageSize!)
  }
}

//获取用户信息
const getFocusList = async (page: number, pageSize: number) => {
  const res = await SelectFocusByPageAPI({
    jid: props.id,
    name: searchFocus.value.jid,
    aid: searchFocus.value.aid,
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
  getFocusList(val, FocusPage.value.pageSize)
}

const journalsMessage = ref<JournalsQueryVO>({})

//获取期刊基础内容
const getJournalsOne = async () => {
  let res = await SelectJournalsByIdAPI(props.id)
  if (res.code === 0) {
    journalsMessage.value = res.data
  }
}

onMounted(async () => {
  await getJournalsOne()
  await getFocusList(1, 15)
})

//模糊搜索
const searchFocusList = () => {
  getFocusList(FocusPage.value.page, FocusPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
