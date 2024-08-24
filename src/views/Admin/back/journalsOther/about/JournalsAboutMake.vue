<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the About
    </el-button>
    <div style="margin-bottom: 10px">
      正在编辑期刊: {{ props.jid }}的About栏 期刊标题:{{ aboutMessage.journalsName }}
    </div>
    <div style="margin-bottom: 10px">
      正在编辑的About栏ID: {{ aboutMessage.aid }} About栏标题:{{ aboutMessage.name }}
    </div>

    <el-row>
      <el-text style="margin-left: 10px">About栏标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px"
        v-model="aboutMessage.name"
        placeholder="About栏标题"
      ></el-input>
    </el-row>

    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editor
            v-model="aboutMessage.content"
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
          <div style="width: 767.5px" v-html="aboutMessage.content"></div>
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
import { EditAboutJournalsAPI, SaveOrCreateAboutAPI } from '@/service/AboutController'
import type { AboutContent } from '@/types/About'

interface Props {
  aid: string
  jid: string
}

const props = withDefaults(defineProps<Props>(), {
  aid: () => '',
  jid: () => ''
})

const aboutMessage = ref<AboutContent>({
  content: '',
  name: '',
  aid: '',
  journalsName: ''
})

// 保存内容
const saveArticle = async () => {
  const res = await EditAboutJournalsAPI({
    aid: aboutMessage.value.aid,
    name: aboutMessage.value.name,
    content: aboutMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改期刊About栏内容',
      type: 'success'
    })
    router.back()
  } else {
  }
}
const SaveOrCreateAbout = async () => {
  const res = await SaveOrCreateAboutAPI({
    aid: aboutMessage.value.aid,
    jid: props.jid
  })
  if (res.code === 0) {
    aboutMessage.value = res.data
    aboutMessage.value.aid = res.data.aid
  }else {
    ElMessage.error('出错了！')
    router.replace({
      path: `/back/journalsOther/JournalsAboutList/${props.jid}`
    })
  }
}
onMounted(async () => {
  aboutMessage.value.aid = props.aid
  await SaveOrCreateAbout()
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
