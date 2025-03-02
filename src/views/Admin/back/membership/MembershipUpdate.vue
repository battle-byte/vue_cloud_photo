<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在重新编辑合作伙伴 ID: {{ props.id }}
      </div>
    </div>

    <el-form :rules="rules" :model="membershipMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >合作伙伴图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              建议宽高比例 177(宽)∶215(高)
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="img" style="background-color: #e4e8f1">
        <div>
          <el-image style="padding-left: 5px" :src="membershipMessage.img" fit="fill" />
        </div>
      </el-form-item>
      <el-form-item prop="url">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">合作伙伴路径</span>
          <el-input
            v-model="membershipMessage.url"
            style="width: 1000px"
            placeholder="合作伙伴路径"
          />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the Membership
          </el-button>
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
import {
  EditMembershipBaseAPI,
  SelectMembershipByPageAPI,
  selectMembershipOneAPI
} from '@/service/MembershipController'
import type { MembershipBaseEditParam } from '@/types/Membership'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//编辑人员图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到阿里云
  ElMessage({
    message: '上传中,请耐心等待加载中',
    type: 'success'
  })
  // urls.value.push(res.data)
  if (res.code === 0) {
    ElMessage({
      message: '上传成功,请耐心等待加载中',
      type: 'success'
    })
    // urls.value.push(res.data)
    membershipMessage.value.img! = res.data
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
  // urls.value.push(res.data)
}

//编辑人员泛型
const membershipMessage = ref<MembershipBaseEditParam>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  url: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  img: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交合作伙伴前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交合作伙伴内容,切勿重复保存',
        type: 'success'
      })
      updateMembership()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取合作伙伴基础内容
const getMembershipOne = async () => {
  let res = await selectMembershipOneAPI(props.id)
  if (res.code === 0) {
    membershipMessage.value = res.data
  }
}

const updateMembership = async () => {
  const res = await EditMembershipBaseAPI({
    ...membershipMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('合作伙伴信息修改成功!')
    router.push({
      path: '/back/membership/MembershipList'
    })
  }
}

onMounted(() => {
  getMembershipOne()
})
</script>

<style scoped lang="less"></style>
