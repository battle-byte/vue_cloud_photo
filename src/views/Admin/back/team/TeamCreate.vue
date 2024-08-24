<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在创建新的团队成员
      </div>
    </div>
    <el-form :rules="rules" :model="teamMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >成员照片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              成员照片选则尽量不要超过2MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="teamPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 200px; height: 200px; padding-left: 5px"
            :src="teamMessage.tPhoto"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="teamName">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">成员名称</span>
          <el-input v-model="teamMessage.tName" style="width: 1000px" placeholder="成员名称" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the team
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="comment">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">简介</span>
          <el-input v-model="teamMessage.comment" style="width: 1000px" placeholder="简介" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="email">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Email</span>
          <el-input v-model="teamMessage.email" style="width: 1000px" placeholder="email" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
    </el-form>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, type FormInstance, type UploadRequestOptions } from 'element-plus'
import 'bytemd/dist/index.css'
import router from '@/router'
import { uploadImage } from '@/service/UpLoadFile'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'
import type { TeamSaveParam } from '@/types/Team'
import { SaveTeamBaseAPI } from '@/service/TeamController'

//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    teamMessage.value.tPhoto! = res.data
    ElMessage({
      message: '上传成功,请耐心等待加载中',
      type: 'success'
    })
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}

//活动泛型
const teamMessage = ref<TeamSaveParam>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  tName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  tPhoto: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  comment: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交团队成员前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交团队成员内容,切勿重复保存',
        type: 'success'
      })
      SaveArticle()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

// 获取唯一索引值 防止重复插入
const onlyPid = async () => {
  const res = await GenerateOnlyIdAPI()
  if (res.code === 0) {
    teamMessage.value.tid = res.data
  }
}

// 保存团队成员内容
const SaveArticle = async () => {
  const res = await SaveTeamBaseAPI({
    ...teamMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('团队成员创建成功!')
    router.push({
      path: '/back/team/TeamList'
    })
  }
}

onMounted(async () => {
  await onlyPid()
})
</script>

<style scoped lang="less"></style>
