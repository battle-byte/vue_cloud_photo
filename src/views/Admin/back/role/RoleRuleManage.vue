<template>
  <view>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">角色值:{{role.roleKey}}</span>
      <span style="padding-top: 5px">角色名称:{{role.roleName}}</span>
      <el-select v-model="searchApis.apiGroup"  placeholder="接口组" style="width: 240px">
        <el-option
          style="font-size: 18px"
          v-for="item in groups"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button type="primary" @click="getApisList">搜索</el-button>
      <el-button type="success" @click="RefreshApis">刷新接口</el-button>
      <el-button type="danger" :disabled="!(selectApisIds.length>0)"  @click=" AddRoleApis ">通过权限</el-button>
      <el-button type="warning" :disabled="!(selectApisIds.length>0)" @click="deleteRoleApis">移除权限</el-button>
    </div>

    <div class="manage">
      <el-table height="90%" :data="tableData"
                stripe
                ref="multipleTableRef"
                row-key="id"
                @selection-change="handleSelectionChange"
                style="width: 100%">
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="path" label="路径" width="200" />
        <el-table-column prop="apiGroup" label="接口分组" width="200" />
        <el-table-column prop="method" label="接口方法" width="100" />
        <el-table-column prop="description" label="简介" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="150" />
        <el-table-column prop="path" label="是否允许角色通过" width="150">
          <template #default="scope">
            <span v-html="resultFormatApi(scope.row.path+scope.row.method)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="修改时间" width="150" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
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
          v-model:current-page="searchApis.page"
          @current-change="getApisList"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//角色的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, type TableInstance } from 'element-plus'
import type { CasbinData, RoleData } from '@/types/roles'
import { GetRoleApisAPI, GetRolesAPI, RoleApisDeleteAPI, RoleApisSaveAPI } from '@/service/RolesController'
import type { ApisData, ListApisRequest } from '@/types/apis'

import { useRoute } from 'vue-router'
import { ApisGroupsAPI, ListApisAPI, RefreshApisAPI } from '@/service/ApisController'

//分页下标
const pageCount = ref<number>(0)
const selectApisIds = ref<number[]>([])

// 函数返回true表示选项可选 false为选项不可选 如果想要实现反复选择 全部return true即可

const multipleTableRef = ref<TableInstance>()
const groups = ref<string[]>()
const casbins = ref<CasbinData[]>()

const role = ref<RoleData>({
  parentId: '',
  createAt: '',
  createBy: '',
  remark: '',
  rid: '',
  roleKey: '',
  roleName: '',
  status: 0,
  updateAt: '',
  updateBy: ''
})
//搜索
const searchApis = ref<ListApisRequest>({
  apiGroup: '', page: 1, size: 15
})

//表格数据
const tableData = ref<ApisData[]>([])

const selectable = (row: ApisData) =>{
  // 总是允许取消已选中的行
  // if (!selectApisIds.value.includes(Number(row.id))) {
  //   return true;
  // }
  // 在这里添加其他不可选条件
  return true /* 你的其他不可选条件 */;
}
// 选中数据后如何处理
const handleSelectionChange = (val: ApisData[]) => {
  let ids:number[] = []
  if (val.length > 0){
    val.forEach((item) => {
      ids.push(Number(item.id))
    })
    selectApisIds.value = ids
  }else {
    selectApisIds.value = []
  }
}


//分页查询api
const getApisList = async () => {
  const res = await ListApisAPI(searchApis.value)
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records!
    pageCount.value = res.data.total!
    ElMessage.success('已更API数据')
  } else {
    ElMessage.error('更新API失败')
  }
}

//获取角色含有的api
const getRolesApis = async () => {
  const res = await GetRoleApisAPI({
    roleKey:role.value.roleKey
  })
  if (res.code === 0) {
    casbins.value = res.data.records
  }
}


const route=useRoute()
const getRole =async ()=>{
  const id  = route.query?.id as string
  if (id) { //如果传来了新id 直接搜索
    const  res = await GetRolesAPI(id)
    if (res.code == 0) {
      role.value = res.data.role
    }
  }else { //上传新图片 无需处理
    ElMessage.error("错误进入页面")
  }
}
const getGroups =async ()=>{
    const  res = await ApisGroupsAPI()
    if (res.code == 0) {
      groups.value = res.data.apiGroups
    }
}
const RefreshApis =async ()=>{
    const  res = await RefreshApisAPI()
    if (res.code == 0) {
      ElMessage.success("刷新接口成功")
      getApisList()
      getGroups()
    }else {
      ElMessage.error("刷新接口失败")
    }
}

function containsCasbinByName(name: string): boolean {
  return casbins.value?.some(item => item.v1+item.v2 === name)??false;
}

const resultFormatApi = (path: string) => {
  if (containsCasbinByName(path)){
    return "有权限"
  }else {
    return "无权限"
  }
}


const deleteRoleApis =async ()=>{
  const res = await RoleApisDeleteAPI({
    roleKey:role.value.roleKey,
    ids:selectApisIds.value
  })
  if (res.code === 0) {
    getRolesApis()
    ElMessage.success('移除成功！')
  }else {
    ElMessage.error('移除失败！')
  }
}

const AddRoleApis =async ()=>{
  const res = await RoleApisSaveAPI({
    roleKey:role.value.roleKey,
    ids:selectApisIds.value
  })
  if (res.code === 0) {
    getRolesApis()
    ElMessage.success('添加成功！')
  }else {
    ElMessage.error('添加失败！')
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getApisList()
}

onMounted(async () => {
  await getApisList()
  await getRole()
  await getGroups()
  await getRolesApis()
})

</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
