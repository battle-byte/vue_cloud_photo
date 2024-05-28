<template>
  <view class="Admin">
    <el-form :rules="rules" :model="periodicalMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addPhoto"
          :multiple=false
        >
          <el-button style="padding-bottom: 15px;width: 200px" type="primary">期刊封面图片上传</el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 18px">
              图片选则不要超过2MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <view style="display: flex">
          <div class="block">
            <span class="demonstration" style="padding-right: 10px;font-size: 18px">发表日期</span>
            <el-date-picker
              v-model="beginTime"
              type="datetime"
              placeholder="发表日期"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </view>
      </el-form-item>
      <!--      <el-form-item v-model="activeMessage.school" prop="school">-->
      <!--        <span class="demonstration" style="padding-right: 10px;font-size: 18px">活动范围</span>-->
      <!--        <el-radio-group v-model="activeMessage.school" style="font-size: 20px" class="ml-4">-->

      <!--          <span class="demonstration" style="padding-right: 15px;font-size: 16px">公共</span>-->
      <!--          <el-radio value="0"></el-radio>-->

      <!--          <span class="demonstration" style="padding-right: 15px;font-size: 16px">山东交通学院</span>-->
      <!--          <el-radio value="1"></el-radio>-->

      <!--          <span class="demonstration" style="padding-right: 15px;font-size: 16px">山东女子学院</span>-->
      <!--          <el-radio value="2"></el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->

      <view style="display: flex;padding-top: 10px"></view>
      <el-form-item prop="activeAvatar" style="background-color: #e4e8f1">
        <!--          <div v-if="url" style="padding-left: 6px">-->
        <!--            <CloseBold-->
        <!--              @click="removePhoto(url)"-->
        <!--              style="padding-left: 1px;display: flex;width: 1em;height: 1em;margin-right: 1px;font-size: 25px;background-color: #f3f3f3" />-->
        <!--          </div>-->
        <el-image style="width: 200px; height: 200px;padding-left: 5px;" :src="urls" fit="fill" />
      </el-form-item>
      <el-form-item prop="periodicalName">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">期刊名称</span>
          <el-input
            v-model="periodicalMessage.periodicalName"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
          <view style="padding-right: 50px" />

          <el-button style="width: 150px;" @click="sbumit(form)"
                     class="submit-button"
                     type="primary">
            保存期刊
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="elSSN">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">elSSN</span>
          <el-input
            v-model="periodicalMessage.elSSN"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="eIC">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">EiC</span>
          <el-input
            v-model="periodicalMessage.eIC"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="frequency">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">Frequency</span>
          <el-input
            v-model="periodicalMessage.frequency"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="APC">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">APC</span>
          <el-input
            v-model="periodicalMessage.APC"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="publishingModel">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">Publishing Mode</span>
          <el-input
            v-model="periodicalMessage.publishingModel"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="peerReviewModel">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">Peer Review Model</span>
          <el-input
            v-model="periodicalMessage.peerReviewModel"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="indexArchiving">
        <div style="display: flex">
          <span style="padding-right: 10px;font-size: 18px">Index & Archiving</span>
          <el-input
            v-model="periodicalMessage.indexArchiving"
            style="width: 1000px;"
            placeholder=""
            :maxlength="128"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
    </el-form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance, type UploadRequestOptions } from 'element-plus'
import 'bytemd/dist/index.css'
import router from '@/router'
import { uploadImage } from '@/service/UpLoadFile'
import type { periodical } from '@/types/Periodical'
import { submitPeriodical } from '@/service/PeriodicalController'

const beginTime = ref<string>('')

//活动图片上传
const addPhoto = async (files: any) => {

  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData)  // 上传到阿里云
  urls.value = res.data
}


//图片路径
const urls = ref<string>()

const periodicalMessage = ref<periodical>({})

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  periodicalName: [{ required: true, message: '不能为空', trigger: 'change' }],
  school: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  elSSN: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  eIC: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  frequency: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  APC: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  publishingModel: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  peerReviewModel: [{
    required: true, message: '不能为空', trigger: 'change'
  }],
  indexArchiving: [{
    required: true, message: '不能为空', trigger: 'change'
  }]
}


//提交文章前的校验并且校验成功后
const sbumit = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交选项,切勿重复保存',
        type: 'success'
      })
      getTestActive()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

// 提交期刊方法
const getTestActive = async () => {
  console.log(periodicalMessage.value)
  const res = await submitPeriodical({
    periodicalName: periodicalMessage.value.periodicalName,
    elSSN: periodicalMessage.value.elSSN,
    eic: periodicalMessage.value.eIC,
    frequency: periodicalMessage.value.frequency,
    apc: periodicalMessage.value.APC,
    publishingModel: periodicalMessage.value.publishingModel,
    peerReviewModel: periodicalMessage.value.peerReviewModel,
    publishTime: beginTime.value,
    indexArchiving: periodicalMessage.value.indexArchiving,
    periodicalPhoto: urls.value
  })
  if (res.code == 0) {
    ElMessage.success('修改成功！')
    router.push({
      path: '/index/periodicalList'
    })
  }
}
</script>

<style lang="less">

.bytemd {
  height: 750px;
}

.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}


</style>
