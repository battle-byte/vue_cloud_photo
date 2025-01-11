<template>
  <view class="Admin">
    <div style="width: 1000px">
      <div style="margin-bottom: 20px; background-color: #f2f2f2; font-size: 20px">
        正在重新编辑首页展示内容
      </div>
    </div>

    <el-form :rules="rules" :model="indexMessage" ref="form" size="large" autocomplete="off">
      <el-form-item>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addBackground"
          :multiple="false"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >背景图片上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              复杂图片推荐:1920×380
            </div>
          </template>
        </el-upload>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addLogo"
          :multiple="false"
          style="margin-left: 20px"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >网站左上角logo上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例:270(宽) × 30(高)
            </div>
          </template>
        </el-upload>
        <el-upload
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :http-request="addLittlelogo"
          :multiple="false"
          style="margin-left: 20px"
        >
          <el-button style="padding-bottom: 15px; width: 200px" type="primary"
            >底部小型logo上传
          </el-button>
          <template #tip>
            <div class="el-upload__tip" style="font-size: 16px; color: #596fbd">
              推荐比例:170(宽) × 170(高)
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="indexPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image style="padding-left: 5px" :src="indexMessage.background" fit="fill" />
        </div>
      </el-form-item>
      <el-form-item prop="indexPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image style="padding-left: 5px" :src="indexMessage.logo" fit="fill" />
        </div>
      </el-form-item>
      <el-form-item prop="indexPhoto" style="background-color: #e4e8f1">
        <div>
          <el-image style="padding-left: 5px" :src="indexMessage.littlelogo" fit="fill" />
        </div>
      </el-form-item>

      <el-form-item prop="jcount">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">期刊数</span>
          <el-input
            v-model.number="indexMessage.jcount"
            type="number"
            style="width: 1000px"
            placeholder="期刊数"
          />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submitSave(form)"
            class="submit-button"
            type="primary"
          >
            save the index
          </el-button>
        </div>
      </el-form-item>

      <el-form-item prop="pcount">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">文章数</span>
          <el-input
            v-model.number="indexMessage.pcount"
            type="number"
            style="width: 1000px"
            placeholder="文章数"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="ecount">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">编辑数</span>
          <el-input
            v-model.number="indexMessage.ecount"
            type="number"
            style="width: 1000px"
            placeholder="编辑数"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="vcount">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">视图数</span>
          <el-input
            v-model.number="indexMessage.vcount"
            type="number"
            style="width: 1000px"
            placeholder="视图数"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="ucount">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">下载数</span>
          <el-input
            v-model.number="indexMessage.ucount"
            type="number"
            style="width: 1000px"
            placeholder="下载数"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="btitle">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">大字标题</span>
          <el-input v-model="indexMessage.btitle" style="width: 1000px" placeholder="大字标题" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="ltitle">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">小字标题</span>
          <el-input v-model="indexMessage.ltitle" style="width: 1000px" placeholder="小字标题" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="note">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">备案信息</span>
          <el-input v-model="indexMessage.note" style="width: 1000px" placeholder="备案信息" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="registerurl">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">注册网址</span>
          <el-input v-model="indexMessage.registerurl" style="width: 1000px" placeholder="注册网址" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="logurl">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">登录网址</span>
          <el-input v-model="indexMessage.logurl" style="width: 1000px" placeholder="登录网址" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="emailurl">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px">邮箱网址</span>
          <el-input v-model="indexMessage.emailurl" style="width: 1000px" placeholder="邮箱网址" />
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
import type { IndexEditParam } from '@/types/Indextype'
import { EditIndexBaseAPI, selectIndexOneAPI } from '@/service/IndexController'

//背景图上传
const addBackground = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    indexMessage.value.background! = res.data
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

//网站logo上传
const addLogo = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    indexMessage.value.logo! = res.data
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
//底部小logo上传
const addLittlelogo = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)

  let res = await uploadImage(fromData) // 上传到云服务器
  if (res.code === 0) {
    // urls.value.push(res.data)
    indexMessage.value.littlelogo! = res.data
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

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//编委会泛型
const indexMessage = ref<IndexEditParam>({})

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
  ],
  ucount: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  btitle: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  ltitle: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  registerurl: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  logurl: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  emailurl: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  note: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}

//提交首页前的校验并且校验成功后
const submitSave = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交首页内容,切勿重复保存',
        type: 'success'
      })
      updateIndex()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取首页基础内容
const getIndexOne = async () => {
  let res = await selectIndexOneAPI('1')
  if (res.code === 0) {
    indexMessage.value.id = '1'
    indexMessage.value.jcount = res.data.jcount
    indexMessage.value.pcount = res.data.pcount
    indexMessage.value.ecount = res.data.ecount
    indexMessage.value.vcount = res.data.vcount
    indexMessage.value.ucount = res.data.ucount
    indexMessage.value.btitle = res.data.btitle
    indexMessage.value.ltitle = res.data.ltitle
    indexMessage.value.logo = res.data.logo
    indexMessage.value.note = res.data.note
    indexMessage.value.background = res.data.background
    indexMessage.value.littlelogo = res.data.littlelogo
    indexMessage.value.registerurl = res.data.registerurl
    indexMessage.value.logurl = res.data.logurl
    indexMessage.value.emailurl = res.data.emailurl
  }
}

const updateIndex = async () => {
  const res = await EditIndexBaseAPI({
    ...indexMessage.value
  })
  if (res.code == 0) {
    ElMessage.success('首页信息修改成功!')
  }
}

onMounted(() => {
  getIndexOne()
})
</script>

<style scoped lang="less"></style>
