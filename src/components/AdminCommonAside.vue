<template>
  <view style="height: 100%">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollerapse()"
        default-active="0"
        style="height: 100%"
      >
        <h3>{{ loadName }}</h3>
        <!--文章管理 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in ArticleDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!-- 期刊管理     -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <List />
            </el-icon>
            <span>期刊管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in JournalsDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!--团队管理-->
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Flag />
            </el-icon>
            <span>团队管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in TeamDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!--编委会管理-->
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <QuestionFilled />
            </el-icon>
            <span>编委会管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in EditorialDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!--新闻管理-->
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <Comment />
            </el-icon>
            <span>新闻管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in NewsDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!--合作伙伴管理-->
        <el-sub-menu index="10">
          <template #title>
            <el-icon>
              <ColdDrink />
            </el-icon>
            <span>合作伙伴管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in MembershipDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <!--公告管理-->
        <el-sub-menu index="6">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span>公告管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in NoticeDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <el-icon>
              <Location />
            </el-icon>
            <span>首页内容</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in IndexDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--首页内容-->
        <el-sub-menu index="8">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户提交文章</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in UserArticleDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>

        <!--管理员-->
        <el-sub-menu index="9" v-if="userMessage.user?.userRole == 2">
          <template #title>
            <el-icon>
              <HotWater />
            </el-icon>
            <span>管理员</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              @click="clickMenu(item.path)"
              v-for="item in AdminDataList"
              :key="item.name"
              :index="item.name"
            >
              <i :class="`el-icon-${item.icon}`"></i>
              <template v-slot:title>
                <span>{{ item.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </view>

</template>

<script setup lang="ts">
import {
  DocumentCopy,
  HotWater,
  Comment,
  QuestionFilled,
  List,
  Apple,
  User,
  Menu,
  Location,
  Plus,
  ColdDrink,
  Flag
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tabClick, userStore } from '@/stores'
import ArticleList from '@/views/Admin/back/article/ArticleList.vue'
// import router from '@/router'
//获取当前登录用户权限 如果权限不足则不能进入对应页面
const userMessage = userStore()

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
//跳转页面的路由实例
const router = useRouter()
const tab = tabClick()

//导航栏标题
const loadName = ref<string>('CESP')
// 控制导航栏的伸缩
const isCollerapse = () => {
  const tabList = ref<boolean>(tab.tab)
  if (tabList.value) {
    loadName.value = 'CESP'
  } else {
    loadName.value = 'Canadian Educational Science Press'
  }
  return tabList.value
}

//活动页面列表
const ArticleDataList = ref([
  {
    path: '/back/article/ArticleList',
    name: '文章列表',
    label: '文章列表',
    icon: 's-home',
    url: 'ActiveListComponents/ActiveListComponents'
  },
  {
    path: '/back/article/ArticleCreate',
    name: '创建文章',
    label: '创建文章',
    icon: 's-home',
    url: 'ArticleCreate/ArticleCreate'
  }
])

//期刊页面列表
const JournalsDataList = ref([
  {
    path: '/back/journals/JournalsList',
    name: '期刊列表',
    label: '期刊列表',
    icon: 's-home',
    url: 'JournalsList/JournalsList'
  },
  {
    path: '/back/journals/JournalsCreate',
    name: '创建期刊',
    label: '创建期刊',
    icon: 's-home',
    url: 'JournalsList/JournalsList'
  },
  {
    path: '/back/journals/JournalsListOther',
    name: '期刊导航栏',
    label: '期刊导航栏',
    icon: 's-home',
    url: 'JournalsListOther/JournalsListOther'
  }
])

//团队页面列表
const TeamDataList = ref([
  {
    path: '/back/team/TeamList',
    name: '团队成员列表',
    label: '团队成员列表',
    icon: 's-home',
    url: 'TeamList/TeamList'
  },
  {
    path: '/back/team/TeamCreate',
    name: '添加团队成员',
    label: '添加团队成员',
    icon: 's-home',
    url: 'TeamCreate/TeamCreate'
  }
])

//编委会页面列表
const EditorialDataList = ref([
  {
    path: '/back/editorial/EditorialList',
    name: '编委会列表',
    label: '编委会列表',
    icon: 's-home',
    url: 'TeamList/TeamList'
  },
  {
    path: '/back/editorial/EditorialCreate',
    name: '创建新编委会成员',
    label: '创建新编委会成员',
    icon: 's-home',
    url: 'TeamCreate/TeamCreate'
  }
])

//新闻页面列表
const NewsDataList = ref([
  {
    path: '/back/news/NewsList',
    name: '新闻列表',
    label: '新闻列表',
    icon: 's-home',
    url: 'NewsList/NewsList'
  },
  {
    path: '/back/news/NewsCreate',
    name: '添加新闻',
    label: '添加新闻',
    icon: 's-home',
    url: 'NewsCreate/NewsCreate'
  }
])

//合作伙伴页面列表
const MembershipDataList = ref([
  {
    path: '/back/membership/MembershipList',
    name: '合作伙伴列表',
    label: '合作伙伴列表',
    icon: 's-home',
    url: ''
  },
  {
    path: '/back/membership/MembershipCreate',
    name: '添加合作伙伴',
    label: '添加合作伙伴',
    icon: 's-home',
    url: ''
  }
])

//公告页面列表
const NoticeDataList = ref([
  {
    path: '/back/notice/NoticeList',
    name: '公告列表',
    label: '公告列表',
    icon: 's-home',
    url: 'NoticeList/NoticeList'
  }
])

//首页修改
const IndexDataList = ref([
  {
    path: '/back/index/IndexUpdate',
    name: '首页修改',
    label: '首页修改',
    icon: 's-home',
    url: 'IndexUpdate/IndexUpdate'
  }
])

//用户提交文章信息修改
const UserArticleDataList = ref([
  {
    path: '/back/userArticle/UserArticleList',
    name: '用户提交文章',
    label: '用户提交文章',
    icon: 's-home',
    url: 'UserArticleList/UserArticleList'
  }
])

//管理员身份信息修改
const AdminDataList = ref([
  {
    path: '/back/admin/AdminList',
    name: '管理员',
    label: '管理员',
    icon: 's-home',
    url: 'AdminList/AdminList'
  }
])

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
  height: 100vh;
}

.el-menu {
  //el-menu-vertical-demo的子标签
  /* 左侧全局导航栏 占满屏幕 */
  height: 100vh;

  h3 {
    color: #fff;
    text-align: center;
    // 上下间距
    line-height: 48px;
    // 文字大小 注意一定要小 因为标签是h3
    font-size: 1pc;
  }
}

.viewTitle {
}

.el-menu {
  border-right: none;
}
</style>
