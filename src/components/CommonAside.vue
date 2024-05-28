<template>
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
    >
      <h3>{{ loadName }}</h3>
      <el-menu-item @click="clickMenu(HomeData.path)" index="4">
        <el-icon>
          <Location />
        </el-icon>
        <span>{{ HomeData.name }}</span>
      </el-menu-item>
      <el-menu-item @click="clickMenu(userData.path)" index="1">
        <el-icon>
          <User />
        </el-icon>
        <span>{{ userData.name }}</span>
      </el-menu-item>
      <el-menu-item @click="clickMenu(AppData.path)" index="3">
        <el-icon>
          <Menu />
        </el-icon>
        <span>{{ AppData.name }}</span>
      </el-menu-item>
      <el-menu-item @click="clickMenu(AddAppData.path)" index="6">
        <el-icon>
          <Plus />
        </el-icon>
        <span>{{ AddAppData.name }}</span>
      </el-menu-item>
      <el-menu-item @click="clickMenu(ScoringResultData.path)" index="7">
        <el-icon>
          <List />
        </el-icon>
        <span>{{ ScoringResultData.name }}</span>
      </el-menu-item>
      <el-menu-item @click="clickMenu(UserAnswerData.path)" index="2">
        <el-icon>
          <QuestionFilled />
        </el-icon>
        <span>{{ UserAnswerData.name }}</span>
      </el-menu-item>
      <el-sub-menu index="5">
        <template #title>
          <el-icon>
            <Apple />
          </el-icon>
          <span>期刊管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            @click="clickMenu(item.path)"
            v-for="item in activeMenuData"
            :key="item.name"
            :index="item.name"
          >
            <i :class="`el-icon-${item.icon}`"></i>
            <template v-slot:title>
              <span>{{ item.label }}</span>
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script setup lang="ts">
import { QuestionFilled, List, Apple, User, Menu, Location, Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminStore, tabClick } from '@/stores'
// import router from '@/router'
//获取当前登录用户权限 如果权限不足则不能进入对应页面
const admin = adminStore()

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
//跳转页面的路由实例
const router = useRouter()
const tab = tabClick()

//导航栏标题
const loadName = ref<string>('管理后台')
// 控制导航栏的伸缩
const isCollerapse = () => {
  const tabList = ref<boolean>(tab.tab)
  if (tabList.value) {
    loadName.value = '超新星'
  } else {
    loadName.value = '超新星智能AI应答'
  }
  return tabList.value
}
// <el-icon><Plus /></el-icon>
//官方文章 页面内容的集合
const adminMenuData = ref([
  {
    path: '/index/adminPostList',
    name: 'adminPostList',
    label: '文章列表',
    icon: 's-home'
  },
  {
    path: '/index/adminPost',
    name: 'adminPost',
    label: '添加文章',
    icon: 's-home'
  }
])

//用户答题结果列表
const UserAnswerData = ref({
  path: '/index/userAnswerComponents',
  name: '用户答题记录',
  label: '用户答题记录',
  icon: 's-home',
  url: 'UserComponents/UserComponents'
})

//创建应用
const AddAppData = ref({
  path: '/index/addAPP',
  name: '创建应用',
  label: '创建应用',
  icon: 's-home',
  url: 'UserComponents/UserComponents'
})

//评分规则页面
const ScoringResultData = ref({
  path: '/index/scoringResultComponents',
  name: '评分规则',
  label: '评分规则',
  icon: 's-home',
  url: 'ScoringResultComponents/ScoringResultComponents'
})

//首页
const HomeData = ref({
  path: '/index/home',
  name: '首页',
  label: '首页',
  icon: 's-home',
  url: 'UserComponents/UserComponents'
})

//应用页面
const AppData = ref({
  path: '/index/appList',
  name: '应用管理',
  label: '用户管理',
  icon: 's-home',
  url: 'UserComponents/UserComponents'
})
//用户页面
const userData = ref({
  path: '/index/user',
  name: '用户管理',
  label: '用户管理',
  icon: 's-home',
  url: 'UserComponents/UserComponents'
})
//管理员页面
const adminData = ref({
  path: '/index/admin',
  name: '官方账号设置',
  label: '官方账号设置',
  icon: 's-home',
  url: 'adminComponents/adminComponents'
})
//活动页面
const activeMenuData = ref([
  {
    path: '/index/periodicalList',
    name: '期刊列表',
    label: '期刊列表',
    icon: 's-home',
    url: 'ActiveListComponents/ActiveListComponents'
  },
  {
    path: '/index/periodical',
    name: '添加期刊',
    label: '添加期刊',
    icon: 's-home',
    url: 'ActiveComponents/ActiveComponents'
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
