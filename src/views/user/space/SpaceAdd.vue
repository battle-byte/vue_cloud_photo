
<template>
<div id="space_add">
  <h2 style="margin-bottom: 16px;font-size: 24px">
    {{ route.query?.id ? '修改' : '创建' }}{{ SPACE_TYPE_MAP[spaceType] }}
  </h2>

<!--表单-->
  <el-form v-loading="loading" :rules="rules" :model="space" ref="form" size="large" autocomplete="off">
    <view style="display: flex; padding-top: 10px"></view>
    <el-form-item prop="spaceName">
      <div style="display: flex">
        <span style="padding-right: 10px;width: 100px; font-size: 18px">空间名称</span>
        <el-input v-model="space.spaceName" style="width: 600px" placeholder="空间名称" />
        <view style="padding-right: 50px" />
      </div>
    </el-form-item>

    <el-form-item prop="spaceLever">
      <div style="display: flex">
        <span style="padding-right: 10px;width: 100px; font-size: 18px">空间等级</span>
        <el-select
          class="my-custom-popper"
          style="width: 600px"
          placeholder="空间等级"
          v-model="spaceLeverSelect"
        >
          <el-option
            v-for="item in SPACE_LEVEL_OPTIONS"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            @click="space.spaceLever=Number(item.value)"
          />
        </el-select>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 100%" @click="submitSave(form)" type="primary">提交</el-button>
    </el-form-item>
    <el-card title="">
      <template #header>空间等级介绍</template>
      <p v-for="(item,index) in spaceLevelList" :key="index" class="text item">
        {{item.text}}:大小{{formatSize(item.maxSize)}},图片可存储数量{{item.maxCount}}
      </p>
      <template #footer>如需升级空间，请联系管理员</template>
    </el-card>
  </el-form>
</div>
</template>
<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import {
  SPACE_LEVEL_MAP,
  SPACE_LEVEL_OPTIONS,
  SPACE_TYPE_ENUM, SPACE_TYPE_MAP,
  type SpaceData,
  type SpaceLeverData
} from '@/types/space'
import { ElMessage, type FormInstance } from 'element-plus'
import { SpaceCreateAPI, SpaceEditAPI, SpaceLeverListAPI, SpaceUserFindByIdAPI } from '@/service/SpaceController'
import { useRoute } from 'vue-router'
import { formatSize } from '@/types/picture'

interface Category {
  value:string
}
const loading = ref<boolean>(false)
// 尽量不要定义空的对象
const space = ref<SpaceData>({
  spaceType: 0,
  createdAt: '',
  editAt: '',
  id: '',
  maxCount: 0,
  maxSize: 0,
  spaceLever: 0,
  spaceName: '',
  totalCount: 0,
  totalSize: 0,
  updatedAt: '',
  userId: ''
})
//空间等级介绍
const spaceLevelList =ref<SpaceLeverData[]>([])
//表单校验
const form = ref<FormInstance>()
//表单校验规则
const rules = {
  spaceName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  spaceLever: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}
//提交普通用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance| undefined) => {
  console.log(space.value)
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交信息中,请勿重复保存',
        type: 'success'
      })
      saveSpace()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

const spaceLeverSelect  = ref<string>()

const saveSpace = async () => {
  loading.value =true
  try {
    if (!space.value.id || space.value.id==='') { //id不存在就是创建
      const res = await SpaceCreateAPI({
        spaceName: space.value.spaceName,
        spaceLevel: space.value.spaceLever,
        spaceType:spaceType.value
      })
      if (res.code == 0) {
        ElMessage.success('创建成功!')
      }
    }else { //更新
      const res = await SpaceEditAPI({
        id: space.value.id,
        spaceName: space.value.spaceName,
        spaceLever: space.value.spaceLever,
      })
      if (res.code == 0) {
        ElMessage.success('保存成功!')
      }
    }
  }finally {
    loading.value =false
  }

}
const createFilter = (queryString: string) => {
  return (categoryItem: string) => {
    return categoryItem.toLowerCase().includes(queryString.toLowerCase());
  };
};

const convertToCategoryArray = (strArray: string[]): Category[] => {
  return strArray.map(item => ({ value: item }));
};

const route=useRoute()
const getOldSpace = async () => {
  const id  = route.query?.id as string
  if (id) { //如果传来了新id 直接搜索
    const res = await SpaceUserFindByIdAPI(id)
    if (res.code == 0) {
      space.value = res.data.data
      spaceLeverSelect.value = SPACE_LEVEL_MAP[res.data.data.spaceLever]
    }
  }
}
const getSpaceLevelList = async () => {
  const res =  await SpaceLeverListAPI()
  if (res.code == 0) {
    spaceLevelList.value = res.data.records
  }
}
onMounted(async () => {
  await getOldSpace()
  await getSpaceLevelList()
})

// 空间类别
const spaceType = computed(() => {
  if (route.query?.type) {
    return Number(route.query.type)
  }
  return SPACE_TYPE_ENUM.PRIVATE
})


</script>


<style scoped lang="css">
#space_add{
  max-width: 720px;
  margin:0 auto;
}
 :deep(.el-popper is-light el-select__popper) {
  margin-left: 50px!important;
}

</style>