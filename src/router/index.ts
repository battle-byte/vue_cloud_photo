import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/login/LoginPage.vue'
import AdminIndex from '@/views/Admin/AdminIndex.vue'

import { userStore } from '@/stores'
import UsersList from '@/views/Admin/back/users/UsersList.vue'
import UsersCreate from '@/views/Admin/back/users/UsersCreate.vue'
import UsersUpdate from '@/views/Admin/back/users/UsersUpdate.vue'
import UserIndex from '@/views/user/UserIndex.vue'
import PictureAdd from '@/views/user/picture/PictureAdd.vue'
import PictureManage from '@/views/Admin/back/picture/PictureManage.vue'
import HomePage from '@/views/user/home/HomePage.vue'
import PictureDetailPage from '@/views/user/picture/PictureDetailPage.vue'
import PictureBatch from '@/views/user/picture/PictureBatch.vue'
import RoleManage from '@/views/Admin/back/role/RoleManage.vue'
import RoleRuleManage from '@/views/Admin/back/role/RoleRuleManage.vue'
import SpaceManage from '@/views/Admin/back/space/SpaceManage.vue'
import SpaceAdd from '@/views/user/space/SpaceAdd.vue'
import MySpace from '@/views/user/my_space/MySpace.vue'
import SpaceDetail from '@/views/user/space/SpaceDetail.vue'
import PictureSearch from '@/views/user/picture/PictureSearch.vue'
import SpaceAnalyze from '@/views/user/space/SpaceAnalyze.vue'
import SpaceUserManagePage from '@/views/user/space/SpaceUserManagePage.vue'
// createRouter创建路由实例
// 配置history模式
// 1. history模式：createWebHistory 地址栏不带#
// 2. hash模式：createWebHashHistory
// console.log(import.meta.env.BASE_URL)

// vite中的环境变量 import.meta.env.BASE_URL 就是vite.config.js中的base配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 管理员后台
      path: '/back',
      name: 'admin',
      component: AdminIndex,
      children: [
        {
          // 用户列表
          path: '/back/users/UsersList',
          name: 'UsersList',
          component: UsersList
        },
        {
          //用户创建
          path: '/back/users/UsersCreate',
          name: 'UsersCreate',
          component: UsersCreate
        },
        {
          // 用户基础信息修改
          path: '/back/users/UsersUpdate/:id',
          name: 'UsersUpdate',
          props: true,
          component: UsersUpdate
        },
        {
          //图片列表
          path: '/back/picture/picture_list',
          name: 'PictureManage',
          component: PictureManage
        },
        {
          //角色列表
          path: '/back/role/role_list',
          name: 'RoleManage',
          component: RoleManage
        },
        {
          //角色列表
          path: '/back/role/role_apis',
          name: 'RoleRuleManage',
          props: true,
          component: RoleRuleManage
        },
        {
          //角色列表
          path: '/back/space/space_list',
          name: 'SpaceManage',
          component: SpaceManage
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'index',
      component: UserIndex,
      children:[
        { path: '/picture_add',
          name: 'picture_add',
          props: true,
          component: PictureAdd
        },
        { path: '/',
          name: 'home',
          props: true,
          component: HomePage
        },
        { path: '/picture_detail/:id',
          name: 'picture_detail',
          props: true,
          component: PictureDetailPage
        },
        { path: '/picture_batch',
          name: 'picture_batch',
          component: PictureBatch
        },
        { path: '/space_add',
          name: 'space_add',
          props: true,
          component: SpaceAdd
        },
        { path: '/my_space',
          name: 'my_space',
          component: MySpace
        },
        { path: '/space_detail/:id',
          name: 'space_detail',
          props: true,
          component: SpaceDetail
        },
        { path: '/search_picture/:id',
          name: 'search_picture',
          props: true,
          component: PictureSearch
        },
        {
          path: '/space_analyze',
          name: '空间分析',
          props: true,
          component: SpaceAnalyze,
        },
        {
          path: '/space_user_manage/:id',
          name: '空间成员管理',
          component: SpaceUserManagePage,
          props: true,
        },
      ]
    },
  ]
})

// 路由守卫 简单的保护页面路由 真正的保护还得靠后台权限校验
router.beforeEach((to, form, next) => {
  const user = userStore()
  // 用户不存在 随意访问
  if (!user ){
    next()
  } else if ((to.name === 'admin') &&  user.user?.rid==2 ){ //用户存在并且访问后台页面
    next('/login')
    return
  }else {
    // 其他情况不跳转
    next()
  }
})

export default router
