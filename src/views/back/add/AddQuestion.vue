<template>
  <view class="AddAPP">
    <span style="font-size: 40px; padding-bottom: 20px; border-bottom: 20px">创建应用题目</span>
    <p style="font-size: 22px; padding-top: 10px">
      正在设置应用：{{ props.id }} {{ AppMessage.appName }}
    </p>
    <view style="display: flex; font-size: 40px; padding-bottom: 20px; border-bottom: 20px"></view>
    <el-form label="题目列表" :model="AppMessage" size="large" autocomplete="off">
      <!-- 题目开发 -->
      <el-form-item v-for="(question, index) in questionContent" :key="index">
        <div style="padding-bottom: 20px">
          <el-space style="border-bottom: 100px; padding-bottom: 15px">
            <h3 style="font-size: 25px">题目{{ index + 1 }}</h3>
            <view style="padding-right: 20px"></view>
            <el-button @click="addDomain(index)" type="primary">添加题目</el-button>
            <view style="padding-right: 20px"></view>
            <el-button @click="removeDomain(index)" type="danger">删除题目</el-button>
          </el-space>

          <el-form :rules="rulesTitle" ref="formTitle" :model="question">
            <el-form-item label-width="100px" prop="title" :label="`题目${index + 1}标题`">
              <el-input
                :maxlength="30"
                :minlength="1"
                name="title"
                placeholder="请输入题目标题"
                v-model="question.title"
                style="width: 300px; padding-bottom: 20px"
              />
            </el-form-item>
          </el-form>

          <!--题目选项-->
          <view style="padding-top: 200px; border-bottom: 10px"></view>
          <el-space>
            <h3 style="font-size: 20px; padding-top: 0px">题目{{ index + 1 }}选项列表</h3>
            <view style="padding-right: 20px"></view>
            <el-button @click="addDomainOptions(question, question.options?.length)" type="primary"
              >底部添加题目选项
            </el-button>
            <view style="padding-right: 20px"></view>
            <el-button
              @click="removeDomainOptions(question, question.options?.length - 1)"
              type="danger"
              >删除题目选项
            </el-button>
          </el-space>
          <view style="border-bottom: 20px"></view>
          <!--选项嵌套-->
          <el-form-item
            label-width="100px"
            prop="options"
            v-for="(itemTwo, indexTwo) in question.options"
            :key="indexTwo"
          >
            <view style="border-bottom: 20px; padding-top: 60px"></view>
            <el-space>
              <h3 style="font-size: 20px">选项{{ indexTwo + 1 }}</h3>
              <view style="padding-right: 20px"></view>
              <el-button @click="addDomainOptions(question, indexTwo)" type="primary"
                >添加选项
              </el-button>
              <view style="padding-right: 20px"></view>
              <el-button @click="removeDomainOptions(question, indexTwo)" type="danger"
                >删除选项
              </el-button>
            </el-space>
            <el-form :rules="rulesOptions" ref="formOptions" :model="itemTwo">
              <el-space>
                <el-form-item prop="key" label-width="100px" label="选项 Key">
                  <el-input
                    placeholder="请输入选项"
                    :minlength="1"
                    :maxlength="2"
                    v-model="itemTwo.key"
                    style="width: 100px"
                  />
                </el-form-item>
                <el-form-item prop="value" label-width="100px" label="选项值">
                  <el-input
                    placeholder="请输入选项值"
                    :minlength="1"
                    :maxlength="20"
                    v-model="itemTwo.value"
                    style="width: 350px"
                  />
                </el-form-item>
                <el-form-item prop="result" label-width="100px" label="选项结果">
                  <el-input
                    placeholder="请输入选项结果"
                    :minlength="1"
                    :maxlength="10"
                    v-model="itemTwo.result"
                    style="width: 175px"
                  />
                </el-form-item>
                <el-form-item prop="score" label-width="100px" label="选项得分">
                  <el-input
                    placeholder="请输入选项得分"
                    :minlength="1"
                    :maxlength="10"
                    v-model="itemTwo.score"
                    style="width: 200px"
                  />
                </el-form-item>
              </el-space>
            </el-form>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="ensureTitle(formTitle, formOptions)">提交题目</el-button>
        <el-button @click="addDomain(questionContent.length)">底层增加新题目</el-button>
      </el-form-item>
    </el-form>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import { getAppVOByIdAPI } from '@/service/AppController'
