<template>
  <div id="SpaceDetail">
    <el-row justify="space-between" style="width: 90%">
      <view style="font-size: 24px">{{spaceData.spaceName}}（{{ SPACE_TYPE_MAP[spaceData.spaceType] }}）</view>
      <el-row>
        <el-button
          type="text"
          v-if="spaceData.spaceType==1"
          @click="$router.push(`/space_user_manage/${id}`)"
        >
          成员管理
        </el-button>
        <el-button
          type="primary"
          @click="$router.push(`/picture_add?spaceId=${spaceData.id}`)">
          创建图片
        </el-button>
        <el-button
          type="success"
          @click="$router.push(`/space_analyze?spaceId=${props.id}`)"
          target="_blank"
        >
          空间分析
        </el-button>
        <el-button
          type="info"
          @click="doBatchEdit">
          编辑图片
        </el-button>
        <BatchEditPictureModal ref="batchEditPictureModalRef" :space-id="props.id" :picture-list="dataList" :on-success="batchEditFetchData" />
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="`占用空间${formatSize(spaceData.totalSize)}/${formatSize(spaceData.maxSize)}`"
          placement="bottom"
        >
          <el-progress type="circle" :width="50" :percentage="(spaceData.totalSize*100/spaceData.maxSize).toFixed(1)" />
        </el-tooltip>
      </el-row>
    </el-row>
    <el-row>
      <PictureSearchForm :on-search="onSearch"/>
    </el-row>
    <el-form>
      <el-form-item label="颜色:">
        <el-color-picker @change="fetchDataByColor" color-format="hex" v-model="searchParams.ave" size="large" />
      </el-form-item>
    </el-form>
    <div>
      <PictureList :on-reload="fetchData" :show-op="true" v-if="dataList.length>0" :dataList="dataList" :loading="loading" />
    </div>
    <div class="example-pagination-block">
      <el-pagination
        background
        :page-size="12"
        layout="prev, pager, next"
        :total="pageCount"
        v-model:current-page="searchParams.page"
        @current-change="handlePage"
      />
    </div>
  </div>
</template>



<script setup lang="ts">

import { computed, onMounted, reactive, ref, watch } from 'vue'
import { formatSize, type PictureListRequest, type PictureUsingList } from '@/types/picture'
import { ElMessage } from 'element-plus'
import { PictureSearchByColorAPI, PictureUsingListAPI } from '@/service/PictureController'
import PictureList from '@/components/picture/PictureList.vue'
import { SpaceUserFindByIdAPI, SpaceUserFindByUserIdAPI } from '@/service/SpaceController'
import { SPACE_TYPE_ENUM, SPACE_TYPE_MAP, type SpaceData } from '@/types/space'
import PictureSearchForm from '@/components/picture/PictureSearchForm.vue'
import BatchEditPictureModal from '@/components/picture/BatchEditPictureModal.vue'
import { spaceRoleStore } from '@/stores'
import { SpaceUserRoleAPI } from '@/service/SpaceUserController'

const dataList =ref<PictureUsingList[]>([])
const loading = ref(true)

// 空间id
interface Props {
  id:string
}
const props = defineProps<Props>()

// 搜索条件
const searchParams = ref<PictureListRequest>(<PictureListRequest>{
  page: 1,
  size: 12,
  spaceId:props.id
})
// 组件获取数据
// 获取数据
const fetchData = async () => {
  loading.value = true
  searchParams.value.ave = ""
  try {
    const res = await PictureUsingListAPI(searchParams.value)
    if (res.code==0) {
      dataList.value = res.data.records ?? []
      pageCount.value = res.data.total ?? 0
      console.log(dataList.value)
    } else {
      ElMessage.error('获取数据失败')
    }
  }finally {
    loading.value = false
  }
}

const fetchDataByColor = async () => {
  loading.value = true
  try {
    const res = await PictureSearchByColorAPI({
      color: searchParams.value.ave,
      spaceId:searchParams.value.spaceId
    })
    if (res.code==0) {
      if (res.data.records?.length==0){
        ElMessage.warning('该颜色下未找到相关图片')
      }
      dataList.value = res.data.records ?? []
      pageCount.value = res.data.total ?? 0
    } else {
      ElMessage.error('获取数据失败')
    }
  }finally {
    loading.value = false
  }
}

const onSearch = async (search:PictureListRequest) => {
  searchParams.value={
    ...searchParams.value,
    ...search
  }
  fetchData()
}

const spaceData  = ref<SpaceData>({
  createdAt: '',
  editAt: '',
  id: '',
  maxCount: 0,
  maxSize: 0,
  spaceLever: 0,
  spaceName: '',
  totalCount: 0,
  totalSize: 0,
  updatedAt: '',
  userId: '',
  spaceType: 0
})

const spaceUserRole = spaceRoleStore()

const getUserSpaceData = async ()=>{
  const res = await SpaceUserFindByIdAPI(props.id)
  if (res.code==0){
    spaceData.value = res.data.data
    // 公共空间 获取用户权限
    if (spaceData.value.spaceType==SPACE_TYPE_ENUM.TEAM){
      getUserRole()
    }
  }
}

const getUserRole = async () =>{
  const res = await SpaceUserRoleAPI(props.id)
  if(res.code===0) {
    spaceUserRole.setSpaceRole(res.data.role)
  }
}
// 页面加载时请求一次
onMounted(async () => {
  await fetchData()
  await getUserSpaceData()
})

//分页下标切换 重新进行分页查询
const handlePage = () => {
  fetchData()
}

const pageCount = ref<number>(0)

const batchEditPictureModalRef = ref()
const batchEditFetchData = async () => {
  fetchData()
}

// 监听spaceId的变化
watch(
  () => props.id,
  (newSpaceId) => {
    searchParams.value.spaceId =props.id
    fetchData()
    getUserSpaceData()
  },
)


// 打开编辑弹窗
const doBatchEdit = ()=>{
  batchEditPictureModalRef.value.openModal()
}
</script>



<style  lang="css">
</style>