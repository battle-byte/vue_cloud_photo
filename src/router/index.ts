import { createRouter, createWebHistory, useRouter } from 'vue-router'
import UserComponents from '../views/back/user/UserComponents.vue'
import adminPostComponents from '../views/back/adminPost/AdminePostComponents.vue'
import adminPostListComponents from '../views/back/adminPost/AdminPostListComponents.vue'
import adminPostEditComponents from '../views/back/adminPost/AdminPostEditComponents.vue'
import PeriodicalComponents from '../views/back/active/PeriodicalComponents.vue'
import PeriodicalListComponents from '../views/back/active/PeriodicalListComponents.vue'
import PeriodicalEditComponents from '../views/back/active/PeriodicalEditComponents.vue'
import LoginPage from '@/views/login/LoginPage.vue'
import Index from '@/views/back/Index.vue'
import TestIndex from '@/views/Test/TestIndex.vue'
import TestApp from '@/views/Test/TestApp.vue'
import AppComponents from '@/views/back/AppComponent/AppComponents.vue'
import AppDetail from '@/views/back/AppComponent/AppDetail.vue'
import HomeComponents from '@/views/back/Home/HomeComponents.vue'
import AddAPP from '@/views/back/add/AddAPP.vue'
import AppUpdate from '@/views/back/AppComponent/AppUpdate.vue'
import AddQuestion from '@/views/back/add/AddQuestion.vue'
import AddScoringResult from '@/views/back/add/AddScoringResult.vue'
import AddScoringResultDetail from '@/views/back/add/AddScoringResult.vue'
import ScoringResultComponents from '@/views/back/scoringResult/ScoringResultComponents.vue'
import UserAnswerComponents from '@/views/back/userAnaser/UserAnswerComponents.vue'
import AnswerResultPage from '@/views/back/Home/user/AnswerResultPage.vue'
import DoAnswerPage from '@/views/back/Home/user/DoAnswerPage.vue'
import MyAnswerPage from '@/views/back/Home/user/MyAnswerPage.vue'
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
      path: '/index',
      name: 'admin',
      component: Index,
      children: [
        //子路由
        { path: '/index/home', name: 'home', component: HomeComponents }, //首页
        { path: '/index/user', name: 'user', component: UserComponents }, //用户页面
        { path: '/index/adminPost', name: 'adminPost', component: adminPostComponents }, //官方文章添加页面
        { path: '/index/adminPostList', name: 'adminPostList', component: adminPostListComponents }, //官方文章管理页面
        {
          path: '/index/adminPostEdit/:id',
          name: 'adminPostEdit',
          props: true,
          component: adminPostEditComponents
        }, //官方文章编辑页面
        { path: '/index/periodical', name: 'periodical', component: PeriodicalComponents }, //活动添加页面
        {
          path: '/index/periodicalList',
          name: 'periodicalList',
          component: PeriodicalListComponents
        }, //活动列表页面
        {
          path: '/index/periodicalEdit/:id',
          name: 'periodicalEdit',
          props: true,
          component: PeriodicalEditComponents
        }, //活动编辑
        {
          path: '/index/appList',
          name: 'periodicalEdit',
          component: AppComponents
        }, //应用列表
        {
          path: '/index/appDetail/:id',
          name: 'appDetail',
          props: true,
          component: AppDetail
        }, //应用详情页
        {
          path: '/index/addApp',
          name: 'addApp',
          component: AddAPP
        }, //创建应用
        {
          path: '/index/appUpdate/:id',
          name: 'AppUpdate',
          props: true,
          component: AppUpdate
        }, //修改应用
        {
          path: '/index/addQuestion/:id',
          name: 'AddQuestion',
          props: true,
          component: AddQuestion
        }, //添加题目
        {
          path: '/index/addScoringResult/:id',
          name: 'AddScoringResult',
          props: true,
          component: AddScoringResult
        }, //添加评分规则
        {
          path: '/index/addScoringResultDetail',
          name: 'AddScoringResultDetail',
          component: AddScoringResultDetail
        }, //评分规则页面UserAnswerComponents
        {
          path: '/index/scoringResultComponents',
          name: 'ScoringResultComponents',
          component: ScoringResultComponents
        }, //评分规则页面
        {
          path: '/index/userAnswerComponents',
          name: 'UserAnswerComponents',
          component: UserAnswerComponents
        }, //用户答题结果页面 管理员使用
        {
          path: '/index/answerResultPage/:id',
          name: 'AnswerResultPage',
          props: true,
          component: AnswerResultPage
        }, //用户打题结果展示分析页面
        {
          path: '/index/doAnswerPage/:id',
          name: 'DoAnswerPage',
          props: true,
          component: DoAnswerPage
        }, //用户答题页面
        {
          path: '/index/myAnswerPage',
          name: 'MyAnswerPage',
          component: MyAnswerPage
        } //用户答题结果页面 用户使用
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'login2',
      // redirect: '/login',
      component: LoginPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestIndex,
      children: [
        //子路由
        { path: '/text/textApp', name: 'textApp', component: TestApp }
      ]
    }
  ]
})

// //路由守卫
// router.beforeEach((to, form, next) => {
//   const admin = adminStore()
//   const user = userStore()
//   //token不存在就跳转到登录页面
//   const adminToken = admin.admin?.token
//   const userToken = user.user?.token
//   if (!adminToken && !userToken && to.name === 'login') { //管理员和用户token不存在并且页面是login 不跳转
//     next()
//     return
//   } else if (!adminToken && !userToken && to.name !== 'login') { //管理员和用户token不存在 并且页面不是登录页面 跳转到登录页面
//     next('/login')
//     return
//   } else if (adminToken && to.name === 'userIndex') { // 登录信息为管理员却进入用户页面 直接返回登录页面
//     next('/login')
//     return
//   } else if (userToken && to.name === 'admin') { // 登录信息为用户却进入管理员页面 直接返回登录页面
//     next('/login')
//     return
//   } else { // 其他情况不跳转
//     next()
//   }
// })

export default router
