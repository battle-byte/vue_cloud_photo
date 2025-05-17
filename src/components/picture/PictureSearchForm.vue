<template>
  <div id="SpaceDetail">
    <el-form inline="true">
      <el-form-item  label="搜索条件:">
        <el-input
          v-model="searchParams.searchText"
          style="width: 240px"
          placeholder="相关名称或简介"
          :prefix-icon="Search"
        />
      </el-form-item>
      <el-form-item label="类型:">
        <el-input v-model="searchParams.category" placeholder="图片类型" style="width: 240px" />
      </el-form-item>
      <el-form-item label="标签:">
        <el-input-tag v-model="searchParams.tags" placeholder="图片标签，输入后请摁下回车" style="width: 240px" />
      </el-form-item>

        <el-form-item label="编辑时间:">
          <el-date-picker
            v-model="searchParams.startEditTime"
            type="datetime"
            placeholder="起始时间"
          />
          <span class="text-gray-500">----</span>
          <el-date-picker
            v-model="searchParams.endEditTime"
            type="datetime"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="名称:">
          <el-input v-model="searchParams.picName" placeholder="图片名称" style="width: 240px" />
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model="searchParams.introduction" placeholder="图片简介" style="width: 240px" />
        </el-form-item>
        <el-form-item label="格式:">
          <el-input v-model="searchParams.picFormat" placeholder="图片格式，jpg等+" style="width: 240px" />
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, reactive, ref } from 'vue'
import { formatSize, type PictureListRequest, type PictureUsingList } from '@/types/picture'
import { Search } from '@element-plus/icons-vue'

const loading = ref(true)
// 空间id
interface Props {
  onSearch?:(searchParams:PictureListRequest)=>void
}
const props = defineProps<Props>()

// 搜索条件
const searchParams = ref<PictureListRequest>(<PictureListRequest>{})

// 获取数据
const onSearch = async () => {
  loading.value = true
  try {
    props.onSearch?.(searchParams.value)
  }finally {
    loading.value = false
  }
}

</script>



<style  lang="css">
</style>