<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除编委会成员"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除编委会成员</span>
        <span>ID:{{ deleteEditorialId.eid }}</span>
        <span>名称:{{ deleteEditorialId.eName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">编委会成员ID</span>
      <el-input
        v-model="searchEditorial.eid"
        style="width: 240px"
        placeholder="请输入编委会ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">编委会成员名称</span>
      <el-input
        v-model="searchEditorial.eName"
        style="width: 240px"
        placeholder="编委会成员名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchEditorialList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="eid" label="ID" width="180" />
        <el-table-column prop="eName" label="名称" width="180" />
        <el-table-column prop="ePhoto" label="照片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.ePhoto" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="简介" width="300" />
        <el-table-column prop="sections" label="邮箱" width="400" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEditorialEdit(scope.row)"
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
          v-model:current-page="editorialPage.page"
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

import type {
  EditorialDeleteParam,
  EditorialQueryByPageParam,
  EditorialQueryVO
} from '@/types/Editorial'
import { deleteEditorialIdAPI, SelectEditorialByPageAPI } from '@/service/EditorialController'
// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const editorialPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchEditorial = ref<EditorialQueryByPageParam>({})

//表格数据
const tableData = ref<EditorialQueryVO[]>([])

//编委会状态数据格式化  0 不发布 1已发布
const resultFormatPublish = (value: number) => {
  if (value == 1) {
    return `已发布`
  } else if (value == 0) {
    return `未发布`
  } else {
    return '未知'
  }
}
// 编委会状态品质状态
const resultFormatPerfect = (value: number) => {
  if (value == 1) {
    return `精品编委会`
  } else if (value == 0) {
    return `普通编委会`
  } else {
    return '未知'
  }
}

// 基础内容编辑
const handleEditorialEdit = (editorialQueryAndPeriodicalVO: EditorialQueryVO) => {
  router.push({
    path: `/back/editorial/EditorialUpdate/${editorialQueryAndPeriodicalVO.eid}`
  })
}

//获取用户信息
const getEditorialList = async (page: number, pageSize: number) => {
  const res = await SelectEditorialByPageAPI({
    eid: searchEditorial.value.eid,
    eName: searchEditorial.value.eName,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新编委会数据')
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
let deleteEditorialId = ref<EditorialDeleteParam>({
  eid: '',
  eName: ''
})
// 删除
const handleDelete = (editorialQueryAndPeriodicalVO: EditorialQueryVO) => {
  deleteEditorialId.value.eid = editorialQueryAndPeriodicalVO.eid!
  deleteEditorialId.value.eName = editorialQueryAndPeriodicalVO.eName!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteEditorialIdAPI(deleteEditorialId.value.eid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
     getEditorialList(editorialPage.value.page, editorialPage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getEditorialList(val, editorialPage.value.pageSize)
}

onMounted(() => {
  getEditorialList(1, 15)
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
