<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      title="删除合作伙伴"
      width="500"
      :before-close="handleClose"
    >
      <el-col>
        <span>确认删除合作伙伴</span>
        <span>ID:{{ deleteMembershipId.id }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消删除</el-button>
          <el-button @click="submit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">合作伙伴ID</span>
      <el-input
        v-model="searchMembership.id"
        style="width: 240px"
        placeholder="请输入合作伙伴ID"
        :suffix-icon="Search"
      />
      <el-button type="primary" @click="searchMembershipList">搜索</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="200" />
        <el-table-column prop="url" label="合作伙伴路径" width="300" />
        <el-table-column prop="img" label="合作伙伴图片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.img" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" @click="handleMembershipBaseEdit(scope.row)"
              >基础编辑
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
          v-model:current-page="membershipPage.page"
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
  MembershipDeleteShow,
  MembershipQueryByPageParam,
  MembershipQueryVO
} from '@/types/Membership'
import { deleteMembershipIdAPI, SelectMembershipByPageAPI } from '@/service/MembershipController'

// 控制对话框是否打开
const dialogFormVisible = ref(false)

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const membershipPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchMembership = ref<MembershipQueryByPageParam>({})

//表格数据
const tableData = ref<MembershipQueryVO[]>([])

// 基础内容编辑
const handleMembershipBaseEdit = (membershipQueryAndPeriodicalVO: MembershipQueryVO) => {
  router.push({
    path: `/back/membership/MembershipUpdate/${membershipQueryAndPeriodicalVO.id}`
  })
}

//获取用户信息
const getMembershipList = async (page: number, pageSize: number) => {
  const res = await SelectMembershipByPageAPI({
    id: searchMembership.value.id,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新合作伙伴数据')
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
let deleteMembershipId = ref<MembershipDeleteShow>({
  id: ''
})
// 删除
const handleDelete = (membershipQueryAndPeriodicalVO: MembershipQueryVO) => {
  deleteMembershipId.value.id = membershipQueryAndPeriodicalVO.id!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const submit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteMembershipIdAPI(deleteMembershipId.value.id!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getMembershipList(membershipPage.value.page, membershipPage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getMembershipList(val, membershipPage.value.pageSize)
}

onMounted(() => {
  getMembershipList(1, 15)
})

//模糊搜索
const searchMembershipList = () => {
  getMembershipList(membershipPage.value.page, membershipPage.value.pageSize)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
