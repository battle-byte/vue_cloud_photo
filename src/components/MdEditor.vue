<template>
  <view class="main">
    <div class="details">
      <Editor
        :value="value"
        :plugins="plugins"
        @change="handleChange"
        :locale="zhHans"
        :upload-images="handleUploadImages"
      />
    </div>
  </view>
</template>

<script setup lang="ts">
import { Editor } from '@bytemd/vue-next'
import 'juejin-markdown-themes/dist/juejin.min.css'
import 'bytemd/dist/index.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import zhHans from 'bytemd/locales/zh_Hans.json'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'

import { defineProps, withDefaults } from 'vue'
import { uploadImage } from '@/service/UpLoadFile'

/**
 * 定义组件属性
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
  mode?: string;
}

//供外部使用
const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  mode: () => 'split',
  handleChange: (v: string) => {
  }
})
//添加的插件
const plugins = [
  gfm(),
  highlight(),
  gemoji(),
  mediumZoom()
]
//上传图片
const handleUploadImages = async (files: any) => {
  let imgs: any = []
  for (let index = 0; index < files.length; index++) {
    const item = files[index]
    let fromData = new FormData()
    fromData.append('file', item)

    let res = await uploadImage(fromData)  // 上传到阿里云


    imgs.push({
      title: item.name,
      url: res.data
    })
  }
  return imgs
}

</script>

<style scoped lang="less">

</style>
