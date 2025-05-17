<template>
  <a-modal class="image-cropper"
           v-model:visible="visible"
           title="AI扩图"
           :footer="false"
           @cancel="closeModal">
    <a-row gutter="16">
      <a-col span="12">
        <h4>原始图片</h4>
        <img :src="props.picture?.url" :alt="props.picture?.picName" style="max-width: 100%" />
      </a-col>
      <a-col span="12">
        <h4>扩图结果</h4>
        <img
          v-if="resultImageUrl"
          :src="resultImageUrl"
          :alt="props.picture?.picName"
          style="max-width: 100%"
        />
      </a-col>
    </a-row>
    <div style="margin-bottom: 16px" />
    <a-flex gap="16" justify="center">
      <a-button type="primary" ghost @click="createTask">生成图片</a-button>
      <a-button type="primary" :loading="uploadLoading" @click="handleUpload">应用结果</a-button>
    </a-flex>

  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Parameters, PictureData } from '@/types/picture'
import { ElMessage } from 'element-plus'
import { FileLoadAndParseAPI, UploadPictureByUrlAPI } from '@/service/UpLoadFile'
import { PictureCreateOutPaintingTaskAPI, PictureGetOutPaintingTaskAPI } from '@/service/PictureController'
interface Props {
  picture?: PictureData
  spaceId?: string
  onSuccess?: (newPicture: string) => void
}


const props = defineProps<Props>()
const resultImageUrl = ref<string>("https://vigen-invi.oss-cn-shanghai.aliyuncs.com/service_dashscope/ImageOutPainting/2025-05-05/public/24d95137-26a5-44b3-8aea-2582b65d0bbd/result-6ba66b49-8706-4ef8-b0b8-6245e957628c.jpg?OSSAccessKeyId=LTAI5t7aiMEUzu1F2xPMCdFj&Expires=1746447998&Signature=olWkDh1ZuFuTfFOH4lBcbbUK6L4%3D")
const taskId = ref<string>("")



// 是否可见
const visible = ref(false)
const picture = ref<PictureData>( {
  category: '',
  createdAt: '',
  editAt: '',
  id: '',
  introduction: '',
  picFormat: '',
  picHeight: 0,
  picName: '',
  picScale: 0,
  picSize: 0,
  picWidth: 0,
  pid: '',
  reviewAt: '',
  reviewMessage: '',
  reviewStatus: 0,
  reviewerId: '',
  tags: [],
  thumbnailUrl: '',
  updatedAt: '',
  url: '',
  userId: '',
  webp: ''
})
// 打开弹窗
const openModal = () => {
  visible.value = true
}
const parameters = ref<Parameters>({
  add_watermark: true,
  angle: 0,
  best_quality: false,
  bottom_offset: 0,
  left_offset: 0,
  limit_image_size: false,
  output_ratio: '',
  right_offset: 0,
  top_offset: 0,
  x_scale: 2,
  y_scale: 2
})
// 关闭弹窗
const closeModal = () => {
  visible.value = false
}

// 暴露函数给父组件
defineExpose({
  openModal,
})

const createTask = async () => {
  if (!props.picture?.pid) {
    return
  }
  try {
    ElMessage.success("开始创建任务")
    const res = await PictureCreateOutPaintingTaskAPI({
      pid: props.picture!.pid,
      parameters:parameters.value
    })
    if (res.code === 0) {
      ElMessage.success("任务创建成功,请耐心等待任务完成")
      console.log(res.data.taskId)
      taskId.value = res.data.taskId
      startPolling(); //开启轮询
    }
  }finally {
  }
}
let pollingTimer  :any= null
const startPolling = async ()=>{
  if (!taskId.value||taskId.value=="") {
    return
  }
  console.log(taskId.value)
  pollingTimer = setInterval(async ()=>{
    try {
      const res = await PictureGetOutPaintingTaskAPI(taskId.value)
      if (res.code === 0) {
        if (res.data.isSuccess==2){
          ElMessage.error("任务失败"+res.data.errMessage)
          clearPolling()
        }else if (res.data.isSuccess==1){
          ElMessage.success("任务仍在执行中")
        }
        else if (res.data.isSuccess==0){
          ElMessage.success("任务完成")
          resultImageUrl.value = res.data.imageUrl
          clearPolling()
        }
      }
    }catch (err){
      ElMessage.error("任务失败")
      clearPolling()
    }
  },3000)
}
const clearPolling =()=>{
  if (pollingTimer||pollingTimer!=null) {
    clearInterval(pollingTimer)
    console.log(pollingTimer)
    pollingTimer=null
    taskId.value = ""
  }
}

const uploadLoading=ref<boolean>(false)

const handleUpload = ()=>{
  if (resultImageUrl.value!="")  {
    addPhoto()
    closeModal()
  }
}
const addPhoto = async () => {
  props.onSuccess?.(resultImageUrl.value)
}

onMounted(()=>{
  startPolling()
})

</script>

<style scoped>
.image-cropper {
  text-align: center;
}

.image-cropper .vue-cropper {
  height: 400px;
}
</style>
