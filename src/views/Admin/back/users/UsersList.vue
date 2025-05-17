<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除用户"
      width="500"
      :before-close="DeleteClose"
    >
      <el-col>
        <span>确认删除用户</span>
        <span>ID:{{ deleteUsersId.uid }}</span>
        <span>账号:{{ deleteUsersId.username }}</span>
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
      name="修改用户密码"
      width="500"
      :before-close="EditClose"
    >
      <el-col>
        <span>确认修改用户</span>
        <span>ID:{{ deleteUsersId.uid }}</span>
        <span>账号:{{ deleteUsersId.username }}</span>
      </el-col>
      <el-form-item prop="password">
        <el-input
          v-model="EditPassword.password"
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
      <span style="padding-top: 5px">用户账号</span>
      <el-input
        v-model="searchUsers.username"
        style="width: 240px"
        placeholder="用户名称"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">用户身份</span>
      <el-select v-model="searchUsers.rid" placeholder="用户身份" style="width: 240px">
        <el-option
          style="font-size: 18px"
          v-for="item in rolesList"
          :key="item.rid"
          :label="item.roleName"
          :value="item.rid"
        />
      </el-select>
      <el-button type="primary" @click="searchUsersList">搜索</el-button>

    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="uid" label="ID" width="200" />
        <el-table-column prop="username" label="用户账号" width="200" />
        <el-table-column prop="nickname" label="用户名称" width="200" />
        <el-table-column prop="updateBy" label="修改人" width="200" />
        <el-table-column prop="updateAt" label="修改时间" width="400" />

        <el-table-column prop="createBy" label="创建人" width="200" />
        <el-table-column prop="createAt" label="创建时间" width="400" />

        <el-table-column prop="avatar" label="用户图片" width="200">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="roleId" label="用户身份" width="150">
          <template #default="scope">
            <span v-html="resultFormatUsersRole(scope.row.roleId)"> </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" @click="handleUsersEditPassword(scope.row)">重置密码</el-button>
            <el-button size="small"  @click="handleUsersBaseEdit(scope.row)"
            >基础编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleBan(scope.row)"
              v-if="scope.row.status === 1"
              >封禁
            </el-button>
            <el-button
              size="small"
              type="success"
              @click="handleNotBan(scope.row)"
              v-if="scope.row.status === 2"
              >解禁
            </el-button>
            <el-button
              size="small"
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
import {
  ChangeStatusAPI, ListSysUserAPI, SysUserDeleteAPI, SysUserUpdateAPI, SysUserUpdatePasswordAPi
} from '@/service/UsersController'
import type {
  SysUserDeleteShow,
  SysUserListVO,
  SysUserSearch,
  SysUserUpdatePasswordByAdminRequest,
  SysUserUpdatePasswordRequest
} from '@/types/Users'
import type { RoleData } from '@/types/roles'
import { ListRolesAPI } from '@/service/RolesController'


//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const noticePage = ref<PageParams>({
  page: 1,
  size: 15
})

//搜索
const searchUsers = ref<SysUserSearch>({})

//表格数据
const tableData = ref<SysUserListVO[]>([])
// 文章发布状态选择框
const rolesList = ref<RoleData[]>([])
// 封禁
const handleBan = async (userVO: SysUserListVO) => {
  if (userVO.status == 2) {
    ElMessage.error('该用户已被封禁')
    return
  }
  const res = await ChangeStatusAPI({
    status:2,
    uid: userVO.uid!
  })
  if (res.code === 0) {
    getUsersList(noticePage.value.page, noticePage.value.size)
  }
}
// 解禁
const handleNotBan = async (userVO: SysUserListVO) => {
  if (userVO.status == 1) {
    ElMessage.error('该用户未被封禁')
    return
  }
  const res = await ChangeStatusAPI({
    status:1,
    uid: userVO.uid!
  })
  if (res.code === 0) {
    getUsersList(noticePage.value.page, noticePage.value.size)
  }
}

//获取用户信息
const getUsersList = async (page: number, size: number) => {
  const res = await ListSysUserAPI({
    username: searchUsers.value.username,
    uid: searchUsers.value.uid,
    rid: Number(searchUsers.value.rid),
    page: page,
    size: size,
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records!
    pageCount.value = res.data.total!
    console.log(tableData.value)
    ElMessage.success('已更新用户数据')
  } else {
    ElMessage.error('更新用户数据失败')
  }
}
//获取角色信息
const getRoleList = async () => {
  const res = await ListRolesAPI({
    roleKey: "",
    roleName: "",
    status:0,
    page: 0,
    size: 10
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    rolesList.value = res.data.records
    console.log(res.data)
  } else {
    ElMessage.error('获取角色数据失败')
  }
}
const resultFormatUsersRole = (value: number) => {
  for (let rolesListKey of rolesList.value) {
    if(value==Number(rolesListKey.rid)){
      return rolesListKey.roleName
    }
  }
  return "未知"
}


// 基础内容编辑
const handleUsersBaseEdit = (userQueryAndPeriodicalVO: SysUserListVO) => {
  router.push({
    path: `/back/users/UsersUpdate/${userQueryAndPeriodicalVO.uid}`
  })
}


///////////////////////////////////修改密码对话框
// 控制对话框是否打开
const EditDialogFormVisible = ref(false)

//取消提交表单
const EditCancel = () => {
  //只要关闭表单，就刷新表单
  EditPassword.value.password=""
  EditPassword.value.uid=""
  EditPassword.value.username=""
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
let EditPassword = ref<SysUserUpdatePasswordByAdminRequest>({
  username: '',
  password: '',
  uid:""
})

// 修改密码
const handleUsersEditPassword = (noticeQueryByPageVO: SysUserListVO) => {
  EditPassword.value.username = noticeQueryByPageVO.username!
  EditPassword.value.uid = noticeQueryByPageVO.uid!
  EditDialogFormVisible.value = true
}

//确认提交修改密码
const EditSubmit = async () => {
  EditDialogFormVisible.value = false
  const res = await SysUserUpdatePasswordAPi({
    ...EditPassword.value
  })
  if (res.code == 0) {
    EditPassword.value.password=""
    ElMessage.success('修改成功')
    getUsersList(noticePage.value.page, noticePage.value.size)
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
let deleteUsersId = ref<SysUserDeleteShow>({
  uid: '',
  username: ''
})

// 删除
const handleDelete = (noticeQueryByPageVO: SysUserListVO) => {
  deleteUsersId.value.uid = noticeQueryByPageVO.uid!
  deleteUsersId.value.username = noticeQueryByPageVO.username!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const DeleteSubmit = async () => {
  deleteDialogFormVisible.value = false
  const res = await SysUserDeleteAPI(deleteUsersId.value.uid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getUsersList(noticePage.value.page, noticePage.value.size)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getUsersList(val, noticePage.value.size)
}

onMounted(async () => {
  await getUsersList(1, 15)
  await getRoleList()
})

//模糊搜索
const searchUsersList = () => {
  getUsersList(noticePage.value.page, noticePage.value.size)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
