<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在编辑普通用户 ID: {{ props.id }}
      </div>
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        用户名: {{ usersMessage.username }}
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
            >普通用户照片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例 165(宽)∶127高)
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="usersPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image
            style=" padding-left: 5px"
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

      <el-form-item prop="nickname">
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
import { FileLoadAPI, FileLoadBytesAPi } from '@/service/UpLoadFile'
import type { SysUserUpdatePasswordRequest, SysUserUpdateRequest } from '@/types/Users'
import { SysUserFindByIdAPI, SysUserUpdateAPI } from '@/service/UsersController'




// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})


// 读取文件为 ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

//用户图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  ElMessage({
    message: '上传中,请耐心等待',
    type: 'success'
  })
  // let arrayBuffer = await readFileAsArrayBuffer(files.file);
  fromData.append('file', files.file)
  let res = await FileLoadAPI(fromData) // 上传图片
  // let res = await FileLoadBytesAPi(arrayBuffer)
  // urls.value.push(res.data)
  if (res.code === 0) {
    ElMessage({
      message: '上传成功,等待加载中',
      type: 'success'
    })
    // urls.value.push(res.data)
    usersMessage.value.avatar! = res.data.url
    console.log(res.data)
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
  // urls.value.push(res.data)
}

//编辑人员泛型
const usersMessage = ref<SysUserUpdateRequest>({})

//表单校验
const form = ref<FormInstance>()

//表单校验规则
const rules = {
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

//提交普通用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance| undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交普通用户内容,切勿重复保存',
        type: 'success'
      })
      updateUsers()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取普通用户基础内容
const getUsersOne = async () => {
  let res = await SysUserFindByIdAPI(props.id)
  if (res.code === 0) {
    usersMessage.value.uid = props.id
    usersMessage.value.nickname  = res.data.nickname
    usersMessage.value.username= res.data.username
    usersMessage.value.avatar= res.data.avatar
  }
}

const updateUsers = async () => {
  const res = await SysUserUpdateAPI({
    ...usersMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('用户信息修改成功!')
    router.push({
      path: '/back/users/UsersList'
    })
  }
}

onMounted(() => {
  getUsersOne()
})
</script>

<style scoped lang="less"></style>
