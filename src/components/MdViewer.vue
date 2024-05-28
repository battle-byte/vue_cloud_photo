<template>
  <div>
    <Viewer :value="props.value" :plugins="plugins" />
  </div>
</template>

<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import { Viewer } from '@bytemd/vue-next'
import { defineProps, withDefaults } from 'vue'
import 'juejin-markdown-themes/dist/juejin.min.css'

/**
 * 定义组件属性
 */
interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => ''
})
const plugins = [
  gfm(),
  highlight()
  // Add more plugins here
]
</script>

<style scoped>
</style>
