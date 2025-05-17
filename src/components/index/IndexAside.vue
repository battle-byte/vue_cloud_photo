<template>
  <div style="background-color: #f7f8f9">
    <view style="height: 100%">
      <el-col :span="12" style="background-color: #000000">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          default-active="0"
          style="height: 100%"
        >
          <view v-for="(item, index) in fixedMenuItems.values()">
            <el-menu-item @click="clickMenu(item.path)" :key="item.name" :index="item.name">
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </view>
        </el-menu>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#fff"
          class="el-menu-vertical-demo"
          text-color="#000000FF"
          @open="handleOpen"
          @close="handleClose"
          style="height: 100%"
        >
          <view>
            <el-menu-item-group v-if="menuItems.side.length>0"  :title="menuItems.name">
              <el-menu-item
                v-for="(item,index) in menuItems.side"
                @click="clickMenu(item.path)"
                :key="item.name"
                :index="item.name"
              >
                <template v-slot:title>
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </view>
        </el-menu>
      </el-col>
    </view>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { spaceRoleStore, tabClick, userStore } from '@/stores'
import type { AdminAside, Aside } from '@/components/Aside'
import { SPACE_TYPE_ENUM } from '@/types/space'
import type { SpaceUserAndSysUser, SpaceUserListData, SpaceUserListResponse } from '@/types/space_user'
import { ElMessage } from 'element-plus'
import { SpaceUserListAPI } from '@/service/SpaceUserController'
//获取当前登录用户权限 如果权限不足则不能进入对应页面
const userMessage = userStore()
const spaceRole = spaceRoleStore()
const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
//跳转页面的路由实例
const router = useRouter()
const tab = tabClick()

// 表单项
const fixedMenuItems = ref<Aside[]>([
  {
    path: '/',
    name: '公共空间',
    label: '公共空间',
    icon: 's-home'
  },
  {
    path: '/my_space',
    name: '我的空间',
    label: '我的空间',
    icon: 's-home'
  },
  {
    path:'/space_add?type=' + SPACE_TYPE_ENUM.TEAM,
    name: '创建团队',
    label: '创建团队',
    icon: 's-home'
  }
])


const teamSpaceList = ref<SpaceUserListData[]>([])

const menuItems = ref<AdminAside>({ name: '', side: [] })

// 加载团队空间列表
const fetchTeamSpaceList = async () => {
  const res = await SpaceUserListAPI({})
  if (res.code === 0) {
    teamSpaceList.value = res.data.record
    menuItems.value.name = "我加入的空间"
    menuItems.value.side = teamSpaceList.value.map((spaceUser) => {
      return {
        label: spaceUser?.spaceName,
        name: spaceUser?.spaceName,
        path: '/space_detail/' + spaceUser.spaceId,
        icon: 's-home'
      }
    })
  } else {
    ElMessage.error('加载我的团队空间失败')
  }
}

/**
 * 监听变量，改变时触发数据的重新加载
 */
onMounted(() => {
  // 登录才加载
  const loginUserStore = userStore().user
  if (loginUserStore || loginUserStore!=null) {
    fetchTeamSpaceList()
  }
})



//点击跳转页面设置
const clickMenu = (path: string) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}

.el-menu {
  //el-menu-vertical-demo的子标签
  /* 左侧全局导航栏 占满屏幕 */
  height: 100vh;

  h3 {
    color: #f7f8f9;
    text-align: center;
    // 上下间距
    line-height: 48px;
    // 文字大小 注意一定要小 因为标签是h3
    font-size: 1pc;
  }
}

.el-menu {
  border-right: none;
}
</style>
