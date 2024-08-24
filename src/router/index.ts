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

        ///////////////// 期刊路由
        // 期刊列表
        {
          path: '/back/journals/JournalsList',
          name: 'JournalsList',
          component: JournalsList
        }, // 期刊创建
        {
          path: '/back/journals/JournalsCreate',
          name: 'JournalsCreate',
          component: JournalsCreate
        }, // 期刊更新
        {
          path: '/back/journals/JournalsEdit/:id',
          name: 'JournalsUpdate',
          props: true,
          component: JournalsUpdate
        },
        { // 期刊添加文章
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
        }, // 期刊添加编辑

        ///////////// 期刊导航栏编辑
        {
          path: '/back/journals/JournalsListOther',
          name: 'JournalsListOther',
          component: JournalsListOther
        }, // 期刊添加编辑

        ////////////////// 期刊添加导航栏路
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
        // 编委会
        {
          // 编委会列表
          path: '/back/editorial/EditorialList',
          name: 'EditorialList',
          component: EditorialList
        },
        {
          //编委会创建
          path: '/back/editorial/EditorialCreate',
          name: 'EditorialCreate',
          component: EditorialCreate
        },
        {
          // 编委会信息修改
          path: '/back/editorial/EditorialUpdate/:id',
          name: 'EditorialUpdate',
          props: true,
          component: EditorialUpdate
        },
        // 新闻
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
        // 公告
        {
          // 公告列表
          path: '/back/notice/NoticeList',
          name: 'NoticeList',
          component: NoticeList
        },
        {
          // 公告核心内容修改
          path: '/back/notice/MakeNoticePage/:id',
          name: 'MakeNoticePage',
          props: true,
          component: MakeNoticePage
        },
        // 首页
        {
          // 公告列表
          path: '/back/index/IndexUpdate',
          name: 'IndexUpdate',
          component: IndexUpdate
        },
        // 作者须知 和 关于期刊
        {
          // 关于期刊
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
        // 用户提交信息
        {
          // 作者须知
          path: '/back/userArticle/UserArticleList',
          name: 'UserArticleList',
          component: UserArticleList
        },
        // 用户提交信息
        {
          // 作者须知
          path: '/back/admin/AdminList',
          name: 'AdminList',
          component: AdminList
        }
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
    }
  ]
})

export default router
