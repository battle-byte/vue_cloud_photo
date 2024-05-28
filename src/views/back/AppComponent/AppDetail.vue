<template>
  <view class="AppDetail">
    <el-card>
      <el-row style="border-bottom: 20px; height: 100%">
        <el-col :span="12">
          <view style="border-bottom: 16px">
            <span style="font-size: 55px">{{ AppMessage.appName }}</span>
            <view style="display: flex; padding-bottom: 20px"></view>
            <p style="font-size: 30px">创建时间: {{ AppMessage.createTime }}</p>
            <view style="display: flex; padding-bottom: 20px"></view>

            <p style="font-size: 30px; width: 100%; height: 150px">
              应用描述: {{ AppMessage.appDesc }}
            </p>
            <p style="font-size: 30px">
              应用类型: {{ AppMessage.appType === 0 ? '得分类' : '测评类' }}
            </p>
            <view style="display: flex; padding-bottom: 20px"></view>
            <view style="display: flex; padding-bottom: 20px"></view>
            <p style="font-size: 30px">
              评分策略: {{ AppMessage.scoringStrategy === 0 ? '自定义' : 'AI测评' }}
            </p>
            <view style="display: flex; padding-bottom: 20px"></view>
            <view style="display: flex; padding-bottom: 20px"></view>
            <view style="display: flex; padding-bottom: 20px"></view>
            <p style="font-size: 30px; display: flex">
              <el-space>
                {{ '作者:' }}
                <div style="display: flex; align-items: center; padding-left: 20px; color: #102129">
                  <el-image
                    style="border-radius: 50%; width: 150px"
                    :size="24"
                    :src="AppMessage.user?.userAvatar"
                  />
                  <text style="display: flex; align-items: center; padding-left: 30px">
                    {{ AppMessage.user?.userName ?? '佚名' }}
                  </text>
                </div>
              </el-space>
            </p>
          </view>
          <el-space>
            <view style="display: flex; padding-bottom: 100px"></view>
            <el-button @click="doQuestion()" type="primary" style="font-size: 30px; border-width: 25px"
              >开始答题
            </el-button>
            <el-button type="info" style="font-size: 30px; border-width: 25px">分享应用</el-button>
            <el-button @click="addQuestion()" v-if="isMy" type="info" style="font-size: 30px; border-width: 25px"
              >设置题目
            </el-button>
          </el-space>
          <el-space v-if="isMy" style="padding-left: 7px">
            <el-button @click="addScoringResult()" type="info" style="font-size: 30px; border-width: 25px">设置评分</el-button>
            <el-button @click="updateApp()" type="info" style="font-size: 30px; border-width: 25px"
              >修改应用
            </el-button>
          </el-space>
        </el-col>
        <el-col :span="12">
          <div style="padding: 14px">
            <div class="bottom">
              <img :src="AppMessage.appIcon" class="image" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { computed, onMounted, ref } from 'vue'

import { ElMessage } from 'element-plus'
import { handleEditAPI } from '@/service/AdminController'

import { getAppVOByIdAPI } from '@/service/AppController'
import type { AppVO } from '@/types/App'
import type { adminMessage, UserVO } from '@/types/Admin'
import { userStore } from '@/stores'
import router from '@/router'
import { addScoringResultAPI } from '@/service/ScroingResultController'
import AddScoringResult from '@/views/back/add/AddScoringResult.vue'

// 获取路径传参
interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

const AppMessage = ref<AppVO>([])

//pinia存储用户信息
const userMessageStore = userStore()
let loginUserId = userMessageStore.user.id
//判断当前用户判断是否是创建应用的人
// computed函数可以保证当值发生变化的时候 重新进行计算
const isMy = computed(() => {
  return loginUserId != null && loginUserId === AppMessage.value.userId
})

//确认提交表单
const submit = async () => {
  dialogFormVisible.value = false
  const res = await handleEditAPI({
    id: userMessage.value.id,
    userName: userMessage.value.userName,
    userProfile: userMessage.value.userProfile
  })
  if (res.code == 0) {
    ElMessage.success('修改成功')
    getAppMessageList(userPage.value.page, userPage.value.pageSize)
    ElMessage.success('已更新用户数据')
  }
}

//获取用户信息
const getAppMessageList = async () => {
  const res = await getAppVOByIdAPI(props.id)
  //将后端的内容添加到集合内
  AppMessage.value = res.data
}


// 用户修改题目
const addQuestion = () => {
  router.push({
    path: `/index/addQuestion/${props.id}`
  })
}

// 用户修改题目
const doQuestion = () => {
  router.push({
    path: `/index/doAnswerPage/${props.id}`
  })
}


// 用户添加评分策略
const addScoringResult = () => {
  router.push({
    path: `/index/AddScoringResult/${props.id}`
  })
}

// 用户修改题目
const updateApp = () => {
  router.push({
    path: `/index/appUpdate/${props.id}`
  })
}

onMounted(() => {
  getAppMessageList()
})
</script>

<style scoped lang="less"></style>