import type { AppAddDTO } from '@/types/App'
import type { QuestionContentDTO, QuestionVO } from '@/types/Question'
import {
  addQuestionAPI,
  editQuestionAPI,
  listQuestionVOByPageAPI
} from '@/service/QuestionController'
import router from '@/router'

const AppMessage = ref<AppAddDTO>([])

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

// 题目列表
const questionContent = ref<QuestionContentDTO[]>([])

//表单校验
const formTitle = ref<InstanceType<typeof FormInstance>>()

const formOptions = ref<InstanceType<typeof FormInstance>>()

const rulesTitle = {
  title: [
    { required: true, message: '题目标题不能为空', trigger: 'change' },
    {
      min: 1,
      max: 30,
      message: '题目标题必须为1-30位',
      trigger: 'change'
    }
  ]
}

const rulesOptions = {
  key: [
    { required: true, message: '选项不能为空', trigger: 'change' },
    {
      min: 1,
      max: 2,
      message: '选项必须1~2为位',
      trigger: 'change'
    }
  ],
  value: [
    { required: true, message: '选项值不能为空', trigger: 'change' },
    {
      min: 1,
      max: 20,
      message: '选项值必须为1-20位',
      trigger: 'change'
    }
  ],
  result: [
    { required: true, message: '选项值不能为空', trigger: 'change' },
    {
      min: 1,
      max: 10,
      message: '选项值必须为1-20位',
      trigger: 'change'
    }
  ],
  score: [
    { required: true, message: '选项值不能为空', trigger: 'change' },
    {
      min: 1,
      max: 10,
      message: '选项值必须为1-20位',
      trigger: 'change'
    }
  ]
}

//提交选项前校验标题并且校验成功后
const ensureTitle = async (
  formTitle: InstanceType<typeof FormInstance> | undefined,
  formOptions: InstanceType<typeof FormInstance> | undefined
) => {
  // 第一层题目校验
  if (!formTitle) return
  await formTitle[0].validate((valid: any, fields: any) => {
    if (valid) {
      // 第二层选项校验
      if (!formOptions) return
      formOptions[0].validate((valid: any, fields: any) => {
        if (valid) {
          //提示成功信息
          ElMessage({
            message: '正在提交选项,切勿重复保存',
            type: 'success'
          })
          //提交选项
          handleSubmit()
        } else {
          ElMessage.error('请合理填写信息！')
        }
      })
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

//获取初始信息
const getAPpMessage = async () => {
  const res = await getAppVOByIdAPI(props.id)
  AppMessage.value = res.data
}

//splice函数可以实现多种数组操作 删除 替换 插入
// 移除题目
const removeDomain = (index: number) => {
  if (index !== -1) {
    questionContent.value.splice(index, 1)
  }
}

//添加题目
const addDomain = (index: number) => {
  questionContent.value.splice(index, 0, {
    title: '',
    options: []
  })
}

//添加题目选项
const addDomainOptions = (question: QuestionContentDTO, index: number) => {
  question.options.splice(index, 0, {
    key: '',
    value: ''
  })
}

// 移除题目选项
const removeDomainOptions = (question: QuestionContentDTO, index: number) => {
  if (index !== -1) {
    question.options.splice(index, 1)
  }
}

/*
 * 获取App原先得题目列表
 * */
const oldQuestion = ref<QuestionVO>()

const getOldQuestionMessage = async () => {
  const res = await listQuestionVOByPageAPI({
    appId: props.id,
    page: 1,
    pageSize: 1
  })
  console.log(res.data.records[0])
  if (res.code === 0 && res.data.total > 0) {
    oldQuestion.value = res.data.records[0]
    console.log(oldQuestion.value)
    questionContent.value = res.data.records[0].questionContent
    console.log(questionContent.value)
  }
}

//提交 判断是修改还是提交新信息
const handleSubmit = async () => {
  if (!props.id || !questionContent.value) {
    return
  }
  let res: any
  // 有旧的信息 修改
  if (oldQuestion.value?.id) {
    res = await editQuestionAPI({
      questionContentDTO: questionContent.value,
      id: oldQuestion.value?.id
    })
    if (res.code === 0) {
      router.push({
        path: `/index/appDetail/${props.id}`
      })
    }
  } else {
    //没有旧的信息 更新
    res = await addQuestionAPI({
      appId: props.id,
      questionContentDTO: questionContent.value
    })
    if (res.code === 0) {
      router.push({
        path: `/index/appDetail/${props.id}`
      })
    }
  }
}

onMounted(() => {
  getAPpMessage()
  getOldQuestionMessage()
})
</script>

<style scoped lang="less"></style>
