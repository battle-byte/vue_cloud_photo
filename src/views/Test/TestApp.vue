<script setup lang="ts">
import { ref } from 'vue'
const url = ref<string>("C:\Users\WTS\Desktop\testPublish\f323267b-0c08-44e5-b3ff-f0e39a15d694.docx")
</script>

<template>
  <view>
    <view></view>
    <button>asdasd</button>
    <button>asdasd</button>
    <button>asdasd</button>
    <button>asdasd</button>
    <button>asdasd</button>
    <div>
      <pdf :src="url" ref="pdf"></pdf>
    </div>
  </view>
</template>

<style scoped lang="less">

</style>