<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the ForReviewers
    </el-button>
    <div style="margin-bottom: 10px">
      正在编辑期刊: {{ props.jid }}的ForReviewers栏 期刊标题:{{ forReviewersMessage.journalsName }}
    </div>
    <div style="margin-bottom: 10px">
      正在编辑的ForReviewers栏ID: {{ forReviewersMessage.aid }} ForReviewers栏标题:{{
        forReviewersMessage.name
      }}
    </div>

    <el-row>
      <el-text style="margin-left: 10px">ForReviewers栏标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px"
        v-model="forReviewersMessage.name"
        placeholder="ForReviewers栏标题"
      ></el-input>
    </el-row>

    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="forReviewersMessage.content"
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
          <ShowText :value="forReviewersMessage.content"></ShowText>
<!--          <div style="width: 767.5px" v-html="forReviewersMessage.content"></div>-->
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
import {
  EditForReviewersJournalsAPI,
  SaveOrCreateForReviewersAPI
} from '@/service/ForReviewersController'
import type { ForReviewersContent } from '@/types/ForReviewers'
import Editors from '@/components/Editors.vue'
import ShowText from '@/components/ShowText.vue'
const onMdChange = (v: string) => {
  forReviewersMessage.value.content = v;
};
interface Props {
  aid: string
  jid: string
}

const props = withDefaults(defineProps<Props>(), {
  aid: () => '',
  jid: () => ''
})

const forReviewersMessage = ref<ForReviewersContent>({
  content: '',
  name: '',
  aid: '',
  journalsName: ''
})

// 保存内容
const saveArticle = async () => {
  const res = await EditForReviewersJournalsAPI({
    aid: forReviewersMessage.value.aid,
    name: forReviewersMessage.value.name,
    content: forReviewersMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改期刊ForReviewers栏内容',
      type: 'success'
    })
    router.back()
  }
}
let aid = ref<string>()
const SaveOrCreateForReviewers = async () => {
  console.log("props.jid",props.jid)
  console.log("props.aid",forReviewersMessage.value.aid)
  const res = await SaveOrCreateForReviewersAPI({
    aid: forReviewersMessage.value.aid,
    jid: props.jid
  })
  if (res.code === 0) {
    forReviewersMessage.value = res.data
    aid.value = res.data.aid
  } else {
    ElMessage.error('出错了！')
    router.replace({
      path: `/back/journalsOther/JournalsForReviewersList/${props.jid}`
    })
  }
}

onMounted(async () => {
  forReviewersMessage.value.aid = props.aid
  await SaveOrCreateForReviewers()
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
