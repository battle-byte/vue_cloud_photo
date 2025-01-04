<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="addNotice()" style="margin-bottom: 10px"
      >save the article
    </el-button>
    <div>正在添加新的公告:{{noticeMessage.nid}} </div>
    <el-row style="margin-top: 10px;margin-bottom: 10px">
      <el-text style="margin-left: 10px">公告标题</el-text>
      <el-input
        style="width: 745px; margin-left: 10px;"
        v-model="noticeMessage.name"
        placeholder="公告标题"
      ></el-input>
    </el-row>
    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="noticeMessage.comment"
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
          <ShowText :value="noticeMessage.comment"></ShowText>
<!--  <div v-html="noticeMessage.comment"></div>-->
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
import type { NoticeContentEditVO, NoticeContentSaveVODTO } from '@/types/Notice'
import { EditNoticeContentAPi, SaveNoticeBaseAPI, SelectNoticeContentByIdAPI } from '@/service/NoticeController'
import Editors from '@/components/Editors.vue'
import { GenerateOnlyIdAPI } from '@/service/GenerateOnlyId'
import ShowText from '@/components/ShowText.vue'
const onMdChange = (v: string) => {
  noticeMessage.value.comment = v;
};



const noticeMessage = ref<NoticeContentSaveVODTO>({
  comment: '',
  name: '',
  nid: ''
})

const onlyPid = async () => {
  const res = await GenerateOnlyIdAPI()
  if (res.code === 0) {
    noticeMessage.value.nid = res.data
  }
}



// 保存内容
const addNotice = async () => {
  const res = await SaveNoticeBaseAPI({
    nid: noticeMessage.value.nid,
    comment: noticeMessage.value.comment,
    name:noticeMessage.value.name
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功添加公告内容',
      type: 'success'
    })
    router.push({
      path: '/back/notice/NoticeList'
    })
  }
}

onMounted(async () => {
  await onlyPid()
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
