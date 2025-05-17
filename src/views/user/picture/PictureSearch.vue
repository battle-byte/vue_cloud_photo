<template>
<div id="PictureSearch">
  <el-col>
    <h2 style="font-size: 24px;margin-bottom: 16px">以图搜图</h2>
    <h2 style="font-size: 16px;margin-bottom: 16px">原图</h2>
  </el-col>
  <el-row>
<!--栅格-->
      <el-card title="图片预览" style="max-width: 800px;max-height: 600px;">
        <img :src="pictureData.url" style="max-height: 100%;max-width: 400px;object-fit: cover" />
      </el-card>
  </el-row>
  <h2 style="font-size: 16px;margin-bottom: 16px"> 识图结果</h2>
  <el-row v-loading="loading">
    <PictureSearchList :data-list="dataList.records"  />
  </el-row>
</div>
</template>

<script setup lang="ts">

import { PictureAndUserFindByIdAPI, PictureDeleteAPI, PictureSearchByPictureAPI } from '@/service/PictureController'
import { onMounted, ref } from 'vue'
import {
  type PictureAndUserFindByIdResponse,
  type PictureSearchBySearchResponse
} from '@/types/picture'
import { ElMessage } from 'element-plus'
import PictureList from '@/components/picture/PictureList.vue'
import PictureSearchList from '@/components/picture/PictureSearchList.vue'

interface Props {
  id:string
}
const props = defineProps<Props>()
const loading = ref<boolean>(false)
const dataList =ref<PictureSearchBySearchResponse>({
  records:[]
})

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
const getPictureSearchList = async ()=>{
  loading.value = true
  try {
    const  res = await PictureSearchByPictureAPI({
      url:pictureData.value.url
    })
    if (res.code==0){
      dataList.value = res.data
    }
  }finally {
    loading.value = false
  }
}

onMounted(async ()=>{
  await fetchPicture()
  await getPictureSearchList()
})
</script>

<style scoped lang="less">

</style>