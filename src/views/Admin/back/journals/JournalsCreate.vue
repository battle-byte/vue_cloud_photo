<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在创建新的期刊
      </div>
    </div>
    <el-form :rules="rules" :model="journalsMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >首页长条封面图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例:340(宽) × 76(高)
            </div>
          </template>
        </el-upload>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addBigPhoto"
          :multiple="false"
          style="margin-left: 20px"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >大背景图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例:840 × 360
            </div>
          </template>
        </el-upload>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addSmallPhoto"
          :multiple="false"
          style="margin-left: 40px"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >小封面图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例 5(宽) : 7(高)
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item prop="launched">
        <view style="display: flex">
          <div class="block">
            <span class="demonstration" style="padding-right: 10px; font-size: 18px">Launched</span>
            <el-date-picker
              v-model="journalsMessage.launched"
              type="datetime"
              placeholder="期刊发布时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <view style="padding-left: 50px"></view>
        </view>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="journalsPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 345px; height: 76px; padding-left: 5px"
            :src="journalsMessage.journalsPhoto"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="bigImage" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 847.5px; height: 358.8px; padding-left: 5px"
            :src="journalsMessage.bigImage"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="smallImage" style="background-color: #e4e8f1">
        <div>
          <el-image
            style="width: 157.5px; height: 217.73px; padding-left: 5px"
            :src="journalsMessage.smallImage"
            fit="fill"
          />
        </div>
      </el-form-item>
      <el-form-item prop="journalsName">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">期刊名称</span>
          <el-input
            v-model="journalsMessage.journalsName"
            style="width: 1000px"
            placeholder="期刊名称"
          />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the journals
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="elssn">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">ISSN</span>
          <el-input v-model="journalsMessage.elssn" style="width: 1000px" placeholder="ISSN" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="eic">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">EIC</span>
          <el-input v-model="journalsMessage.eic" style="width: 1000px" placeholder="EIC" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="frequency">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Frequency</span>
          <el-input
            v-model="journalsMessage.frequency"
            style="width: 1000px"
            placeholder="Frequency"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="apc">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">APC</span>
          <el-input v-model="journalsMessage.apc" style="width: 1000px" placeholder="引用量" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="publishingModel">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Publishing Model</span>
          <el-input
            v-model="journalsMessage.publishingModel"
            style="width: 1000px"
            placeholder="Publishing Model"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="peerReviewModel">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Peer Review Model</span>
          <el-input
            v-model="journalsMessage.peerReviewModel"
            style="width: 1000px"
            placeholder="Peer Review Model"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="indexArchiving">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Index & Archiving</span>
          <el-input
            v-model="journalsMessage.indexArchiving"
            style="width: 1000px"
            placeholder="Index & Archiving"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">Email</span>
          <el-input v-model="journalsMessage.email" style="width: 1000px" placeholder="Email" />
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
import type { JournalsSaveParam } from '@/types/Journals'
import { SaveJournalsAPI } from '@/service/JournalsController'

//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    journalsMessage.value.journalsPhoto! = res.data
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

const addBigPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    journalsMessage.value.bigImage! = res.data
    ElMessage({
      message: '上传大背景图成功,请耐心等待加载中',
      type: 'success'
    })
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}

const addSmallPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    journalsMessage.value.smallImage! = res.data
    ElMessage({
      message: '上传小封面图成功,请耐心等待加载中',
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
const journalsMessage = ref<JournalsSaveParam>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  // 后端自动处理图片问题
  journalsName: [
    {
      required: true,
      message: '期刊名称不能为空',
      trigger: 'change'
    }
  ],
  elssn: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  eic: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  frequency: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  apc: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  publishingModel: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  peerReviewModel: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  launched: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  indexArchiving: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  journalsPhoto: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  bigImage: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  smallImage: [
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

//提交期刊前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交期刊内容,切勿重复保存',
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
    journalsMessage.value.jid = res.data
  }
}

// 保存期刊内容
const SaveArticle = async () => {
  const res = await SaveJournalsAPI({
    ...journalsMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('期刊创建成功!')
    router.push({
      path: '/back/journals/JournalsList'
    })
  }
}

onMounted(async () => {
  await onlyPid()
})
</script>

<style scoped lang="less"></style>
