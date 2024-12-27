<template>
  <view style="height: 100%; width: 100%">
    <el-button type="primary" @click="saveArticle()" style="margin-bottom: 10px"
      >save the article
    </el-button>
    <div>正在编辑文章: {{ props.id }} 标题:{{ articleMessage.title }}</div>
    <el-container style="height: 100%">
      <el-row style="height: 4000px; width: 847.5px">
        <main id="sample" class="item" style="width: 847.5px">
          <Editors
            :value="articleMessage.content"
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
          <div style="width: 767.5px;"  v-html="articleMessage.content"
          ></div>
        </view>
      </el-row>
    </el-container>
  </view>
</template>

<script setup lang="ts">
import { onMounted,reactive, ref } from 'vue'
import { EditArticleCommentAPI, SelectArticleContentByIdAPI } from '@/service/ArticleController'
import type { ArticleContentEditVO } from '@/types/Article'
import { ElMessage } from 'element-plus'
import router from '@/router'
import Editors from '@/components/Editors.vue'
// 局部引入
import '@vueup/vue-quill/dist/vue-quill.snow.css'



interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

// 通过watch监听回显，笔者这边使用v-model:content 不能正常回显

const onMdChange = (v: string) => {
  articleMessage.value.content = v;
};

const articleMessage = ref<ArticleContentEditVO>({
  content: '',
  title: '',
  pid: ''
})
const selectArticleContent = async () => {
  const res = await SelectArticleContentByIdAPI(props.id)
  if (res.code === 0) {
    articleMessage.value = res.data
  }
}

// 保存内容
const saveArticle = async () => {
  console.log(props.id)
  const res = await EditArticleCommentAPI({
    pid: props.id,
    content: articleMessage.value.content
  })
  if (res.code === 0) {
    ElMessage({
      message: '成功修改文章内容',
      type: 'success'
    })
    router.push({
      path: '/back/article/ArticleList'
    })
  }
}

onMounted(async () => {
  await selectArticleContent()
  console.log(articleMessage)
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
