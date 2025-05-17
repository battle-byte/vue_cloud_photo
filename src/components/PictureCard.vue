<template>
  <div>
    <el-card  style="max-width: 360px;">
      <template #header>{{props.picture?.picName??""}}</template>
      <img
        @click="$router.push(`/picture_detail/${props.picture?.pid}`)"
        :src="props.picture!.thumbnailUrl??props.picture!.webp"
        style="width: 100%;max-width: 360px;max-height: 180px;object-fit: contain"
      />
      <el-tag style="margin-top: 10px" v-if="props.picture?.category" type="success">{{props.picture?.category}}</el-tag>
      <el-tag v-for="(item,index) in props.picture?.tags" style="margin-top: 10px;width: auto" type="primary">{{item}}</el-tag>
      <template #footer v-if="props.showOp">
        <el-row style="width: 100%;min-width: 180px" justify="start">
          <el-button style="padding: 8px" @click="doSearch" size="small" type="primary">搜索</el-button>
          <el-button  style="padding: 8px" @click="doEdit" size="small" type="success">编辑</el-button>
          <el-button style="padding: 8px" @click="deletePicture" size="small" type="danger">删除</el-button>
        </el-row>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">

import type {  PictureUsingList } from '@/types/picture'
import router from '@/router'
import { PictureDeleteAPI } from '@/service/PictureController'
import { ElMessage } from 'element-plus'

interface Props {
  picture?:PictureUsingList
  showOp?:boolean
  onReload?:()=>void
}

const props = defineProps<Props>()
const deletePicture = async ()=>{
  const res = await PictureDeleteAPI(props.picture?.pid!)
  if(res.code === 0){
    props.onReload?.()
    ElMessage.success("删除成功")
  }
}

const doEdit = () => {
  router.push({
    path: '/picture_add',
    query: {
      id: props.picture?.pid,
      spaceId: props.picture?.spaceId
    }
  })
}
const doSearch = () => {
  window.open(`/search_picture/${props.picture?.pid}`)
}
</script>



<style scoped lang="less">

</style>