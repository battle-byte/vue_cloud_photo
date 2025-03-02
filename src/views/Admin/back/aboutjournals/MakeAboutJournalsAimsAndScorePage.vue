<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveAboutJournals()" style="margin-bottom: 10px"
      >save the article
    </el-button>
    <div>文章目的</div>
    <div>正在编辑高校: {{ props.id }} 标题:{{ aboutJournalsMessage.journalsName }}</div>
    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="aboutJournalsMessage.content"
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
          <div v-html="aboutJournalsMessage.content"></div>
        </view>
      </el-row>
    </el-container>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import type { AboutJournalsVO } from '@/types/Aboutjournals'
import { EditAboutJournalsAPI, SelectAboutJournalsAPI } from '@/service/AboutJournalsController'
import Editors from '@/components/Editors.vue'

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

const aboutJournalsMessage = ref<AboutJournalsVO>({
  content: '',
  status: 2,
  jid: ''
})
const onMdChange = (v: string) => {
  aboutJournalsMessage.value.content = v;
};

// 根据id查询内容
const selectAboutJournalsContent = async () => {
  const res = await SelectAboutJournalsAPI({
    jid: props.id,
    status: 2 // 高校目的
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
    status: 2
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改高校的高校目的内容',
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
