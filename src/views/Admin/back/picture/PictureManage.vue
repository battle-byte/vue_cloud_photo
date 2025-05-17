<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除图片"
      width="500"
      :before-close="DeleteClose"
    >
      <el-col>
        <span>确认删除图片</span>
        <span>ID:{{ deletePicture.pid }}</span>
        <span>账号:{{ deletePicture.pictureName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DeleteCancel">取消删除</el-button>
          <el-button @click="DeleteSubmit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">图片关键词</span>
      <el-input
        v-model="searchPicture.searchText"
        style="width: 240px"
        placeholder="相关名称或简介"
        :prefix-icon="Search"
      />
      <span style="padding-top: 5px">类型</span>
      <el-input v-model="searchPicture.category" placeholder="图片类型" style="width: 240px" />
      <span style="padding-top: 5px">标签</span>
      <el-input-tag v-model="searchPicture.tags" placeholder="图片标签，输入后请摁下回车" style="width: 240px" />
      <el-button type="primary" @click="searchPicturesList">搜索</el-button>
      <el-button
        type="success"
        @click="$router.push(`/picture_add`)">
        创建
      </el-button>
      <el-button
        type="warning"
        @click="$router.push(`/picture_batch`)">
        抓取
      </el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="pid" label="ID" width="200" />
        <el-table-column prop="thumbnailUrl" label="缩略图" width="200">
          <template #default="scope">
            <el-image :src="scope.row.thumbnailUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="picName" label="名称" width="200" />
        <el-table-column prop="introduction" label="简介" width="200" />
        <el-table-column prop="category" label="类型" width="200" />
        <el-table-column prop="tags" label="标签" width="200">
          <template #default="scope">
            <view v-for="item in scope.row.tags" :key="item">
              <el-tag type="primary">{{item}}</el-tag>
            </view>
          </template>
        </el-table-column>
        <el-table-column prop="picFormat" label="图片信息" width="200">
          <template #default="scope">
            <div>格式：{{scope.row.picFormat}}</div>
            <div>宽度：{{scope.row.picWidth}}</div>
            <div>高度：{{scope.row.picHeight}}</div>
            <div>宽和高比：{{scope.row.picScale}}</div>
            <div>大小：{{(scope.row.picSize/1024).toFixed(2)}}KB</div>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="400" />
        <el-table-column prop="editAt" label="编辑时间" width="400" />
        <el-table-column prop="updatedAt" label="修改时间" width="400" />
        <el-table-column prop="reviewerId" label="审核人" width="150" />
        <el-table-column prop="reviewMessage" label="审核信息" width="200" />
        <el-table-column prop="reviewStatus" label="审核状态" width="100">
          <template #default="scope">
            <span v-html="resultFormatReviewStatus(scope.row.reviewStatus)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="reviewAt" label="审核时间" width="200" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button size="small" type="success" v-if="scope.row.reviewStatus==PIC_REVIEW_STATUS_ENUM.PicturePass" @click="handleReview(scope.row,PIC_REVIEW_STATUS_ENUM.PicturePass)">
              通过
            </el-button>
            <el-button size="small" type="warning" v-if="scope.row.reviewStatus==PIC_REVIEW_STATUS_ENUM.PictureReject" @click="handleReview(scope.row,PIC_REVIEW_STATUS_ENUM.PictureReject)">
              拒绝
            </el-button>
            <el-button
              size="small"
              link
              type="primary"
              @click="$router.push(`/picture_add?id=${scope.row.pid}`)">
              编辑
            </el-button>

            <el-button size="small" type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页下标-->
      <div class="example-pagination-block">
        <el-pagination
          background
          :page-size="15"
          layout="prev, pager, next"
          :total="pageCount"
          v-model:current-page="noticePage.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//图片的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { PageParams } from '@/types/Pages'

import { Calendar, Lock, Search } from '@element-plus/icons-vue'
import type { RoleData } from '@/types/roles'
import { PictureDeleteAPI, PictureListAPI, PictureReviewAPI } from '@/service/PictureController'
import {
  PIC_REVIEW_STATUS_ENUM,
  type PictureData,
  type PictureDeleteShow,
  type PictureListRequest
} from '@/types/picture'
import type { SysUserListVO } from '@/types/Users'
import { ChangeStatusAPI } from '@/service/UsersController'

//分页下标
const pageCount = ref<number>(0)

//分页查询页数
const noticePage = ref<PageParams>({
  page: 1,
  size: 15
})

//搜索
const searchPicture = ref<PictureListRequest>({
  category: '',
  introduction: '',
  page: 0,
  picFormat: '',
  picHeight: 0,
  picName: '',
  picScale: 0,
  picSize: 0,
  picWidth: 0,
  pid: '',
  size: 0,
  tags: [],
  searchText: '',
  spaceId: "0"
})

//表格数据
const tableData = ref<PictureData[]>([])


const handleReview = async (picture:PictureData,status: number) => {
  if (picture.reviewStatus == status) {
    ElMessage.error('重复操作!')
    return
  }
  const res = await PictureReviewAPI({
    pid: picture.pid,
    reviewStatus: status
  })
  if (res.code === 0) {
    getPictureList(noticePage.value.page, noticePage.value.size)
  }
}
const resultFormatReviewStatus = (value: number) => {
  if (value==PIC_REVIEW_STATUS_ENUM.PicturePass){
    return "通过"
  }else if (value==PIC_REVIEW_STATUS_ENUM.PictureReviewing){
    return "审核中"
  }else if (value==PIC_REVIEW_STATUS_ENUM.PictureReject){
    return "未通过"
  }
  return "未知"
}
//获取图片信息
const getPictureList = async (page: number, size: number) => {
  const res = await PictureListAPI(<PictureListRequest>{
    page: page,
    size: size,
    searchText: searchPicture.value.searchText,
    tags: searchPicture.value.tags,
    category: searchPicture.value.category,
    spaceId:"0"
  })
  if (res.code === 0) {
    //将后端的内容添加到集合内
    tableData.value = res.data.records!
    pageCount.value = res.data.total!
    console.log(tableData.value)
    ElMessage.success('已更新图片数据')
  } else {
    ElMessage.error('更新图片数据失败')
  }
}



// 控制对话框是否打开
const deleteDialogFormVisible = ref(false)

//取消提交表单
const DeleteCancel = () => {
  //只要关闭表单，就刷新表单
  deleteDialogFormVisible.value = false
}
//表单关闭的时候清除基本的数据
const DeleteClose = (done: () => void) => {
  ElMessageBox.confirm('确定要关闭页面吗')
    .then(() => {
      //只要关闭表单，就刷新表单
      done()
    })
    .catch(() => {
      // catch error
    })
}
let deletePicture = ref<PictureDeleteShow>({
  pid: '',
  pictureName: ''
})

// 删除
const handleDelete = (noticeQueryByPageVO: PictureData) => {
  deletePicture.value.pid = noticeQueryByPageVO.pid!
  deletePicture.value.pictureName = noticeQueryByPageVO.picName!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const DeleteSubmit = async () => {
  deleteDialogFormVisible.value = false
  const res = await PictureDeleteAPI(deletePicture.value.pid!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    getPictureList(noticePage.value.page, noticePage.value.size)
  }
}

//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getPictureList(val, noticePage.value.size)
}

onMounted(() => {
  getPictureList(1, 15)
})

//模糊搜索
const searchPicturesList = () => {
  getPictureList(noticePage.value.page, noticePage.value.size)
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
