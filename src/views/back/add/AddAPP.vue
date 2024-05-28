<template>
  <view class="AddAPP">
    <span style="font-size: 40px; padding-bottom: 20px; border-bottom: 20px">创建应用</span>
    <view style="display: flex; font-size: 40px; padding-bottom: 20px; border-bottom: 20px"></view>
    <el-form :rules="rules" :model="AppMessage" ref="form" size="large" autocomplete="off">
      <el-form-item v-model="AppMessage.appName" prop="appName">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 25px">应用名称</span>
          <el-input
            v-model="AppMessage.appName"
            style="width: 1000px"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
          <view style="padding-right: 50px" />

          <el-button
            style="width: 150px"
            @click="submit(form)"
            class="submit-button"
            type="primary"
          >
            保存应用
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="appDesc">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 25px">应用描述</span>
          <el-input
            v-model="AppMessage.appDesc"
            style="width: 1000px"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item v-model="AppMessage.appType" prop="appType">
        <span class="demonstration" size="large" style="padding-right: 10px; font-size: 25px"
          >应用类型</span
        >
        <el-select
          v-model="AppMessage.appType"
          class="m-2"
          placeholder="选择应用类型"
          style="width: 500px"
        >
          <el-option
            style="font-size: 18px"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="scoringStrategy">
        <span class="demonstration" style="padding-right: 10px; font-size: 25px">评分策略</span>
        <el-select
          v-model="AppMessage.scoringStrategy"
          class="m-2"
          placeholder="选择评分策略"
          style="width: 500px"
        >
          <el-option
            style="font-size: 18px"
            v-for="item in optionsScoringStrategy"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >应用图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 18px">图片选则不要超过2MB</div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item>
        <el-image
          style="width: 150px; height: 150px; padding-left: 5px"
          :src="urls"
          fit="fill"
        />
      </el-form-item>
    </el-form>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, ref } from 'vue'

import { ElMessage } from 'element-plus'

import { addAppAPI } from '@/service/AppController'
import type { AppAddDTO } from '@/types/App'
import { uploadImage } from '@/service/UpLoadFile'
import router from '@/router'

const AppMessage = ref<AppAddDTO>([])

//确认提交表单
const submitAdd = async () => {
  const res = await addAppAPI({
    appName: AppMessage.value.appName,
    appDesc: AppMessage.value.appDesc,
    appIcon: urls.value,
    appType: AppMessage.value.appType,
    scoringStrategy: AppMessage.value.scoringStrategy
  })
  if (res.code == 0) {
    ElMessage.success('应用创建成功')
    router.push({
      path: '/index/home'
    })
  }
}

//图片路径
const urls = ref<string>()

//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到阿里云
  urls.value = res.data
}

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  appName: [
    { required: true, message: '应用名称不能为空', trigger: 'change' },
    {
      min: 3,
      max: 18,
      message: '应用名称必须为3-18位',
      trigger: 'change'
    }
  ],
  appDesc: [
    { required: true, message: '应用描述不能为空', trigger: 'change' },
    {
      min: 5,
      max: 40,
      message: '应用描述必须为5-40位',
      trigger: 'change'
    }
  ],
  scoringStrategy: [{ required: true, message: '应用描述不能为空', trigger: 'change' }],
  appType: [{ required: true, message: '应用描述不能为空', trigger: 'change' }]
}

const options = [
  {
    value: 0,
    label: '得分类'
  },
  {
    value: 1,
    label: '测试类'
  }
]

const optionsScoringStrategy = [
  {
    value: 0,
    label: '自定义'
  },
  {
    value: 1,
    label: 'AI'
  }
]

//提交文章前的校验并且校验成功后
const submit = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交选项,切勿重复保存',
        type: 'success'
      })
      submitAdd()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}
</script>

<style scoped lang="less"></style>
