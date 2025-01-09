<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在重新编辑文章 ID: {{ props.id }}
      </div>
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        文章标题: {{ articleMessage.title }}
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
              推荐比例 180(宽)∶139(高)
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
          <el-image style="padding-left: 5px" :src="articleMessage.postAvatar" fit="fill" />
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
      <el-form-item prop="intro">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">文章简介</span>
          <el-input v-model="articleMessage.intro" style="width: 1000px" placeholder="文章简介" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="mainIntro">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">主要概括</span>
          <el-input
            v-model="articleMessage.mainIntro"
            style="width: 1000px"
            placeholder="主要概括"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="author">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">文章作者</span>
          <el-input v-model="articleMessage.author" style="width: 1000px" placeholder="文章作者" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="doi">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">DOI</span>
          <el-input v-model="articleMessage.doi" style="width: 1000px" placeholder="DOI" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="views">
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
      <el-form-item prop="upload">
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
      <el-form-item prop="kuote">
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
      <el-form-item prop="volume">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">期数</span>
          <el-input
            v-model.number="articleMessage.volume"
            type="number"
            style="width: 1000px"
            placeholder="期数"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="model">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">收费模式</span>
          <el-input
            v-model="articleMessage.model"
            style="width: 1000px"
            placeholder="收费模式"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="status">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">状态</span>
          <el-input v-model="articleMessage.status" style="width: 1000px" placeholder="状态" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="buyaddr">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">购买外部链接</span>
          <el-input
            v-model="articleMessage.buyaddr"
            style="width: 1000px"
            placeholder="购买外部链接"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="logoaddr">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">logo外部链接</span>
          <el-input
            v-model="articleMessage.logoaddr"
            style="width: 1000px"
            placeholder="logo外部链接"
          />
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
import { EditArticleBaseAPI, SelectArticleByIdAPI } from '@/service/ArticleController'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到阿里云
  // urls.value.push(res.data)
  articleMessage.value.postAvatar! = res.data
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
  title: [{ required: true, message: '不能为空', trigger: 'change' }],
  intro: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  author: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  doi: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  model: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  mainIntro: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  volume: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  buyaddr: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  logoaddr: [
    {
      required: true,
      message: '不能为空',
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
      updateArticle()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取文章基础内容
const getArticleOne = async () => {
  console.log('props.id', props.id)
  let res = await SelectArticleByIdAPI(props.id)
  if (res.code === 0) {
    articleMessage.value = res.data
  }
  console.log(res.data)
}

//
const updateArticle = async () => {
  console.log(articleMessage.value)
  const res = await EditArticleBaseAPI({ ...articleMessage.value })
  if (res.code == 0) {
    ElMessage.success('文章修改成功!')
    router.push({
      path: '/back/article/ArticleList'
    })
  }
}

onMounted(() => {
  getArticleOne()
})
</script>

<style scoped lang="less"></style>
