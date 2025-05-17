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
        <view v-for="(items,indexs) in AdminAsides.values()">
          <el-sub-menu :index="indexs">
            <template #title>
              <span>{{items.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item,index) in items.side"
                @click="clickMenu(item.path)"
                :key="item.name"
                :index="item.name"
              >

                <template v-slot:title>
                  <span>{{ item.name }}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </view>
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
  User,
  Menu,
  Location,
  ColdDrink,
  Flag
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tabClick, userStore } from '@/stores'
import type { AdminAside, Aside } from '@/components/Aside'
//获取当前登录用户权限 如果权限不足则不能进入对应页面
const userMessage = userStore()

const handleOpen = (key: string, keyPath: string[]) => {}
const handleClose = (key: string, keyPath: string[]) => {}
//跳转页面的路由实例
const router = useRouter()
const tab = tabClick()

//导航栏标题
const loadName = ref<string>('梦之星云图库')
// 控制导航栏的伸缩
const isCollerapse = () => {
  const tabList = ref<boolean>(tab.tab)
  if (tabList.value) {
    loadName.value = '梦之星'
  } else {
    loadName.value = '梦之星云图库'
  }
  return tabList.value
}
// 表单项
const AdminAsides = ref<AdminAside[]>(
  [{side:[
      {
        path: '/back/users/UsersList',
        name: '用户列表',
        label: '用户列表',
        icon: 's-home',
      },
      {
        path: '/back/users/UsersCreate',
        name: '用户创建',
        label: '用户创建',
        icon: 's-home',
      }
    ],
    name: '用户',
  },
    // 导航二
    {
      side:[{  path: '/back/picture/picture_list',
        label: '首页',
        name: '图片列表',
        icon: 's-home',}],
      name: '图集',
    }
    ,
    // 导航三
    {
      side:[{  path: '/back/role/role_list',
        label: '首页',
        name: '角色列表',
        icon: 's-home',}],
      name: '角色',
    }
    ,
    // 导航四
    {
      side:[{  path: '/back/space/space_list',
        label: '首页',
        name: '空间列表',
        icon: 's-home',}],
      name: '空间',
    }
  ]
)

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
