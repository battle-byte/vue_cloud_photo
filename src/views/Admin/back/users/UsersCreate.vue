<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在创建新的用户
      </div>
    </div>
    <el-form :rules="rules" :model="usersMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >用户照片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例 165(宽)∶127高)
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <view style="display: flex">
          <div class="block">
            <span class="nTime" style="padding-right: 10px; font-size: 18px">用户创建时间</span>
            <el-date-picker
              v-model="usersMessage.avatar"
              type="datetime"
              placeholder="用户创建时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <view style="padding-left: 50px"></view>
        </view>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="photo" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="padding-left: 5px"
            :src="usersMessage.avatar"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">用户账号</span>
          <el-input v-model="usersMessage.username" style="width: 1000px" placeholder="用户账号" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the users
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="name">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">用户名称</span>
          <el-input v-model="usersMessage.nickname" style="width: 1000px" placeholder="用户名称" />
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
import { FileLoadAPI } from '@/service/UpLoadFile'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'
import { CreateUsersAPI, } from '@/service/UsersController'
import type { CreateSysUserRequest } from '@/types/Users'

//用户图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await FileLoadAPI(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    usersMessage.value.avatar = res.data.url
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

//用户泛型
const usersMessage = ref<CreateSysUserRequest>({
  avatar: '',
  code: '',
  nickname: '',
  password: '',
  uid: '',
  username: '',
  uuid: ''
})

//表单校验
const form = ref<FormInstance|undefined>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  name: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  image: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  username: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
  ,
  score: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交用户内容,切勿重复保存',
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
    usersMessage.value.uid = res.data.id
  }
}

// 保存用户内容
const SaveArticle = async () => {
  const res = await CreateUsersAPI({
    ...usersMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('用户创建成功!')
    router.push({
      path: '/back/users/UsersList'
    })
  }
}

onMounted(async () => {
  await onlyPid()
})
</script>

<style scoped lang="less"></style>
