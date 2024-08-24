<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除团队成员"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除团队成员</span>
        <span>ID:{{ deleteTeamId.tid }}</span>
        <span>名称:{{ deleteTeamId.tName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">团队成员ID</span>
      <el-input
        v-model="searchTeam.tid"
        style="width: 240px"
        placeholder="请输入团队ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">团队成员名称</span>
      <el-input
        v-model="searchTeam.tName"
        style="width: 240px"
        placeholder="团队成员名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchTeamList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="tid" label="ID" width="180" />
        <el-table-column prop="tName" label="名称" width="180" />
        <el-table-column prop="email" label="照片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.tPhoto" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="comment" label="简介" width="400" />
        <el-table-column prop="email" label="邮箱" width="300" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleTeamEdit(scope.row)"
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
          v-model:current-page="teamPage.page"
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

import type { TeamDeleteParam, TeamQueryByPageParam, TeamQueryVO } from '@/types/Team'
import { deleteTeamIdAPI, SelectTeamByPageAPI } from '@/service/TeamController'
// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const teamPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchTeam = ref<TeamQueryByPageParam>({})

//表格数据
const tableData = ref<TeamQueryVO[]>([])

//团队状态数据格式化  0 不发布 1已发布
const resultFormatPublish = (value: number) => {
  if (value == 1) {
    return `已发布`
  } else if (value == 0) {
    return `未发布`
  } else {
    return '未知'
  }
}
// 团队状态品质状态
const resultFormatPerfect = (value: number) => {
  if (value == 1) {
    return `精品团队`
  } else if (value == 0) {
    return `普通团队`
  } else {
    return '未知'
  }
}

// 基础内容编辑
const handleTeamEdit = (teamQueryAndPeriodicalVO: TeamQueryVO) => {
  router.push({
    path: `/back/team/TeamUpdate/${teamQueryAndPeriodicalVO.tid}`
  })
}

//获取用户信息
const getTeamList = async (page: number, pageSize: number) => {
  const res = await SelectTeamByPageAPI({
    tid: searchTeam.value.tid,
    tName: searchTeam.value.tName,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新团队数据')
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
let deleteTeamId = ref<TeamDeleteParam>({
  tid: '',
  tName: ''
})
// 删除
const handleDelete = (teamQueryAndPeriodicalVO: TeamQueryVO) => {
  deleteTeamId.value.tid = teamQueryAndPeriodicalVO.tid!
  deleteTeamId.value.tName = teamQueryAndPeriodicalVO.tName!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteTeamIdAPI(deleteTeamId.value.tid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getTeamList(teamPage.value.page, teamPage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getTeamList(val, teamPage.value.pageSize)
}

onMounted(() => {
  getTeamList(1, 15)
})

//模糊搜索
const searchTeamList = () => {
  getTeamList(teamPage.value.page, teamPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
