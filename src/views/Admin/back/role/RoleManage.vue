<template>
  <view>
    <view>
      <CreateRoleForm ref="createRoleForm"  :table-data="tableData" :on-reload="getRoleList"/>
      <UpdateRoleForm ref="updateRoleForm" :update-data="updateDate"  :table-data="tableData" :on-reload="getRoleList"/>
    </view>
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除角色"
      width="500"
      :before-close="DeleteClose"
    >
      <el-col>
        <span>确认删除角色</span>
        <span>ID:{{ deleteRole.rid }}</span>
        <span>账号:{{ deleteRole.roleName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DeleteCancel">取消删除</el-button>
          <el-button @click="DeleteSubmit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">角色名称</span>
      <el-input
        v-model="searchRole.roleName"
        style="width: 240px"
        placeholder="相关名称"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">角色值</span>
      <el-input v-model="searchRole.roleKey" placeholder="角色值" style="width: 240px" />
      <el-button type="primary" @click="searchRolesList">搜索</el-button>
      <el-button type="success" @click="openCreate">创建</el-button>
    </div>
    <div class="manage">
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="rid" label="ID" width="100" />
        <el-table-column prop="roleName" label="名称" width="100" />
        <el-table-column prop="roleKey" label="值" width="100" />
        <el-table-column prop="parentId" label="父角色" width="150">
          <template #default="scope">
            <span v-html="resultFormatParent(scope.row.parentId)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" width="120" />
        <el-table-column prop="updateBy" label="修改人" width="120" />
        <el-table-column prop="remark" label="备注" width="150" />
        <el-table-column prop="updateAt" label="修改时间" width="180" />
        <el-table-column prop="createAt" label="创建时间" width="200" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button
              size="small"
              link
              type="primary"
              @click="$router.push(`/back/role/role_apis?id=${scope.row.rid}`)">
              编辑权限
            </el-button>
            <el-button
              size="small"
              type="warning"
              @click="updateRole(scope.row)">
              修改角色
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">
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
          v-model:current-page="searchRole.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//角色的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import {  Search } from '@element-plus/icons-vue'
import type {  ListRolesRequest, RoleData, RoleDeleteShow } from '@/types/roles'
import {  DeleteRolesAPI, ListRolesAPI } from '@/service/RolesController'
import CreateRoleForm from '@/components/role/CreateRoleForm.vue'
import UpdateRoleForm from '@/components/role/UpdateRoleForm.vue'


//分页下标
const pageCount = ref<number>(0)

//搜索
const searchRole = ref<ListRolesRequest>({
  page: 0, roleKey: '', roleName: '', size: 0, status: 0
})

//表格数据
const tableData = ref<RoleData[]>([])
const updateDate = ref<RoleData>({
  createAt: '',
  createBy: '',
  parentId: '',
  remark: '',
  rid: '',
  roleKey: '',
  roleName: '',
  status: 0,
  updateAt: '',
  updateBy: ''
})
const createRoleForm = ref()
const updateRoleForm = ref()
const openCreate = ()=>{
  createRoleForm.value.openModal()
}
const resultFormatParent = (parentId:string)=>{
  if (parentId == '0') {
    return "未继承其他角色"
  }
  return tableData.value.find(item => item.rid===parentId)?.roleName
}



//获取角色信息
const getRoleList = async () => {
  const res = await ListRolesAPI(<ListRolesRequest>{
    page: searchRole.value.page,
    size: searchRole.value.size,
    roleKey: searchRole.value.roleKey,
    roleName: searchRole.value.roleName,
    status: searchRole.value.status
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records!
    pageCount.value = res.data.total!
    ElMessage.success('已更新角色数据')
  } else {
    ElMessage.error('更新角色数据失败')
  }
}

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
let deleteRole = ref<RoleDeleteShow>({
  rid: '',
  roleName: ''
})

// 删除
const handleDelete = (role: RoleData) => {
  deleteRole.value.rid = role.rid!
  deleteRole.value.roleName = role.roleName!
  deleteDialogFormVisible.value = true
}
// 修改
const updateRole = (role: RoleData) => {
  updateDate.value = role
  updateRoleForm.value.openModal()
}

//确认提交删除选项
const DeleteSubmit = async () => {
  deleteDialogFormVisible.value = false
  const res = await DeleteRolesAPI(deleteRole.value.rid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getRoleList()
  }
}

//分页下标切换 重新进行分页查询
const handlePage = () => {
  getRoleList()
}

onMounted(() => {
  getRoleList()
})
// 获取唯一索引值 防止重复插入

//模糊搜索
const searchRolesList = () => {
  getRoleList()
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
