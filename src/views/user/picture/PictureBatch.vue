<template>
  <div id="picture_add">
    <!--表单-->
    <el-form v-loading="loading" :rules="rules" :model="picture" ref="form" size="large" autocomplete="off">
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="searchText">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">关键词</span>
          <el-input v-model="picture.searchText" max="30" min="1" style="width: 600px" placeholder="关键词" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="count">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">抓取数量</span>
          <el-input v-model.number="picture.count"  style="width: 600px" placeholder="抓取数量" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="introduction">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px; width: 100px">图片简介</span>
          <el-input
            v-model="picture.introduction"
            type="textarea"
            max="30"
            :autosize="{ minRows: 2, maxRows: 4 }"
            style="width: 600px"
            placeholder="图片简介"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="category">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">图片分类</span>
          <!-- 自动补全组件-->
          <el-autocomplete
            v-model="picture.category"
            clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入分类"
            style="width: 600px"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="tags">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">图片标签</span>
          <el-input-tag
            :autocomplete="true"
            style="width: 600px"
            :max="10"
            v-model="picture.tags"
            draggable
            clearable
            aria-autocomplete="both"
            @click="mySelect.toggleMenu()"
            placeholder="按下回车键以确认标签"
          >
          </el-input-tag>
          <el-select
            class="my-custom-popper"
            v-model="picture.tags"
            multiple
            clearable
            collapse-tags
            style="width: 0; opacity: 0; position: absolute"
            ref="mySelect"
          >
            <el-option
              v-for="(item, index) in tags"
              :key="index"
              :label="item"
              :value="item"
              style="display: flex"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click="submitSave(form)" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { PictureData, PictureUploadByBatchRequest } from '@/types/picture'
import { ElMessage, type FormInstance } from 'element-plus'
import {
  PictureTagCategory,
  PictureUploadByBatchAPI
} from '@/service/PictureController'
import { useRoute } from 'vue-router'

interface Category {
  value: string
}

const mySelect = ref()
const tags = ref<string[]>()
const category = ref<string[]>()
// 尽量不要定义空的对象
const picture = ref<PictureUploadByBatchRequest>({
  category: '',
  count: 0,
  introduction: '',
  searchText: '',
  tags: []
})
//表单校验
const form = ref<FormInstance>()
//表单校验规则
const rules = {
  introduction: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  category: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  searchText: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  tags: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}
//提交普通用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance | undefined) => {
  console.log(picture.value)
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交信息中,请勿重复保存',
        type: 'success'
      })
      batchPicture()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}
const loading = ref<boolean>(false)
const batchPicture = async () => {
  ElMessage.success('抓取中,请耐心等待!')
  loading.value =true
  try {
    const res = await PictureUploadByBatchAPI({
      introduction: picture.value.introduction,
      category: picture.value.category,
      tags: picture.value.tags,
      count: picture.value.count,
      searchText: picture.value.searchText,
    })
    if (res.code == 0) {
      ElMessage.success('抓取成功!抓取到' + res.data.count + '张图片')
      loading.value=false
    }else {
      ElMessage.error(res.message)
      loading.value=false
    }
  }catch (err){
    loading.value =false
    ElMessage.error('遇到未知错误了┭┮﹏┭┮!')
  }finally {
    loading.value =false
  }
}

const GetTagsAndCategory = async () => {
  const res = await PictureTagCategory()
  if (res.code == 0) {
    tags.value = res.data.tags
    category.value = res.data.category
  }
}
const querySearch = (queryString: string, cb: any) => {
  // const results = queryString
  //   ? category.value!.filter(createFilter(queryString))
  //   : category.value;
  // call callback function to return suggestions

  cb(convertToCategoryArray(category.value!))
}

const createFilter = (queryString: string) => {
  return (categoryItem: string) => {
    return categoryItem.toLowerCase().includes(queryString.toLowerCase())
  }
}

const convertToCategoryArray = (strArray: string[]): Category[] => {
  return strArray.map((item) => ({ value: item }))
}

const route = useRoute()

onMounted(async () => {
  await GetTagsAndCategory()
})
</script>

<style scoped lang="css">
#picture_add {
  max-width: 720px;
  margin: 0 auto;
}

:deep(.el-popper is-light el-select__popper) {
  margin-left: 50px !important;
}
</style>