<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在创建新的文章
      </div>
    </div>
    <el-form :rules="rules" :model="articleMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >封面图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              封面图片选则尽量不要超过2MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <view style="display: flex">
          <div class="block">
            <span class="demonstration" style="padding-right: 10px; font-size: 18px"
              >文章发布时间</span
            >
            <el-date-picker
              v-model="articleMessage.publishTime"
              type="datetime"
              placeholder="文章发布时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <view style="padding-left: 50px"></view>
        </view>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="activeAvatar" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 200px; height: 200px; padding-left: 5px"
            :src="articleMessage.postAvatar"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="title">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">文章标题</span>
          <el-input v-model="articleMessage.title" style="width: 1000px" placeholder="文章标题" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the article
          </el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">文章简介</span>
          <el-input v-model="articleMessage.intro" style="width: 1000px" placeholder="文章简介" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">阅读量</span>
          <el-input
            v-model.number="articleMessage.views"
            type="number"
            style="width: 1000px"
            placeholder="阅读量"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">下载量</span>
          <el-input
            v-model.number="articleMessage.upload"
            type="number"
            style="width: 1000px"
            placeholder="下载量"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">引用量</span>
          <el-input
            v-model.number="articleMessage.kuote"
            type="number"
            style="width: 1000px"
            placeholder="引用量"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">收费模式</span>
          <el-input
            v-model.number="articleMessage.model"
            style="width: 1000px"
            placeholder="收费模式"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">状态</span>
          <el-input v-model="articleMessage.status" style="width: 1000px" placeholder="状态" />
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
import type { UpdateArticle } from '@/types/Article'
import {
  EditArticleBaseAPI,
  SaveArticleBaseAPI,
  SelectArticleByIdAPI
} from '@/service/ArticleController'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'


//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  const res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    articleMessage.value.postAvatar! = res.data
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

//图片路径
const urls = ref<string[]>([])

//活动泛型
const articleMessage = ref<UpdateArticle>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  title: [{ required: true, message: '文章标题不能为空', trigger: 'change' }],
  intro: [
    {
      required: true,
      message: '文章简介不能为空',
      trigger: 'change'
    }
  ],
  author: [
    {
      required: true,
      message: '文章内容不能为空',
      trigger: 'change'
    }
  ],
  model: [
    {
      required: true,
      message: '活动所属范围不能为空',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '活动所属范围不能为空',
      trigger: 'change'
    }
  ]
}

//提交文章前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交文章内容,切勿重复保存',
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
    articleMessage.value.pid = res.data
    console.log('ID', res.data)
  }
}

// 保存文章内容
const SaveArticle = async () => {
  console.log(articleMessage.value)
  const res = await SaveArticleBaseAPI({
    pid: articleMessage.value.pid,
    title: articleMessage.value.title,
    intro: articleMessage.value.intro,
    author: articleMessage.value.author,
    doi: articleMessage.value.doi,
    publishTime: articleMessage.value.publishTime,
    postAvatar: articleMessage.value.postAvatar,
    views: articleMessage.value.views,
    upload: articleMessage.value.upload,
    kuote: articleMessage.value.kuote,
    model: articleMessage.value.model,
    status: articleMessage.value.status
  })
  if (res.code == 0) {
    ElMessage.success('文章创建成功!')
    router.push({
      path: '/back/article/ArticleList'
    })
  }
}

onMounted(async () => {
  await onlyPid()
})
</script>

<style scoped lang="less"></style>
