<template>
  <!--  顶部header部分-->
  <view>
    <div class="header-container">
      <div class="l-content">
        <el-button size="small" :icon="Menu" @click="updateTab" />
        <h3>{{ userMessageValue?.userName }}</h3>
      </div>
      <div class="r-content">
        <el-dropdown>
          <span class="el-dropdown-link">
            <!--个人头像-->
            <img class="avatar" :src="userMessageValue?.userAvatar" alt="" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!--              <el-dropdown-item></el-dropdown-item>-->
              <el-dropdown-item @click="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </view>
</template>
<script setup lang="ts">
import { Search, Menu } from '@element-plus/icons-vue'
import { adminStore, tabClick, userStore } from '@/stores'
import router from '@/router'
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

//退出登录
const logOut = () => {
  adminMessage.removeAdmin()
  router.push({
    path: '/login'
  })
}
</script>

<style scoped lang="less">
.header-container {
  background-color: #3f3e3e;
  height: 60px;
  display: flex;
  justify-content: space-between;
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
