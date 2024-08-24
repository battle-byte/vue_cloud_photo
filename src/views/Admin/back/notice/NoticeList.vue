<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除公告"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除公告</span>
        <span>ID:{{ deleteNoticeId.nid }}</span>
        <span>标题:{{ deleteNoticeId.name }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">公告ID</span>
      <el-input
        v-model="searchNotice.nid"
        style="width: 240px"
        placeholder="请输入公告ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">公告标题</span>
      <el-input
        v-model="searchNotice.name"
        style="width: 240px"
        placeholder="公告名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchNoticeList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="nid" label="ID" width="200" />
        <el-table-column prop="name" label="公告标题" width="400" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
<!--            <el-button size="small"  @click="handleNoticeBaseEdit(scope.row)"-->
<!--              >基础编辑-->
<!--            </el-button>-->
            <el-button size="small" type="primary" @click="handleNoticeContentEdit(scope.row)"
              >内容编辑
            </el-button>
<!--            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
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
          v-model:current-page="noticePage.page"
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
import type { NoticeDeleteShow, NoticeQueryByPageParam, NoticeQueryByPageVO } from '@/types/Notice'
import { deleteNoticeIdAPI, SelectNoticeByPageAPI } from '@/service/NoticeController'

// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const noticePage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchNotice = ref<NoticeQueryByPageParam>({})

//表格数据
const tableData = ref<NoticeQueryByPageVO[]>([])

// 基础内容编辑
const handleNoticeBaseEdit = (noticeQueryByPageVO: NoticeQueryByPageVO) => {
  router.push({
    path: `/back/notice/NoticeUpdate/${noticeQueryByPageVO.nid}`
  })
}

// 核心内容编辑 handleNoticeContentEdit
const handleNoticeContentEdit = (noticeQueryByPageVO: NoticeQueryByPageVO) => {
  router.push({
    path: `/back/notice/MakeNoticePage/${noticeQueryByPageVO.nid}`
  })
}

//获取用户信息
const getNoticeList = async (page: number, pageSize: number) => {
  const res = await SelectNoticeByPageAPI({
    nid: searchNotice.value.nid,
    name: searchNotice.value.name,
    page: page,
    pageSize: pageSize
  })
  console.log(res.data)
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新公告数据')
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
let deleteNoticeId = ref<NoticeDeleteShow>({
  nid: '',
  name: ''
})
// 删除
const handleDelete = (noticeQueryByPageVO: NoticeQueryByPageVO) => {
  deleteNoticeId.value.nid = noticeQueryByPageVO.nid!
  deleteNoticeId.value.name = noticeQueryByPageVO.name!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteNoticeIdAPI(deleteNoticeId.value.nid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getNoticeList(noticePage.value.page, noticePage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getNoticeList(val, noticePage.value.pageSize)
}

onMounted(() => {
  getNoticeList(1, 15)
})

//模糊搜索
const searchNoticeList = () => {
  getNoticeList(noticePage.value.page, noticePage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
