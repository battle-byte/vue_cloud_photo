<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在重新编辑新闻 ID: {{ props.id }}
      </div>
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        新闻标题: {{ newsMessage.title }}
      </div>
    </div>

    <el-form :rules="rules" :model="newsMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >新闻照片照片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              新闻照片选则尽量不要超过2MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <view style="display: flex">
          <div class="block">
            <span class="nTime" style="padding-right: 10px; font-size: 18px">新闻发布时间</span>
            <el-date-picker
              v-model="newsMessage.nTime"
              type="datetime"
              placeholder="新闻发布时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <view style="padding-left: 50px"></view>
        </view>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="newsPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 200px; height: 200px; padding-left: 5px"
            :src="newsMessage.photo"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="title">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">新闻标题</span>
          <el-input v-model="newsMessage.title" style="width: 1000px" placeholder="新闻标题" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the news
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="comment">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">简介</span>
          <el-input v-model="newsMessage.comment" style="width: 1000px" placeholder="简介" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="views">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">浏览量</span>
          <el-input
            v-model.number="newsMessage.views"
            type="number"
            style="width: 1000px"
            placeholder="默认为0"
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
import { EditNewsBaseAPI, SelectNewsByPageAPI, selectNewsOneAPI } from '@/service/NewsController'
import type { NewsBaseEditParam } from '@/types/News'


// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})


//编委会图片上传
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
    newsMessage.value.photo! = res.data
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
  // urls.value.push(res.data)
}

//编委会泛型
const newsMessage = ref<NewsBaseEditParam>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  title: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  photo: [
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
  nTime: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  views: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交新闻前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交新闻内容,切勿重复保存',
        type: 'success'
      })
      updateNews()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取新闻基础内容
const getNewsOne = async () => {
  let res = await selectNewsOneAPI(props.id)
  if (res.code === 0) {
    newsMessage.value.nid = res.data.nid
    newsMessage.value.photo = res.data.photo
    newsMessage.value.title = res.data.title
    newsMessage.value.comment = res.data.comment
    newsMessage.value.views = res.data.views
    newsMessage.value.nTime = res.data.nTime
  }
}

const updateNews = async () => {
  const res = await EditNewsBaseAPI({
    ...newsMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('新闻信息修改成功!')
    router.push({
      path: '/back/news/NewsList'
    })
  }
}

onMounted(() => {
  getNewsOne()
})
</script>

<style scoped lang="less"></style>
