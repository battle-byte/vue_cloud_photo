<template>
  <div id="spaceAnalyzePage">
    <h2>
      空间图库分析 -
      <span v-if="queryAll"> 全部空间 </span>
      <span v-else-if="queryPublic"> 公共图库 </span>
      <span v-else>
      <a :href="`/space/${spaceId}`" target="_blank">id：{{ spaceId }}</a>
    </span>
    </h2>
    <a-row :gutter="[16, 16]">
      <!-- 空间使用分析 -->
      <a-col :xs="24" :md="12">
        <SpaceUsageAnalyze :spaceId="spaceId" :queryAll="queryAll" :queryPublic="queryPublic" />
      </a-col>
      <!-- 空间分类分析 -->
      <a-col :xs="24" :md="12">
        <SpaceCategoryAnalyze :spaceId="spaceId" :queryAll="queryAll" :queryPublic="queryPublic" />
      </a-col>
      <!-- 标签分析 -->
      <a-col :xs="24" :md="12">
        <SpaceTagsAnalyze :spaceId="spaceId" :queryAll="queryAll" :queryPublic="queryPublic" />
      </a-col>
      <!-- 图片大小分段分析 -->
      <a-col :xs="24" :md="12">
        <SpaceSizeAnalyze :spaceId="spaceId" :queryAll="queryAll" :queryPublic="queryPublic" />
      </a-col>
      <!-- 用户上传行为分析 -->
      <a-col :xs="24" :md="12">
        <SpaceUserAnalyze :spaceId="spaceId" :queryAll="queryAll" :queryPublic="queryPublic" />
      </a-col>
      <!-- 空间使用排行分析 -->
      <a-col :xs="24" :md="12" >
        <SpaceRankAnalyze v-if="isAdmin"
                          :spaceId="spaceId"
                          :queryAll="queryAll"
                          :queryPublic="queryPublic"
        />
      </a-col>
    </a-row>
  </div>

</template>
<script setup lang="ts">

import { useRoute } from 'vue-router'
import { computed } from 'vue'
import SpaceRankAnalyze from '@/components/space_analyze/SpaceRankAnalyze.vue'
import SpaceUserAnalyze from '@/components/space_analyze/SpaceUserAnalyze.vue'
import SpaceSizeAnalyze from '@/components/space_analyze/SpaceSizeAnalyze.vue'
import SpaceCategoryAnalyze from '@/components/space_analyze/SpaceCategoryAnalyze.vue'
import SpaceUsageAnalyze from '@/components/space_analyze/SpaceUsageAnalyze.vue'
import SpaceTagsAnalyze from '@/components/space_analyze/SpaceTagsAnalyze.vue'
import { userStore } from '@/stores'

const loginUserStore = userStore()
const loginUser = loginUserStore.user

const isAdmin = computed(() => {
  return loginUser?.rid ==3 || loginUser?.rid == 1
})



const route = useRoute()

// 空间 id
const spaceId = computed(() => {
  return route.query?.spaceId as string
})

// 是否查询所有空间
const queryAll = computed(() => {
  return !!route.query?.queryAll
})

// 是否查询公共空间
const queryPublic = computed(() => {
  return !!route.query?.queryPublic
})

</script>

<style scoped lang="less">

</style>