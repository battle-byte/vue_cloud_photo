<template>
  <div id="HomePage">
    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; max-width: 1400px; margin: 0 auto;">
      <template v-for="(item, index) in props.dataList.slice(0, 30)"> <!-- 限制最多30个 -->
        <div style="flex: 0 0 calc(16.666% - 12px); min-width: 150px;"> <!-- 每行6个 -->
          <PictureSearchCard :picture="item" />
        </div>
      </template>
    </div>
  </div>
</template>



<script setup lang="ts">
import type {  PictureSearchBySearch } from '@/types/picture'
import PictureSearchCard from '@/components/picture/PictureSearchCard.vue'

interface Props{
  dataList?:PictureSearchBySearch[]
}
const props = withDefaults(defineProps<Props>(), {
  dataList: () => [],
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