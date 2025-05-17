<template>
<div id="pictureDetailPage">
  <el-row :gutter="[16,16]">
<!--栅格-->
    <el-col :sm="24" :md="16" :xl="18">
      <el-card title="图片预览" style="max-width: 800px;max-height: 600px;">
        <img :src="pictureData.url" style="max-height: 100%;max-width: 600px;object-fit: contain" />
      </el-card>
    </el-col>
<!--图片编辑-->
    <el-col :sm="24" :md="8" :xl="6">
      <el-card title="图片信息" style="max-width: 480px">
        <el-descriptions :column="1" direction="horizontal" rowspan="0" span="1" size="large" title="图片信息" >
          <el-descriptions-item label="作者名称">{{pictureData.user.nickname}}</el-descriptions-item>
          <el-descriptions-item label="图面名称">{{pictureData.picName}}</el-descriptions-item>
          <el-descriptions-item label="图片简介">{{pictureData.introduction}}</el-descriptions-item>
          <el-descriptions-item label="图片分类">{{pictureData.category}}</el-descriptions-item>
          <el-descriptions-item label="图片标签">
            <el-tag style="margin-left: 5px" v-for="(item,index) in pictureData.tags">{{item}}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="图片宽度">{{pictureData.picWidth}}</el-descriptions-item>
          <el-descriptions-item label="图片高度">{{pictureData.picHeight}}</el-descriptions-item>
          <el-descriptions-item label="图片格式">{{pictureData.picFormat}}</el-descriptions-item>
          <el-descriptions-item label="图片宽高比">{{pictureData.picScale}}</el-descriptions-item>
          <el-descriptions-item label="图片大小">{{formatSize(pictureData.picSize)}}</el-descriptions-item>
        </el-descriptions>
        <el-button type="primary" @click="doDownload" > 免费高清原图下载</el-button>
        <el-button type="warning"    @click="$router.push(`/picture_add?id=${pictureData.pid}`)" v-if="userMessage.user?.uid==pictureData.user.uid" > 编辑图片</el-button>
        <el-button type="danger" @click="deletePicture" v-if="userMessage.user?.uid==pictureData.user.uid" > 删除图片</el-button>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script setup lang="ts">

import { PictureAndUserFindByIdAPI, PictureDeleteAPI } from '@/service/PictureController'
import { onMounted, ref } from 'vue'
import { downloadImage, formatSize, type PictureAndUserFindByIdResponse, type PictureData } from '@/types/picture'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores'
import router from '@/router'

interface Props {
  id:string
}
const props = defineProps<Props>()
const userMessage = userStore()

const pictureData = ref<PictureAndUserFindByIdResponse>({
  spaceId: "0",
  thumbnailUrl: '',
  webp: '',
  category: '',
  createdAt: '',
  id: '',
  introduction: '',
  picFormat: '',
  picHeight: 0,
  picName: '',
  picScale: 0,
  picSize: 0,
  picWidth: 0,
  pid: '',
  tags: [],
  url: '',
  user:{}
})

const deletePicture = async ()=>{
  try {
    const res = await PictureDeleteAPI(props.id)
    if (res.code==0){
      router.push({
        path: '/'
      })
    }else {
      ElMessage.error("删除失败")
    }
  }catch (err){
    ElMessage.error("删除失败")
  }
}
const fetchPicture = async ()=>{
  try {
    const res = await PictureAndUserFindByIdAPI(props.id)
    if (res.code==0){
      pictureData.value = res.data
      console.log(pictureData.value)
    }else {
      ElMessage.error("获取图片失败")
    }
  }catch (err){
    ElMessage.error("获取图片失败")
  }
}


// 处理下载
const doDownload = () => {
  downloadImage(pictureData.value.url)
}

onMounted(async ()=>{
  await fetchPicture()
})
</script>

<style scoped lang="less">

</style>