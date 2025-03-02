import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/login/LoginPage.vue'
import ArticleList from '@/views/Admin/back/article/ArticleList.vue'
import AdminIndex from '@/views/Admin/AdminIndex.vue'
import MakePublishPage from '@/views/Admin/back/article/MakePublishPage.vue'
import ArticleUpdate from '@/views/Admin/back/article/ArticleUpdate.vue'
import ArticleCreate from '@/views/Admin/back/article/ArticleCreate.vue'
import JournalsList from '@/views/Admin/back/journals/JournalsList.vue'
import JournalsCreate from '@/views/Admin/back/journals/JournalsCreate.vue'
import JournalsUpdate from '@/views/Admin/back/journals/JournalsUpdate.vue'
import JournalsAddArticleList from '@/views/Admin/back/journals/JournalsAddArticleList.vue'
import TeamList from '@/views/Admin/back/team/TeamList.vue'
import TeamCreate from '@/views/Admin/back/team/TeamCreate.vue'
import TeamUpdate from '@/views/Admin/back/team/TeamUpdate.vue'
import EditorialList from '@/views/Admin/back/editorial/EditorialList.vue'
import EditorialCreate from '@/views/Admin/back/editorial/EditorialCreate.vue'
import EditorialUpdate from '@/views/Admin/back/editorial/EditorialUpdate.vue'
import JournalsAddEditorial from '@/views/Admin/back/journals/JournalsAddEditorial.vue'
import NewsList from '@/views/Admin/back/news/NewsList.vue'
import NewsUpdate from '@/views/Admin/back/news/NewsUpdate.vue'
import NewsCreate from '@/views/Admin/back/news/NewsCreate.vue'
import MakeNewsPage from '@/views/Admin/back/news/MakeNewsPage.vue'
import NoticeList from '@/views/Admin/back/notice/NoticeList.vue'
import MakeNoticePage from '@/views/Admin/back/notice/MakeNoticePage.vue'
import IndexUpdate from '@/views/Admin/back/index/IndexUpdate.vue'
import MakeAboutJournalsPage from '@/views/Admin/back/aboutjournals/MakeAboutJournalsPage.vue'
import MakeAboutJournalsAuthorPage from '@/views/Admin/back/aboutjournals/MakeAboutJournalsAuthorPage.vue'
import UserArticleList from '@/views/Admin/back/userArticle/UserArticleList.vue'
import AdminList from '@/views/Admin/back/admin/AdminList.vue'
import JournalsListOther from '@/views/Admin/back/journals/JournalsListOther.vue'
import JournalsAboutList from '@/views/Admin/back/journalsOther/about/JournalsAboutList.vue'
import JournalsAboutMake from '@/views/Admin/back/journalsOther/about/JournalsAboutMake.vue'
import JournalsSpecialIssueList from '@/views/Admin/back/journalsOther/specialIssue/JournalsSpecialIssueList.vue'
import JournalsSpecialIssueMake from '@/views/Admin/back/journalsOther/specialIssue/JournalsSpecialIssueMake.vue'
import JournalsForAuthorsList from '@/views/Admin/back/journalsOther/forAuthors/JournalsForAuthorsList.vue'
import JournalsForAuthorsMake from '@/views/Admin/back/journalsOther/forAuthors/JournalsForAuthorsMake.vue'
import JournalsForReviewersList from '@/views/Admin/back/journalsOther/forReviewers/JournalsForReviewersList.vue'
import JournalsForReviewersMake from '@/views/Admin/back/journalsOther/forReviewers/JournalsForReviewersMake.vue'
import JournalsFocusList from '@/views/Admin/back/journalsOther/focus/JournalsFocusList.vue'
import JournalsFocusMake from '@/views/Admin/back/journalsOther/focus/JournalsFocusMake.vue'
import MakeAboutJournalsAimsAndScorePage from '@/views/Admin/back/aboutjournals/MakeAboutJournalsAimsAndScorePage.vue'
import MembershipList from '@/views/Admin/back/membership/MembershipList.vue'
import MembershipCreate from '@/views/Admin/back/membership/MembershipCreate.vue'
import MembershipUpdate from '@/views/Admin/back/membership/MembershipUpdate.vue'
import { userStore } from '@/stores'
import NoticeCreate from '@/views/Admin/back/notice/NoticeCreate.vue'
import UserIndex from '@/views/User/UserIndex.vue'
import UserIndexHome from '@/views/User/back/UserIndexHome.vue'
import BannerList from '@/views/Admin/back/banner/BannerList.vue'
import BannerCreate from '@/views/Admin/back/banner/BannerCreate.vue'
import BannerUpdate from '@/views/Admin/back/banner/BannerUpdate.vue'
import ProjectList from '@/views/Admin/back/project/ProjectList.vue'
import ProjectCreate from '@/views/Admin/back/project/ProjectCreate.vue'
import MakeProjectPage from '@/views/Admin/back/project/MakeProjectPage.vue'
import ProjectUpdate from '@/views/Admin/back/project/ProjectUpdate.vue'
import UsersList from '@/views/Admin/back/users/UsersList.vue'
import UsersCreate from '@/views/Admin/back/users/UsersCreate.vue'
import UsersUpdate from '@/views/Admin/back/users/UsersUpdate.vue'
import MakeUsersPage from '@/views/Admin/back/users/MakeUsersPage.vue'
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
          path: '/back/article/MakePublishPage/:id',
          name: 'MakePublishPage',
          props: true,
          component: MakePublishPage
        }, // 修改文章内容
        {
          path: '/back/article/ArticleList',
          name: 'ArticleList',
          component: ArticleList
        }, // 管理文章列表
        {
          path: '/back/article/ArticleUpdate/:id',
          name: 'ArticleUpdate',
          props: true,
          component: ArticleUpdate
        }, // 文章基础编辑列表
        {
          path: '/back/article/ArticleCreate',
          name: 'ArticleCreate',
          component: ArticleCreate
        }, // 创建文章基本内容列表

        ///////////////// 高校路由
        // 高校列表
        {
          path: '/back/journals/JournalsList',
          name: 'JournalsList',
          component: JournalsList
        }, // 高校创建
        {
          path: '/back/journals/JournalsCreate',
          name: 'JournalsCreate',
          component: JournalsCreate
        }, // 高校更新
        {
          path: '/back/journals/JournalsEdit/:id',
          name: 'JournalsUpdate',
          props: true,
          component: JournalsUpdate
        },
        {
          // 高校添加文章
          path: '/back/journals/JournalsArticle/:id',
          name: 'JournalsAddArticleList',
          props: true,
          component: JournalsAddArticleList
        },
        {
          path: '/back/journals/JournalsAddEditorial/:id',
          name: 'JournalsAddEditorial',
          props: true,
          component: JournalsAddEditorial
        }, // 高校添加编辑

        ///////////// 高校导航栏编辑
        {
          path: '/back/journals/JournalsListOther',
          name: 'JournalsListOther',
          component: JournalsListOther
        }, // 高校添加编辑

        ////////////////// 高校添加导航栏路
        //// About 路由
        {
          path: '/back/journalsOther/JournalsAboutList/:id',
          name: 'JournalsAboutList',
          props: true,
          component: JournalsAboutList
        },
        {
          path: '/back/journalsOther/JournalsAboutMake/:aid/:jid',
          name: 'JournalsAboutMake',
          props: true,
          component: JournalsAboutMake
        },
        //// Special Issue 路由
        {
          path: '/back/journalsOther/JournalsSpecialIssueList/:id',
          name: 'JournalsSpecialIssueList',
          props: true,
          component: JournalsSpecialIssueList
        },
        {
          path: '/back/journalsOther/JournalsSpecialIssueMake/:aid/:jid',
          name: 'JournalsSpecialIssueMake',
          props: true,
          component: JournalsSpecialIssueMake
        },
        //// For Authors 路由
        {
          path: '/back/journalsOther/JournalsForAuthorsList/:id',
          name: 'JournalsForAuthorsList',
          props: true,
          component: JournalsForAuthorsList
        },
        {
          path: '/back/journalsOther/JournalsForAuthorsMake/:aid/:jid',
          name: 'JournalsForAuthorsMake',
          props: true,
          component: JournalsForAuthorsMake
        },
        //// For Reviewers 路由
        {
          path: '/back/journalsOther/JournalsForReviewersList/:id',
          name: 'JournalsForReviewersList',
          props: true,
          component: JournalsForReviewersList
        },
        {
          path: '/back/journalsOther/JournalsForReviewersMake/:aid/:jid',
          name: 'JournalsForReviewersMake',
          props: true,
          component: JournalsForReviewersMake
        },
        //// Focus 路由
        {
          path: '/back/journalsOther/JournalsFocusList/:id',
          name: 'JournalsFocusList',
          props: true,
          component: JournalsFocusList
        },
        {
          path: '/back/journalsOther/JournalsFocusMake/:aid/:jid',
          name: 'JournalsFocusMake',
          props: true,
          component: JournalsFocusMake
        },

        ///////////////////// 团队路由
        {
          // 团队列表
          path: '/back/Team/TeamList',
          name: 'TeamList',
          component: TeamList
        },
        {
          // 团队创建
          path: '/back/Team/TeamCreate',
          name: 'TeamCreate',
          component: TeamCreate
        },
        {
          // 团队信息修改
          path: '/back/Team/TeamUpdate/:id',
          name: 'TeamUpdate',
          props: true,
          component: TeamUpdate
        },
        ///////// 编辑人员
        {
          // 编辑人员列表
          path: '/back/editorial/EditorialList',
          name: 'EditorialList',
          component: EditorialList
        },
        {
          //编辑人员创建
          path: '/back/editorial/EditorialCreate',
          name: 'EditorialCreate',
          component: EditorialCreate
        },
        {
          // 编辑人员信息修改
          path: '/back/editorial/EditorialUpdate/:id',
          name: 'EditorialUpdate',
          props: true,
          component: EditorialUpdate
        },
        /////////// 新闻
        {
          // 新闻列表
          path: '/back/news/NewsList',
          name: 'NewsList',
          component: NewsList
        },
        {
          //新闻创建
          path: '/back/news/NewsCreate',
          name: 'NewsCreate',
          component: NewsCreate
        },
        {
          // 新闻基础信息修改
          path: '/back/news/NewsUpdate/:id',
          name: 'NewsUpdate',
          props: true,
          component: NewsUpdate
        },
        {
          // 新闻核心内容修改
          path: '/back/news/MakeNewsPage/:id',
          name: 'MakeNewsPage',
          props: true,
          component: MakeNewsPage
        },
        /////////// 开源项目
        {
          // 开源项目列表
          path: '/back/project/ProjectList',
          name: 'ProjectList',
          component: ProjectList
        },
        {
          //开源项目创建
          path: '/back/project/ProjectCreate',
          name: 'ProjectCreate',
          component: ProjectCreate
        },
        {
          // 开源项目基础信息修改
          path: '/back/project/ProjectUpdate/:id',
          name: 'ProjectUpdate',
          props: true,
          component: ProjectUpdate
        },
        {
          // 开源项目核心内容修改
          path: '/back/project/MakeProjectPage/:id',
          name: 'MakeProjectPage',
          props: true,
          component: MakeProjectPage
        },
        /////////// 伙伴关系
        {
          // 伙伴关系列表
          path: '/back/membership/MembershipList',
          name: 'MembershipList',
          component: MembershipList
        },
        {
          //伙伴关系创建
          path: '/back/membership/MembershipCreate',
          name: 'MembershipCreate',
          component: MembershipCreate
        },
        {
          // 伙伴关系基础信息修改
          path: '/back/membership/MembershipUpdate/:id',
          name: 'MembershipUpdate',
          props: true,
          component: MembershipUpdate
        },
        ///////////////////// 公告
        {
          // 公告列表
          path: '/back/notice/NoticeList',
          name: 'NoticeList',
          component: NoticeList
        },
        {
          // 公告修改
          path: '/back/notice/MakeNoticePage/:id',
          name: 'MakeNoticePage',
          props: true,
          component: MakeNoticePage
        },
        {
          // 公告创建
          path: '/back/notice/NoticeCreate',
          name: 'NoticeCreate',
          component: NoticeCreate
        },
        // 首页
        {
          // 公告列表
          path: '/back/back/IndexUpdate',
          name: 'IndexUpdate',
          component: IndexUpdate
        },
        // 作者须知 和 关于高校 高校目的
        {
          // 关于高校
          path: '/back/aboutJournals/MakeAboutJournalsPage/:id',
          name: 'MakeAboutJournalsPage',
          props: true,
          component: MakeAboutJournalsPage
        },
        {
          // 作者须知
          path: '/back/aboutJournals/MakeAboutJournalsAuthorPage/:id',
          name: 'MakeAboutJournalsAuthorPage',
          props: true,
          component: MakeAboutJournalsAuthorPage
        },
        {
          // 高校目的
          path: '/back/aboutJournals/MakeAboutJournalsAimsAndScorePage/:id',
          name: 'MakeAboutJournalsAimsAndScorePage',
          props: true,
          component: MakeAboutJournalsAimsAndScorePage
        },
        // 用户提交信息
        {
          // 作者须知
          path: '/back/userArticle/UserArticleList',
          name: 'UserArticleList',
          component: UserArticleList
        },
        // 管理员页面
        {
          // 管理员页面
          path: '/back/admin/AdminList',
          name: 'AdminList',
          component: AdminList,
        },
        ///////////  用户界面
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
          // 用户介绍修改
          path: '/back/users/MakeUsersPage/:id',
          name: 'MakeUsersPage',
          props: true,
          component: MakeUsersPage
        },
        //轮播图
        { path: '/back/Banner', name: 'banners', component: BannerList },//轮播图列表
        { path: '/back/BannerCreate', name: 'BannerCreate', component: BannerCreate },//轮播图创建
        { path: '/back/BannerUpdate/:id', name: 'BannerUpdate', props: true, component: BannerUpdate },//轮播图编辑
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'user',
      // redirect: '/login',
      component: UserIndex,
      children:[
        {
          path: '/',
          name: 'userIndex',
          component: UserIndexHome
        }, // 修改文章内容
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, form, next) => {
  const user = userStore()
  //token不存在就跳转到登录页面
  const userToken = user.user?.token
  if (!userToken && !userToken && to.name === 'login') {
    //管理员和用户token不存在并且页面是login 不跳转
    next()
    return
  } else if (!userToken && !userToken && to.name === 'admin') {
    //管理员和用户token不存在 并且页面是后台页面 跳转到登录页面
    next('/login')
    return
  } else {
    // 其他情况不跳转
    next()
  }
})

export default router
