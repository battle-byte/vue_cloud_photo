<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在重新编辑编辑人员成员 ID: {{ props.id }}
      </div>
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        编辑人员成员名称: {{ editorialMessage.eName }}
      </div>
    </div>

    <el-form :rules="rules" :model="editorialMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >成员照片照片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              建议宽高比例 88:135
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="editorialPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image
            style=" padding-left: 5px"
            :src="editorialMessage.ePhoto"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="editorialName">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">成员名称</span>
          <el-input v-model="editorialMessage.eName" style="width: 1000px" placeholder="成员名称" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the editorial
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="comment">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">简介</span>
          <el-input v-model="editorialMessage.comment" style="width: 1000px" placeholder="简介" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="sections">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Email</span>
          <el-input v-model="editorialMessage.sections" style="width: 1000px" placeholder="sections" />
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
import type { EditorialEditParam } from '@/types/Editorial'
import { EditEditorialBaseAPI, SelectEditorialByPageAPI, selectEditorialOneAPI } from '@/service/EditorialController'

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
  // urls.value.push(res.data)
  editorialMessage.value.ePhoto! = res.data
}


//编辑人员泛型
const editorialMessage = ref<EditorialEditParam>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  eName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  ePhoto: [
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
  sections: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交编辑人员成员前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交编辑人员成员内容,切勿重复保存',
        type: 'success'
      })
      updateEditorial()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取编辑人员成员基础内容
const getEditorialOne = async () => {
  console.log('props.id', props.id)
  let res = await selectEditorialOneAPI(props.id)
  if (res.code === 0) {
    editorialMessage.value.eid = res.data.eid
    editorialMessage.value.ePhoto = res.data.ePhoto
    editorialMessage.value.eName = res.data.eName
    editorialMessage.value.comment = res.data.comment
    editorialMessage.value.sections = res.data.sections
  }
  console.log(res.data)
}

const updateEditorial = async () => {
  const res = await EditEditorialBaseAPI({
    ...editorialMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('编辑人员成员信息修改成功!')
    router.push({
      path: '/back/editorial/EditorialList'
    })
  }
}

onMounted(() => {
  getEditorialOne()
})
</script>

<style scoped lang="less"></style>
