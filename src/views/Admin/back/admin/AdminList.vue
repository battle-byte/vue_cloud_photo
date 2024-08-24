<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除管理员"
      width="500"
      :before-close="DeleteClose"
    >
      <el-col>
        <span>确认删除管理员</span>
        <span>ID:{{ deleteAdminId.uid }}</span>
        <span>账号:{{ deleteAdminId.userAccount }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DeleteCancel">取消删除</el-button>
          <el-button @click="DeleteSubmit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <!--对话框 用于确认是否修改密码-->
    <el-dialog
      v-model="EditDialogFormVisible"
      name="修改管理员密码"
      width="500"
      :before-close="EditClose"
    >
      <el-col>
        <span>确认修改管理员</span>
        <span>ID:{{ deleteAdminId.uid }}</span>
        <span>账号:{{ deleteAdminId.userAccount }}</span>
      </el-col>
      <el-form-item prop="userPassword">
        <el-input
          v-model="EditPassword.userPassword"
          name="password"
          :prefix-icon="Lock"
          type="password"
          placeholder="请输入密码 不得小于6位 不得大于18位"
          maxlength="15"
          minlength="6"
        ></el-input>
      </el-form-item>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="EditCancel">取消修改</el-button>
          <el-button @click="EditSubmit" type="primary">确定修改</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">管理员ID</span>
      <el-input
        v-model="searchAdmin.uid"
        style="width: 240px"
        placeholder="请输入管理员ID"
        :suffix-icon="Search"
      />
      <span style="padding-top: 5px">管理员账号</span>
      <el-input
        v-model="searchAdmin.userAccount"
        style="width: 240px"
        placeholder="管理员名称"
        :prefix-icon="Search"
      />
      <el-button type="primary" @click="searchAdminList">搜索</el-button>

      <el-input
        v-model="adminCode"
        style="width: 240px"
        placeholder="注册验证码"
      />
      <el-button type="warning" @click="GetAdminCode">生成随机注册验证码</el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="uid" label="ID" width="200" />
        <el-table-column prop="userAccount" label="管理员账号" width="400" />
        <el-table-column prop="userRole" label="管理员身份" width="150">
          <template #default="scope">
            <span v-html="resultFormatUserRole(scope.row.userRole)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="管理员创建时间" width="400" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" @click="handleAdminEditPassword(scope.row)">重置密码</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleBan(scope.row)"
              v-if="scope.row.userRole == 0"
              >封禁
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleNotBan(scope.row)"
              v-if="scope.row.userRole == 1"
              >解禁
            </el-button>
            <el-button
              size="small"
              v-if="scope.row.userRole !== 2"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
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

import { Calendar, Lock, Search } from '@element-plus/icons-vue'

import router from '@/router'
import type { AdminDeleteShow, SearchUserParam, UserUpdatePassword, UserVO } from '@/types/Admin'
import {
  AdminCreateCodeAPI,
  AdminEditPasswordAPI,
  deleteAdminIdAPI,
  getUserSearchAPI,
  handleBanAPI,
  handleNotBanAPI
} from '@/service/AdminController'

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const noticePage = ref<PageParams>({
  page: 1,
  pageSize: 15
})

//搜索
const searchAdmin = ref<SearchUserParam>({})

//表格数据
const tableData = ref<UserVO[]>([])

// 封禁
const handleBan = async (userVO: UserVO) => {
  if (userVO.userRole == 1) {
    ElMessage.error('该管理员被封禁')
    return
  }
  const res = await handleBanAPI(userVO.userAccount!)
  if (res.code === 0) {
    getAdminList(noticePage.value.page, noticePage.value.pageSize)
  }
}
// 解禁
const handleNotBan = async (userVO: UserVO) => {
  if (userVO.userRole == 0) {
    ElMessage.error('该管理员未被封禁')
    return
  }
  const res = await handleNotBanAPI(userVO.uid!)
  if (res.code === 0) {
    getAdminList(noticePage.value.page, noticePage.value.pageSize)
  }
}

//获取用户信息
const getAdminList = async (page: number, pageSize: number) => {
  const res = await getUserSearchAPI({
    userAccount: searchAdmin.value.userAccount,
    uid: searchAdmin.value.uid,
    page: page,
    pageSize: pageSize
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records
    pageCount.value = res.data.total
    ElMessage.success('已更新管理员数据')
  } else {
    ElMessage.error('更新管理员数据失败')
  }
}

const resultFormatUserRole = (value: number) => {
  if (value === 1) {
    return `被封禁`
  } else if (value === 0) {
    return `普通管理员`
  } else if (value === 2) {
    return '超级管理员'
  } else {
    return '未知'
  }
}

///////////////////////////////////修改密码对话框
// 控制对话框是否打开
const EditDialogFormVisible = ref(false)

//取消提交表单
const EditCancel = () => {
  //只要关闭表单，就刷新表单
  EditDialogFormVisible.value = false
}
//表单关闭的时候清除基本的数据
const EditClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭页面吗')
    .then(() => {
      //只要关闭表单，就刷新表单
      done()
    })
    .catch(() => {
      // catch error
    })
}
let EditPassword = ref<UserUpdatePassword>({
  userAccount: '',
  userPassword: ''
})

// 取消修改密码
const handleAdminEditPassword = (noticeQueryByPageVO: UserVO) => {
  EditPassword.value.userAccount = noticeQueryByPageVO.userAccount!
  EditDialogFormVisible.value = true
}

//确认提交修改密码
const EditSubmit = async () => {
  EditDialogFormVisible.value = false
  console.log(EditPassword.value)
  const res = await AdminEditPasswordAPI({
    ...EditPassword.value
  })
  if (res.code == 0) {
    ElMessage.success('修改成功')
    getAdminList(noticePage.value.page, noticePage.value.pageSize)
  }
}

//////////////////////////// 删除对话框

// 控制对话框是否打开
const deleteDialogFormVisible = ref(false)

//取消提交表单
const DeleteCancel = () => {
  //只要关闭表单，就刷新表单
  deleteDialogFormVisible.value = false
}
//表单关闭的时候清除基本的数据
const DeleteClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭页面吗')
    .then(() => {
      //只要关闭表单，就刷新表单
      done()
    })
    .catch(() => {
      // catch error
    })
}
let deleteAdminId = ref<AdminDeleteShow>({
  uid: '',
  userAccount: ''
})

// 删除
const handleDelete = (noticeQueryByPageVO: UserVO) => {
  deleteAdminId.value.uid = noticeQueryByPageVO.uid!
  deleteAdminId.value.userAccount = noticeQueryByPageVO.userAccount!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const DeleteSubmit = async () => {
  deleteDialogFormVisible.value = false
  const res = await deleteAdminIdAPI(deleteAdminId.value.uid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getAdminList(noticePage.value.page, noticePage.value.pageSize)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getAdminList(val, noticePage.value.pageSize)
}

onMounted(() => {
  getAdminList(1, 15)
})

//模糊搜索
const searchAdminList = () => {
  getAdminList(noticePage.value.page, noticePage.value.pageSize)
}

let adminCode = ref<string>('')
// 生成随机验证码
const GetAdminCode = async () => {
  const res = await AdminCreateCodeAPI()
  if (res.code === 0) {
    adminCode.value = res.data
    ElMessage.success('生成成功,请在5分钟内使用')
  }
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
