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
            >封面图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              封面图片选则尽量不要超过2MB
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
            style="width: 200px; height: 200px; padding-left: 5px"
            :src="journalsMessage.journalsPhoto"
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
          <span style="padding-right: 10px; font-size: 18px">ELSSN</span>
          <el-input v-model="journalsMessage.elssn" style="width: 1000px" placeholder="ELSSN" />
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
import type { JournalsQueryVO, JournalsSaveParam } from '@/types/Journals'
import {
  EditJournalsAPI,
  SaveJournalsAPI,
  SelectJournalsByIdAPI
} from '@/service/JournalsController'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//期刊图片上传
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

//期刊泛型
const journalsMessage = ref<JournalsQueryVO>({})

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
      EditJournals()
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

//获取期刊基础内容
const getJournalsOne = async () => {
  let res = await SelectJournalsByIdAPI(props.id)
  if (res.code === 0) {
    journalsMessage.value = res.data
  }
}

// 保存期刊内容
const EditJournals = async () => {
  const res = await EditJournalsAPI({
    ...journalsMessage.value
  })
  if (res.code === 0) {
    ElMessage.success('期刊修改成功!')
    router.push({
      path: '/back/journals/JournalsList'
    })
  }
}

onMounted(async () => {
  await getJournalsOne()
})
</script>

<style scoped lang="less"></style>
