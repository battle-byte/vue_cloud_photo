<template>
  <div class="picture-upload">
    <div class="url-picture-upload">
      <el-input v-model="input" style="width: 90%" placeholder="请输入路径" />
      <el-button @click="addPhoto" >提交</el-button>
      <img v-if="props.picture?.url" :src="props.picture.webp??picture?.url" alt="avatar" />
    </div>
  </div>

</template>
<script  lang="ts" setup>

import type { PictureData } from '@/types/picture'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { UploadPictureByUrlAPI } from '@/service/UpLoadFile'

interface Props {
  picture?:PictureData
  onSuccess?: (newPicture:PictureData) => void
  spaceId?: string
}
const input = ref<string>('')
const props = defineProps<Props>()

//用户图片上传
const addPhoto = async () => {
  ElMessage({
    message: '上传中,请耐心等待',
    type: 'success'
  })

  try {
    let res = await UploadPictureByUrlAPI({
      url:input.value,
      spaceId:props.spaceId??'0'
    }) // 上传图片并解析
    if (res.code === 0) {
      //请求成功后 清空上传组件的文件 使得下次可以继续执行
      ElMessage({
        message: '上传成功,等待加载中',
        type: 'success'
      })
      // 将数据送回父组件
      props.onSuccess?.(res.data)
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

  }

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