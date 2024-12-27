<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the ForAuthors
    </el-button>
    <div style="margin-bottom: 10px">
      正在编辑期刊: {{ props.jid }}的ForAuthors栏 期刊标题:{{ forAuthorsMessage.journalsName }}
    </div>
    <div style="margin-bottom: 10px">
      正在编辑的ForAuthors栏ID: {{ forAuthorsMessage.aid }} ForAuthors栏标题:{{ forAuthorsMessage.name }}
    </div>

    <el-row>
      <el-text style="margin-left: 10px">ForAuthors栏标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px"
        v-model="forAuthorsMessage.name"
        placeholder="ForAuthors栏标题"
      ></el-input>
    </el-row>

    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="forAuthorsMessage.content"
            :handle-change="onMdChange"
            @updateValue="onMdChange"
          >
          </Editors>
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
          <div style="width: 767.5px" v-html="forAuthorsMessage.content"></div>
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
import { EditForAuthorsJournalsAPI, SaveOrCreateForAuthorsAPI } from '@/service/ForAuthorsController'
import type { ForAuthorsContent } from '@/types/ForAuthors'
import Editors from '@/components/Editors.vue'
const onMdChange = (v: string) => {
  forAuthorsMessage.value.content = v;
};
interface Props {
  aid: string
  jid: string
}

const props = withDefaults(defineProps<Props>(), {
  aid: () => '',
  jid: () => ''
})

const forAuthorsMessage = ref<ForAuthorsContent>({
  content: '',
  name: '',
  aid: '',
  journalsName: ''
})

// 保存内容
const saveArticle = async () => {
  const res = await EditForAuthorsJournalsAPI({
    aid: forAuthorsMessage.value.aid,
    name: forAuthorsMessage.value.name,
    content: forAuthorsMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改期刊ForAuthors栏内容',
      type: 'success'
    })
    router.back()
  }
}
const SaveOrCreateForAuthors = async () => {
  const res = await SaveOrCreateForAuthorsAPI({
    aid: forAuthorsMessage.value.aid,
    jid: props.jid
  })
  if (res.code === 0) {
    forAuthorsMessage.value = res.data
  }else {
    ElMessage.error('出错了！')
    router.replace({
      path: `/back/journalsOther/JournalsForAuthorsList/${props.jid}`
    })
  }
}

onMounted(async () => {
  forAuthorsMessage.value.aid = props.aid
  await SaveOrCreateForAuthors()
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
