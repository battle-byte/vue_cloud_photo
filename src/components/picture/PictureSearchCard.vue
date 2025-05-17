<template>
  <div>
    <el-card  style="max-width: 360px;">
      <img
        :src="props.picture!.thumbUrl ??props.picture!.formUrl"
        style="width: 100%;max-width: 360px;max-height: 180px;object-fit: contain"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { PictureSearchBySearch, PictureUsingList } from '@/types/picture'
import router from '@/router'
import { PictureDeleteAPI } from '@/service/PictureController'
import { ElMessage } from 'element-plus'
interface Props {
  picture?:PictureSearchBySearch
}
const props = defineProps<Props>()
</script>



<style scoped lang="less">

</style>