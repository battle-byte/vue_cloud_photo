<template>
  <div>
    <!-- 此处注意写法v-model:content -->
    <div style="width: 767.5px" class="ql-editor" v-html="value"></div>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  value: string
  // handleChange: (v: string) => void
  // mode?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  // mode: () => 'split',
  // handleChange: (v: string) => {}
})

</script>
<style scoped lang="css"></style>
