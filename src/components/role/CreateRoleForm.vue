<template>
  <!--对话框 用于确认是否删除对应页面-->
  <el-dialog v-model="visible" >
    <view>
      <h2 style="font-size: 24px">创键角色</h2>
    </view>
    <el-form :rules="rules" :model="roleCreate" ref="form" size="large" autocomplete="off">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="roleCreate.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色值" prop="roleKey">
        <el-input v-model="roleCreate.roleKey" placeholder="请输入角色值" />
      </el-form-item>
      <el-form-item label="父角色" prop="parentId">
        <el-select v-model="roleCreate.parentId" placeholder="用户身份" style="width: 240px">
          <el-option
            style="font-size: 18px"
            v-for="item in parentSelect()"
            :key="item.roleKey"
            :label="item.roleName"
            :value="item.rid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="roleCreate.remark"  type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"  placeholder="请输入备注" />
      </el-form-item>
        <el-button type="warning" @click="submitSave(form)">提交</el-button>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { CreateRolesRequest, RoleData } from '@/types/roles'
import { ElMessage, type FormInstance } from 'element-plus'
import { CreateRolesAPI } from '@/service/RolesController'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'

interface Props{
  tableData:RoleData[]
  onReload?:()=>void
}
const props = defineProps<Props>()

const roleCreate = ref<CreateRolesRequest>({
  apiIds: [], parentId: '', remark: '', rid: '', roleKey: '', roleName: '', status: 1
})

//表单校验
const form = ref<FormInstance|undefined>()
const visible = ref<boolean>(false)
//提交用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交角色内容,切勿重复保存',
        type: 'success'
      })
      SaveArticle()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}
const SaveArticle = async () => {
  const res = await CreateRolesAPI({
    ...roleCreate.value
  })
  if (res.code == 0) {
    props.onReload?.()
    ElMessage.success("创建成功")
    closeModal()
  }
}
const parentSelect = ()=>{
  let parent = props.tableData.filter((item)=>{
    return item
  })
  parent.push({
    createAt: '',
    createBy: '',
    parentId: '',
    remark: '',
    rid: '0',
    roleKey: '不继承',
    roleName: '不继承',
    status: 0,
    updateAt: '',
    updateBy: ''
  })
  return parent
}

//表单校验规则
const rules = {
  parentId: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  remark: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  rid: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
  ,
  roleKey: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  roleName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

const openModal=async ()=>{
  // 每次打开清空数据
  roleCreate.value ={
    apiIds: [], parentId: '', remark: '', rid: '', roleKey: '', roleName: '', status: 1
  }
  await onlyPid() // 每次打开获取唯一id
  visible.value=true
}

defineExpose({
  openModal,
})

const onlyPid = async () => {
  const res = await GenerateOnlyIdAPI()
  if (res.code === 0) {
    roleCreate.value.rid = res.data.id
  }
}
const closeModal=()=>{
  visible.value= false
}
</script>
<style scoped lang="less">

</style>