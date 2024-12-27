<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the Focus
    </el-button>
    <div style="margin-bottom: 10px">
      正在编辑期刊: {{ props.jid }}的Focus栏 期刊标题:{{ focusMessage.journalsName }}
    </div>
    <div style="margin-bottom: 10px">
      正在编辑的Focus栏ID: {{ focusMessage.aid }} Focus栏标题:{{ focusMessage.name }}
    </div>

    <el-row>
      <el-text style="margin-left: 10px">Focus栏标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px"
        v-model="focusMessage.name"
        placeholder="Focus栏标题"
      ></el-input>
    </el-row>

    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="focusMessage.content"
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
          <div style="width: 767.5px" v-html="focusMessage.content"></div>
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
import { EditFocusJournalsAPI, SaveOrCreateFocusAPI } from '@/service/FocusController'
import type { FocusContent } from '@/types/Focus'
import Editors from '@/components/Editors.vue'
const onMdChange = (v: string) => {
  focusMessage.value.content = v;
};
interface Props {
  aid: string
  jid: string
}

const props = withDefaults(defineProps<Props>(), {
  aid: () => '',
  jid: () => ''
})

const focusMessage = ref<FocusContent>({
  content: '',
  name: '',
  aid: '',
  journalsName: ''
})

// 保存内容
const saveArticle = async () => {
  const res = await EditFocusJournalsAPI({
    aid: focusMessage.value.aid,
    name: focusMessage.value.name,
    content: focusMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改期刊Focus栏内容',
      type: 'success'
    })
    router.back()
  } else {
  }
}
const SaveOrCreateFocus = async () => {
  const res = await SaveOrCreateFocusAPI({
    aid: focusMessage.value.aid,
    jid: props.jid
  })
  if (res.code === 0) {
    focusMessage.value = res.data
    focusMessage.value.aid = res.data.aid
  }else {
    ElMessage.error('出错了！')
    router.replace({
      path: `/back/journalsOther/JournalsFocusList/${props.jid}`
    })
  }
}
onMounted(async () => {
  focusMessage.value.aid = props.aid
  await SaveOrCreateFocus()
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
