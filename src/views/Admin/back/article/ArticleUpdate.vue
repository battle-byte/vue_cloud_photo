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
      <!--      <el-form-item v-model="articleMessage.school" prop="school">-->
      <!--        <span class="demonstration" style="padding-right: 10px; font-size: 18px">活动范围</span>-->
      <!--        <el-radio-group v-model="articleMessage.school" style="font-size: 20px" class="ml-4">-->
      <!--          <span class="demonstration" style="padding-right: 15px; font-size: 16px">公共</span>-->
      <!--          <el-radio value="0"></el-radio>-->

      <!--          <span class="demonstration" style="padding-right: 15px; font-size: 16px"-->
      <!--            >山东交通学院</span-->
      <!--          >-->
      <!--          <el-radio value="1"></el-radio>-->

      <!--          <span class="demonstration" style="padding-right: 15px; font-size: 16px"-->
      <!--            >山东女子学院</span-->
      <!--          >-->
      <!--          <el-radio value="2"></el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
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
      <!--      <el-form-item>-->
      <!--        <div style="display: flex">-->
      <!--          <span style="padding-right: 10px; font-size: 18px">文章作者</span>-->
      <!--          <el-input-->
      <!--            v-model="articleMessage.author"-->
      <!--            style="width: 1000px"-->
      <!--            placeholder="文章作者"-->
      <!--          />-->
      <!--          <view style="padding-right: 50px" />-->
      <!--        </div>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">阅读量</span>
          <el-input v-model.number="articleMessage.views" type="number" style="width: 1000px" placeholder="阅读量" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">下载量</span>
          <el-input v-model.number="articleMessage.upload" type="number" style="width: 1000px" placeholder="下载量" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">引用量</span>
          <el-input v-model.number="articleMessage.kuote"  type="number" style="width: 1000px" placeholder="引用量" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item>
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">收费模式</span>
          <el-input v-model.number="articleMessage.model" style="width: 1000px" placeholder="收费模式" />
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
    articleMessage.value.pid = res.data.pid
    articleMessage.value.title = res.data.title
    articleMessage.value.intro = res.data.intro
    articleMessage.value.author = res.data.author
    articleMessage.value.doi = res.data.doi
    articleMessage.value.publishTime = res.data.publishTime
    articleMessage.value.postAvatar = res.data.postAvatar
    articleMessage.value.views = res.data.views
    articleMessage.value.upload = res.data.upload
    articleMessage.value.kuote = res.data.kuote
    articleMessage.value.model = res.data.model
    articleMessage.value.status = res.data.status
  }
  console.log(res.data)
}

//
const updateArticle = async () => {
  console.log(articleMessage.value)
  const res = await EditArticleBaseAPI({
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
