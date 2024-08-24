<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveAboutJournals()" style="margin-bottom: 10px"
      >save the article
    </el-button>
    <div>关于期刊</div>
    <div>正在编辑期刊: {{ props.id }} 标题:{{ aboutJournalsMessage.journalsName }}</div>
    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editor
            v-model="aboutJournalsMessage.content"
            api-key="o67qx9jgx1vl1y4oi4z0jn1esvdqo7rqou3qdwbu03m90m9w"
            :init="{
              language: 'zh_CN',
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' }
              ],
              ai_request: (request, respondWith) =>
                respondWith.string(() => Promise.reject(`See docs to implement AI Assistant`))
            }"
            initial-value="Welcome to TinyMCE!"
          />
        </main>
      </el-row>
      <el-row>
        <view
          style="
            background-color: #ffffff;
            margin-left: 10px;
            height: auto;
            width: 847.5px;
            padding: 20px;
            border-radius: 10px;
          "
        >
          <div v-html="aboutJournalsMessage.content"></div>
        </view>
      </el-row>
    </el-container>
  </view>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import type { AboutJournalsVO } from '@/types/Aboutjournals'
import { EditAboutJournalsAPI, SelectAboutJournalsAPI } from '@/service/AboutJournalsController'

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

const aboutJournalsMessage = ref<AboutJournalsVO>({
  content: '',
  status: 0,
  jid: ''
})
// 根据id查询内容
const selectAboutJournalsContent = async () => {
  const res = await SelectAboutJournalsAPI({
    jid: props.id,
    status: 0 // 关于期刊
  })
  if (res.code === 0) {
    aboutJournalsMessage.value = res.data
  }
}

// 保存内容
const saveAboutJournals = async () => {
  console.log(props.id)
  const res = await EditAboutJournalsAPI({
    jid: props.id,
    content: aboutJournalsMessage.value.content,
    status: 0
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改期刊的关于期刊内容',
      type: 'success'
    })
    router.push({
      path: '/back/journals/JournalsList'
    })
  }
}

onMounted(async () => {
  await selectAboutJournalsContent()
})
</script>

<style lang="css">
.main {
  background-color: #f2f4f7;
}

@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    height: 100%;
  }
}

.item {
  height: 10000px;
}

.tox-tinymce {
  height: 10000px !important;
}
</style>
