<template>
<div class="batch-edit-picture-modal">
  <el-dialog v-model="visible" >
    <el-form ref="form" size="default" autocomplete="off">
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item label="">
        <span style="font-size: 18px">批量编辑图片</span>
      </el-form-item>
      <el-form-item label="">
        <span>*仅对当前页面内的图片有效 不填写部分不会生效</span>
      </el-form-item>
      <el-form-item label="图片名称">
        <div style="display: flex">
          <el-input v-model="editParam.picName" style="width: 400px" placeholder="图片名称" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item label="图片分类">
        <div style="display: flex">
          <el-autocomplete
            v-model="editParam.category"
            clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入分类"
            style="width: 400px"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item label="图片标签">
        <div style="display: flex">
          <el-input-tag
            :autocomplete="true"
            style="width: 400px"
            :max="10" v-model="editParam.tags"
            draggable
            clearable
            aria-autocomplete="both"
            @click="mySelect.toggleMenu()"
            placeholder="按下回车键以确认标签">
          </el-input-tag>
          <el-select
            class="my-custom-popper"
            v-model="editParam.tags"
            multiple
            clearable
            collapse-tags
            style="width: 0; opacity: 0; position: absolute;;"
            ref="mySelect"
          >
            <el-option
              v-for="(item,index) in tags"
              :key="index"
              :label="item"
              :value="item"
              style="display: flex;"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click="savePicture" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {  PictureListEditAPI, PictureTagCategory } from '@/service/PictureController'
import { ElMessage } from 'element-plus'
import type { PictureListEditRequest, PictureUsingList } from '@/types/picture'

interface Props{
  pictureList:PictureUsingList[]
  spaceId:string
  onSuccess?:()=>void
}
const props = defineProps<Props>()
const mySelect=ref()
const tags = ref<string[]>()
const category = ref<string[]>()
const editParam =ref<PictureListEditRequest>({
  category: '', picName: '', pid: [], spaceId: '', tags: []
})
const visible = ref<boolean>(false)

const openModal=()=>{
  visible.value=true
  // 每次打开清空数据
  editParam.value = { category: '', picName: '', pid: [], spaceId: '', tags: []}
}
const closeModal=()=>{
  visible.value= false
}
defineExpose({
  openModal,
})
const savePicture = async () => {
  if (!props.pictureList){
    return
  }
  const res = await PictureListEditAPI({
    pid: props.pictureList.map((picutre)=>picutre.pid),
    picName: editParam.value.picName,
    category: editParam.value.category,
    tags: editParam.value.tags,
    spaceId:props.spaceId
  })
  if (res.code == 0) {
    ElMessage.success('保存成功!')
    closeModal()
    props.onSuccess?.()
  }
}

const GetTagsAndCategory = async () => {
  const res = await PictureTagCategory()
  if (res.code == 0) {
    tags.value  = res.data.tags
    category.value  = res.data.category
  }
}
const querySearch = (queryString: string, cb:any) => {
  cb(convertToCategoryArray(category.value!));
};

interface Category {
  value:string
}
const convertToCategoryArray = (strArray: string[]): Category[] => {
  return strArray.map(item => ({ value: item }));
};


onMounted(async () => {
  await GetTagsAndCategory()
})

</script>

<style scoped lang="less">

</style>