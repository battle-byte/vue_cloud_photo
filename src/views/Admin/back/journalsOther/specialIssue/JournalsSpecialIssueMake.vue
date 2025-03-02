<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the SpecialIssue
    </el-button>
    <div style="margin-bottom: 10px">
      正在编辑高校: {{ props.jid }}的SpecialIssue栏 高校标题:{{ specialIssueMessage.journalsName }}
    </div>
    <div style="margin-bottom: 10px">
      正在编辑的SpecialIssue栏ID: {{ specialIssueMessage.aid }} SpecialIssue栏标题:{{
        specialIssueMessage.name
      }}
    </div>

    <el-row>
      <el-text style="margin-left: 10px">SpecialIssue栏标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px"
        v-model="specialIssueMessage.name"
        placeholder="SpecialIssue栏标题"
      ></el-input>
    </el-row>

    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="specialIssueMessage.content"
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
          <ShowText :value="specialIssueMessage.content"></ShowText>
<!--          <div style="width: 767.5px" v-html="specialIssueMessage.content"></div>-->
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
  EditSpecialIssueJournalsAPI,
  SaveOrCreateSpecialIssueAPI
} from '@/service/SpecialIssueController'
import type { SpecialIssueContent } from '@/types/SpecialIssue'
import Editors from '@/components/Editors.vue'
import ShowText from '@/components/ShowText.vue'
const onMdChange = (v: string) => {
  specialIssueMessage.value.content = v;
};
interface Props {
  aid: string
  jid: string
}

const props = withDefaults(defineProps<Props>(), {
  aid: () => '',
  jid: () => ''
})

const specialIssueMessage = ref<SpecialIssueContent>({
  content: '',
  name: '',
  aid: '',
  journalsName: ''
})

// 保存内容
const saveArticle = async () => {
  console.log('aid', props.aid)
  console.log('jid', props.jid)
  const res = await EditSpecialIssueJournalsAPI({
    aid: specialIssueMessage.value.aid,
    name: specialIssueMessage.value.name,
    content: specialIssueMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改高校SpecialIssue栏内容',
      type: 'success'
    })
    router.back()
  }
}
const SaveOrCreateSpecialIssue = async () => {
  const res = await SaveOrCreateSpecialIssueAPI({
    aid: specialIssueMessage.value.aid,
    jid: props.jid
  })
  if (res.code === 0) {
    specialIssueMessage.value = res.data
  }else {
    ElMessage.error('出错了！')
    router.replace({
      path: `/back/journalsOther/JournalsSpecialIssueList/${props.jid}`
    })
  }
}

onMounted(async () => {
  specialIssueMessage.value.aid = props.aid
  await SaveOrCreateSpecialIssue()
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
