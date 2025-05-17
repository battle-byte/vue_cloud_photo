<template>
    <el-menu
      active-text-color="#ffd04b"
      text-color="#000000"
      background-color="#ffffff"
      mode="horizontal"
      :ellipsis="false"
      default-active="0">

      <el-menu-item index="0">
        <img
          style="width: 50px"
          src="../../assets/favicon-16x16.png"
          alt="Element logo"
          @click="clickMenu('/')"
        />
      </el-menu-item>
      <view v-for="(item,index) in indexAside.values()">
        <el-menu-item :index="index"  v-if="checkIndexRole(item.role)" @click="clickMenu(item.path)">{{item.name}}</el-menu-item>
      </view>
      <el-menu-item index="6">
        <el-button type="primary" v-if="checkRole()" @click="$router.push(`/back`)" >点我去后台</el-button>
      </el-menu-item>
      <el-menu-item v-if="loginUser"  index="7">
        <el-tag >我的id:{{loginUser?.uid}}</el-tag>
      </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {  tabClick, userStore } from '@/stores'
import type { Aside, AsideIndex } from '@/components/Aside'
// import router from '@/router'
//获取当前登录用户权限 如果权限不足则不能进入对应页面
const user = userStore()
const loginUser = user.user
const checkRole = () =>{
  return !!(loginUser && (loginUser.rid == 1 || loginUser.rid == 3));
}

const checkIndexRole = (indexRole:number) =>{
  if (loginUser && (loginUser.rid == 1 || loginUser.rid == 3) ){
    return true
  }
  return indexRole == 1;
}

const handleOpen = (key: string, keyPath: string[]) => {

}
const handleClose = (key: string, keyPath: string[]) => {

}
//跳转页面的路由实例
const router = useRouter()
const tab = tabClick()


// 表单项
const indexAside = ref<AsideIndex[]>(
[{
  path: '/',
  label: 'home',
  name: '首页',
  icon: 's-home',
  role: 1,
},{
  path: '/login',
  name: '登录',
  label: 'login',
  icon: 's-home',
  role: 1,
},{
  path: '/picture_add',
  name: '添加图片',
  label: 'login',
  icon: 's-home',
  role: 1,
},{
  path: '/space_add',
  name: '创建空间',
  label: 'space',
  icon: 's-home',
  role: 1,
},{
  path: '/picture_batch',
  name: '抓取图片',
  label: 'login',
  icon: 's-home',
  role: 2,
}])

//点击跳转页面设置
const clickMenu = (path: string) => {
  router.push({
    path: path,
    replace: true
  })
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

// 设置菜单在后方 数字代表从第几个标题标题开始放置最后方
.el-menu--horizontal > .el-menu-item:nth-child(6) {
  margin-right: auto;
}

</style>
