<template>
  <div id="HomePage">
    <!-- 图片列表 -->
    <!-- 搜索框 -->
    <div class="search-bar">
      <el-input  button="搜索"  style="max-width: 480px;margin: 0 auto 10px" :prefix-icon="Search" placeholder="从海量图片获取你想要的内容"/>
    </div>
    <div>
      <span style="margin-right: 18px">分类</span>
      <el-check-tag  @click="onSearchCategory(-1)" :checked="selectedCategory==-1" style="margin: 10px;width: auto" type="primary">全部</el-check-tag>
      <el-check-tag v-for="(item,index) in category" @click="onSearchCategory(index)" :key="index"  :checked="selectedCategory==index" style="margin: 10px;width: auto" type="primary">{{item}}</el-check-tag>
    </div>
    <div>
      <span style="margin-right: 18px">标签</span>
      <el-check-tag @click="onSearch" v-for="(item,index) in tags"  :key="index"  v-model:checked="selectedTagList[index]" style="margin: 10px;width: auto" type="primary">{{item}}</el-check-tag>
    </div>
    <div>
      <PictureList :show-op="false" v-if="dataList.length>0" :dataList="dataList" :loading="loading" />
    </div>
    <div class="example-pagination-block">
      <el-pagination
        background
        :page-size="12"
        layout="prev, pager, next"
        :total="pageCount"
        v-model:current-page="searchParams.page"
        @current-change="handlePage"
      />
    </div>
  </div>
</template>



<script setup lang="ts">

import { computed, onMounted, reactive, ref } from 'vue'
import type {  PictureListRequest, PictureUsingList } from '@/types/picture'
import { ElMessage } from 'element-plus'
import {  PictureTagCategory, PictureUsingListAPI } from '@/service/PictureController'
import { Search } from '@element-plus/icons-vue'
import type { PageParams } from '@/types/Pages'
import PictureCard from '@/components/PictureCard.vue'
import PictureList from '@/components/picture/PictureList.vue'

const dataList =ref<PictureUsingList[]>([])
const loading = ref(true)

const tags = ref<string[]>()
const category = ref<string[]>()
const selectedCategory = ref<number>(-1)
const selectedTagList = ref<boolean[]>([false,false,false,false,false])
const doSearch = () => {
  // 重置搜索条件
  searchParams.value.page = 1
  fetchData()
}

// 搜索条件
const searchParams = ref<PictureListRequest>(<PictureListRequest>{
  page: 1,
  size: 12,
  spaceId:"0"
})

const changeIndex = (index:number)=>{
  selectedCategory.value = index
}

const onSearchCategory  = async (index:number) => {
  loading.value = true
  try {
    selectedCategory.value=index
    if (index==-1){
      searchParams.value.category = ""
    }else{
      searchParams.value.category = category.value![index]
    }
    const res = await PictureUsingListAPI(searchParams.value)
    if (res.code==0) {
      dataList.value = res.data.records ?? []
      pageCount.value = res.data.total ?? 0
    } else {
      ElMessage.error('获取数据失败')
    }
  }finally {
    loading.value = false
  }
}
const onSearch  = async () => {
  loading.value = true
  try {
    searchParams.value.tags = []
    for (let i = selectedTagList.value.length - 1; i >= 0; i--) {
      if (selectedTagList.value[i]) {
        searchParams.value.tags.push(tags.value![i])
      }
    }
    console.log(selectedTagList.value)
    console.log(searchParams.value.tags)
    const res = await PictureUsingListAPI(searchParams.value)
    if (res.code==0) {
      dataList.value = res.data.records ?? []
      pageCount.value = res.data.total ?? 0
    } else {
      ElMessage.error('获取数据失败')
    }
  }finally {
    loading.value = false
  }
}

// 获取数据
const fetchData = async () => {
  loading.value = true
  try {
    const res = await PictureUsingListAPI(searchParams.value)
    if (res.code==0) {
      dataList.value = res.data.records ?? []
      pageCount.value = res.data.total ?? 0
    } else {
      ElMessage.error('获取数据失败')
    }
  }finally {
    loading.value = false
  }
}

const GetTagsAndCategory = async () => {
  const res = await PictureTagCategory()
  if (res.code == 0) {
    tags.value  = res.data.tags
    category.value  = res.data.category
  }
}


// 页面加载时请求一次
onMounted(async () => {
  await fetchData()
  await GetTagsAndCategory()
})

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  fetchData()
}

const pageCount = ref<number>(0)

//分页查询页数
const noticePage = ref<PageParams>({
  page: 1,
  size: 12
})


</script>



<style scoped lang="less">
.search-bar{
  display: flex;
  justify-content: center;     /* 水平居中 */
  align-items: center;         /* 垂直居中 */
  //border: 1px dashed #d9d9d9;  /* 可视化边界 */
}
#HomePage {
}

</style>