<template>
  <div class="picture-upload">
    <el-upload
      ref="ELUpload"
      v-loading="loading"
      action="#"
      drag
      :limit="1"
      :show-file-list="false"
      :http-request="addPhoto"
      :multiple="false"
      :before-upload="beforeUpload"
    >
      <img v-if="props.picture?.url" :src="props.picture.webp??props.picture?.url" alt="avatar" />
      <div v-else>
        <el-icon><Plus /></el-icon>
        <div class="el-upload__text">
          <em>点击</em>或<em>拖拽</em>上传
        </div>
      </div>

    </el-upload>
    <!--放大查看-->
<!--    <el-dialog v-model="dialogVisible">-->
<!--      <img w-full :src="dialogImageUrl" alt="Preview Image" />-->
<!--    </el-dialog>-->
  </div>

</template>
<script  lang="ts" setup>
import {
Download,
Delete,
  Plus,
  ZoomIn,
  ColdDrink,
} from '@element-plus/icons-vue'
import type { PictureData } from '@/types/picture'
import { ElMessage, type UploadFile, type UploadProps } from 'element-plus'
import { ref } from 'vue'
import { FileLoadAndParseAPI } from '@/service/UpLoadFile'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'

interface Props {
  picture?:PictureData
  onSuccess?: (newPicture:PictureData) => void
  spaceId?: string
}
const picture = ref<PictureData>({
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
  webp: ""
})

const props = defineProps<Props>()

const loading = ref<boolean>(false)

// 获取组件对象
const ELUpload =ref()

// 图片校验
const beforeUpload : UploadProps['beforeUpload'] =(rawFile:any)=>{
  if (rawFile.type!=='image/png'&&rawFile.type!=='image/jpeg') {
    ElMessage.error("图片格式不支持,推荐使用png或jpg格式")
    return false
  }else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB')
    return false
  }
  return true
}


const handleDownload = (file: string) => {
  console.log(file)
}
//用户图片上传
const addPhoto = async (files: any) => {
  ElMessage({
    message: '上传中,请耐心等待',
    type: 'success'
  })
  loading.value =true
  try {
    let fromData = new FormData()
    fromData.append('file', files.file)
    fromData.append('spaceId', props.spaceId??'0')
    // 图片id 0为新建图片 否则为覆盖原来的图片
    if (props.picture?.pid===""||props.picture?.pid===undefined) {
      fromData.append('pid',"0")
    }else {
      fromData.append('pid', props.picture?.pid)
    }
    let res = await FileLoadAndParseAPI(fromData) // 上传图片并解析
    if (res.code === 0) {
      //请求成功后 清空上传组件的文件 使得下次可以继续执行
      ELUpload.value.clearFiles()
      ElMessage({
        message: '上传成功,等待加载中',
        type: 'success'
      })
      picture.value.url = res.data.url
      picture.value.pid = res.data.pid
      picture.value.category=res.data.category
      picture.value.createdAt=res.data.createdAt
      picture.value.editAt=res.data.editAt
      picture.value.id=res.data.id
      picture.value.introduction=res.data.introduction
      picture.value.picFormat=res.data.picFormat
      picture.value.picHeight=res.data.picHeight
      picture.value.picName=res.data.picName
      picture.value.picScale=res.data.picScale
      picture.value.picSize=res.data.picSize
      picture.value.picWidth=res.data.picWidth
      picture.value.pid=res.data.pid
      picture.value.tags=res.data.tags
      picture.value.updatedAt=res.data.updatedAt
      picture.value.url=res.data.url
      picture.value.userId=res.data.userId
      picture.value.thumbnailUrl=res.data.thumbnailUrl
      picture.value.webp=res.data.webp
      // 将数据送回父组件
      props.onSuccess?.(picture.value)
    } else {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    }
  }catch (err){
    console.log(err)
    ElMessage({
      message: '上传失败',
      type: 'error'
    })
  } finally {
    loading.value =false
    ELUpload.value.clearFiles()
  }
 loading.value =false
}
</script>
<style scoped lang="css">
.picture-upload :deep(.el-upload) {
  width: 100% !important;
  height: 100% !important;
  min-height: 160px;
  min-width: 160px;
  display: flex;
  justify-content: center;     /* 水平居中 */
  align-items: center;         /* 垂直居中 */
  border: 1px dashed #d9d9d9;  /* 可视化边界 */
}

.picture-upload :deep(.el-upload-dragger)  {
  width: 80%;
  height: 100%;
}

.picture-upload img {
  max-width: 100%;
  max-height: 480px;
  display: block;              /* 消除图片底部间隙 */
  object-fit: contain;         /* 保持比例 */
}
</style>