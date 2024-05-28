<template>
  <view class="Admin">
    <el-form :rules="rules" :model="context" ref="form" size="large" autocomplete="off">
      <el-form-item prop="title">
        <div style="display: flex">
          <span style="padding-right: 10px">文章标题</span>
          <el-input
            v-model="context.title"
            style="width: 1000px;"
            placeholder="文章标题"
            :maxlength="40"
          />
          <view style="padding-right: 50px" />
          <el-button style="width: 150px;" @click="sbumit(form)"
                     class="submit-button"
                     type="primary">
            保存文章
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MdEditor from '@/components/MdEditor.vue'
import type { submitPost } from '@/types/Post'
import { ElMessage, type FormInstance } from 'element-plus'
import 'bytemd/dist/index.css'
import { handleEditPostAPI, submitPostAPI } from '@/service/PostController'
import router from '@/router'

//文章泛型
const context = ref<submitPost>({})
//文章内容监听
const handleChange = (value: string) => {
  context.value!.content = value
}
//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

// 获取路径传参
interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})


//表单校验规则
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'change' }, {
    min: 2,
    max: 40,
    message: '标题必须为2-40位',
    trigger: 'change'
  }]
}

// 提交文章
const submitPost = async () => {
  const res = await handleEditPostAPI({
    id: props.id,
    title: context.value.title,
    content: context.value.content,
    postAvatar: ''
  })
  if (res.code == 0) {
    ElMessage.success('保存成功!')
    router.push({
      path: '/index/adminPostList'
    })
  }
}

//提交文章前的校验并且校验成功后
const sbumit = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交文章,切勿重复保存',
        type: 'success'
      })
      submitPost()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

// //查询单片文章
// const getAdminPostOne = async () => {
//   const res = await getAdminPostOneAPI(props.id)
//   context.value.title = res.data.title
//   context.value.content = res.data.content
//   context.value.postAvatar = res.data.postAvatar
// }

onMounted(() => {
  // getAdminPostOne()
})

</script>

<style lang="less">

.bytemd {
  height: 750px;
}

.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}


</style>
