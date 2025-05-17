<template>
  <view>
    <div class="header-container">
      <div class="l-content" style="">
        <el-button size="small" :icon="Menu" @click="updateTab" />
      </div>
      <el-row>
        <el-text
          @click="openHomeInNewTab"
          style="color: #f2f2f2; margin-left: 150px; font-size: 30px; cursor: pointer;">
          Dream Cloud Chart
        </el-text>
        <div>
          <el-dropdown>
            <el-text style="color: #f2f2f2; margin-top: 10px; font-size: 20px; margin-left: 200px">
              当前登录用户:{{userMessage.user!.username }}
            </el-text>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </view>
</template>
<script setup lang="ts">
import {  Menu } from '@element-plus/icons-vue'
import { tabClick, userStore } from '@/stores'
import router from '@/router'
import { ref } from 'vue'


const dialogFormVisible = ref(false)
//获取导航栏伸缩属性
const tab = tabClick()
//使导航栏伸缩
const updateTab = () => {
  if (tab.tab == false) {
    tab.setTab(true)
  } else {
    tab.setTab(false)
  }
}
//获取的登录属性值
const userMessage = userStore()
const userMessageValue = userMessage.user

// userUpdateMessage.value.userName = userMessageValue?.userName
// userUpdateMessage.value.userAvatar = userMessageValue?.userName

//退出登录
const logOut = () => {
  userMessage.removeUser()
  router.push({
    path: '/'
  })
}

//修改个人信息
const updateUserMessage = () => {
  dialogFormVisible.value = true
}

const openHomeInNewTab = () => {
  window.open(window.location.origin + '/', '_blank');
}

//取消提交表单
const cancel = () => {
  dialogFormVisible.value = false
}
</script>

<style scoped lang="less">
.header-container {
  background-color: #295d72;
  height: 60px;
  display: flex;
  //justify-content: space-between;
  align-items: center; //纵轴垂直剧中
  padding: 0 20px; //左右边距20px
  .l-content {
    display: flex;

    h3 {
      padding-left: 10px;
      color: #f2f2f2;
    }
  }

  .r-content {
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
