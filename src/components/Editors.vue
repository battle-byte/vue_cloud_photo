<template>
  <div>
    <!-- 此处注意写法v-model:content -->
    <QuillEditor
      ref="myQuillEditor"
      theme="snow"
      v-model:content="content"
      :options="data.editorOption"
      contentType="html"
      @update:content="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { reactive, onMounted, ref, toRaw, watch } from 'vue'

interface Props {
  value: string
  handleChange: (v: string) => void
  mode?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  mode: () => 'split',
  handleChange: (v: string) => {}
})
const content = ref('')
let isClean = ref<boolean>(true)
const myQuillEditor = ref()
// // 通过watch监听回显，笔者这边使用v-model:content 不能正常回显
watch(
  () => props.value,
  (val) => {
    if (isClean.value){
      toRaw(myQuillEditor.value).setHTML(val)
      console.log("666666666666666")
      isClean.value=false
      console.log(isClean.value)
    }
  },
  { deep: false }
)
const fileBtn = ref()
const data = reactive({
  content: '',
  editorOption: {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ font: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: 1 }, { header: 2 }],
        [ 'image'],
        [{ direction: 'rtl' }],
        [{ color: [] }, { background: [] }]
      ]
    },
    placeholder: '请输入内容...'
  }
})
const imgHandler = (state: any) => {
  if (state) {
    fileBtn.value.click()
  }
}
// 抛出更改内容，此处避免出错直接使用文档提供的getHTML方法
const setValue = () => {

}

// 初始化编辑器
onMounted(() => {
  toRaw(myQuillEditor.value).setHTML(props.value)
})
</script>
<style scoped lang="css"></style>
