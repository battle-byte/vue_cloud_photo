<template>
  <view style="font-size: 24px;">成员管理</view>
  <el-form inline>
    <el-form-item title="添加用户">
      <el-input style="width: 200px;" v-model="addSpaceUseRole" placeholder="请输入用户ID" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addSpaceUser">添加用户</el-button>
    </el-form-item>
  </el-form>
  <el-table height="90%" :data="dataList" stripe style="width: 100%">
    <el-table-column prop="sysUser.avatar" label="用户" width="180">
      <template #default="scope">
        <el-row>
          <el-image :src="scope.row.sysUser.avatar" style="width: 100px; height: 100px" />
        </el-row>
      </template>
    </el-table-column>
    <el-table-column prop="sysUser.username" label="用户名" width="100" />
    <el-table-column prop="spaceUser.spaceRole" label="用户身份" width="200">
      <template #default="scope">
        <el-select
          v-model="scope.row.spaceUser.spaceRole"
        >
          <el-option
          v-for="item in SPACE_ROLE_OPTIONS"
          :label="item.label"
          :value="item.value"
          :key="item.value"
          @click="editSpaceRole(item.value,scope.row)"
          />
        </el-select>
      </template>

    </el-table-column>
    <el-table-column label="操作" width="500">
      <template #default="scope">
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
</template>

<script setup lang="ts">

// 定义属性
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import {
  SpaceUserCreateAPI,
  SpaceUserDeleteUserAPI, SpaceUserEditAPI, SpaceUserListAPI,
  SpaceUserQueryAPI
} from '@/service/SpaceUserController'
import {
  SPACE_ROLE_ENUM, SPACE_ROLE_MAP,
  SPACE_ROLE_OPTIONS,
  type SpaceUserAndSysUser,
  type SpaceUserQueryRequest
} from '@/types/space_user'
import { spaceRoleStore } from '@/stores'


interface Props {
  id: string
}

const props = defineProps<Props>()
const spaceRole = spaceRoleStore()
// 数据
const dataList = ref<SpaceUserAndSysUser[]>([])
const searchData = ref<SpaceUserQueryRequest>({ id: '', spaceId: '', spaceRole: '', userId: '' })
const addSpaceUseRole = ref<string>("")
// 获取数据
const fetchData = async () => {
  const spaceId = props.id
  if (!spaceId) {
    return
  }
  const res = await SpaceUserQueryAPI({
    id:searchData.value.id,
    spaceId:props.id,
    spaceRole:searchData.value.spaceRole,
    userId:searchData.value.userId,
  })
  if (res.code===0) {
    dataList.value = res.data.record ?? []
    dataList.value = dataList.value.map((item)=>{
      item.spaceUser.spaceRole = restful(item.spaceUser.spaceRole)
      return item
    })
  } else {
  }
}
const handleDelete = async (info:SpaceUserAndSysUser)=>{
  const res = await SpaceUserDeleteUserAPI({
    spaceId:info.spaceUser.spaceId,
    userId:info.sysUser.uid!,
  })
  if (res.code===0) {
    ElMessage.success('删除成功')
    fetchData()
  }
}
const editSpaceRole = async (value:string,info:SpaceUserAndSysUser)=>{
  const res = await SpaceUserEditAPI({
    spaceId:info.spaceUser.spaceId,
    userId:info.sysUser.uid!,
    spaceRole:value,
  })
  if (res.code===0) {
    ElMessage.success('修改成功')
    fetchData()
  }
}
const addSpaceUser = async ()=>{
  const res = await SpaceUserCreateAPI({
    spaceId:props.id,
    userId:addSpaceUseRole.value,
    spaceRole:SPACE_ROLE_ENUM.EDITOR,
  })
  if (res.code===0) {
    ElMessage.success('添加成功')
    fetchData()
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

const restful = (value:string)=>{
  if (value==SPACE_ROLE_ENUM.ADMIN){
    return SPACE_ROLE_MAP[SPACE_ROLE_ENUM.ADMIN]
  } else if (value==SPACE_ROLE_ENUM.VIEWER){
    return SPACE_ROLE_MAP[SPACE_ROLE_ENUM.VIEWER]
  }else if (value==SPACE_ROLE_ENUM.EDITOR){
    return SPACE_ROLE_MAP[SPACE_ROLE_ENUM.EDITOR]
  }
  return "未知"
}

</script>


<style scoped lang="less">

</style>