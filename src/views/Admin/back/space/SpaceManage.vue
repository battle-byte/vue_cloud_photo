<template>
  <view>
    <!--对话框 用于确认是否删除对应页面-->
    <el-dialog
      v-model="deleteDialogFormVisible"
      name="删除空间"
      width="500"
      :before-close="DeleteClose"
    >
      <el-col>
        <span>确认删除空间</span>
        <span>ID:{{ deleteSpace.id }}</span>
        <span>账号:{{ deleteSpace.spaceName }}</span>
      </el-col>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DeleteCancel">取消删除</el-button>
          <el-button @click="DeleteSubmit" type="primary">确定删除</el-button>
        </div>
      </template>
    </el-dialog>

    <div class="flex gap-4 mb-4">
      <span style="padding-top: 5px">用户</span>
      <el-input v-model="searchSpace.userId" placeholder="用户ID" style="width: 240px" />
      <span style="padding-top: 5px">空间名称</span>
      <el-input v-model="searchSpace.spaceName" placeholder="空间名称" style="width: 240px" />
      <span style="padding-top: 5px">等级</span>
      <el-select  placeholder="空间等级" v-model="spaceLeverSelect" style="width: 240px">
        <el-option
          style="font-size: 18px"
          v-for="item in SPACE_LEVEL_OPTIONS"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          @click="searchSpace.spaceLever=Number(item.value)"
        />
      </el-select>
      <el-button type="primary" @click="getSpaceList">搜索</el-button>
      <el-button
        type="success"
        @click="$router.push(`/space_add`)">
        创建
      </el-button>
    </div>

    <div class="manage">
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="id" label="ID" width="200" />
        <el-table-column prop="spaceName" label="空间名称" width="200"/>
        <el-table-column prop="spaceLever" label="空间等级" width="100">
          <template #default="scope">
            <span v-html="resultFormatLever(scope.row.spaceLever)"> </span>
          </template>
        </el-table-column>
        <el-table-column prop="maxSize" label="容量" width="200">
          <template #default="scope">
            <div>内存：{{(scope.row.totalSize/1024).toFixed(2)}}/{{(scope.row.maxSize/1024).toFixed(2)}}KB</div>
            <div>数量：{{scope.row.totalCount}}/{{scope.row.maxCount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="200" />
        <el-table-column prop="user.username" label="用户名称" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="200" />
        <el-table-column prop="editAt" label="编辑时间" width="200" />
        <el-table-column prop="updatedAt" label="修改时间" width="200" />
        <el-table-column label="操作" width="500">
          <template #default="scope">
            <el-button
              size="small"
              link
              type="primary"
              @click="$router.push(`/space_add?id=${scope.row.id}`)">
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
          v-model:current-page="searchSpace.page"
          @current-change="handlePage"
        />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
//空间的基本信息
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SpaceDeleteAPI, SpaceListWithUserAPI } from '@/service/SpaceController'
import {
  SPACE_LEVEL_ENUM,
  SPACE_LEVEL_MAP, SPACE_LEVEL_OPTIONS, type SpaceAndUserResponse, type SpaceDeleteShow,
  type SpaceListWithUserRequest
} from '@/types/space'

//搜索
const searchSpace = ref<SpaceListWithUserRequest>({
  id: '',
  page: 0,
  size: 15,
  spaceLever: 0,
  spaceName: '',
  userId: '' })

//表格数据
const tableData = ref<SpaceAndUserResponse[]>([])
//分页下标
const pageCount = ref<number>(0)


const resultFormatLever = (value: number) => {
  if (value==SPACE_LEVEL_ENUM.COMMON){
    return SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.COMMON]
  }else if (value==SPACE_LEVEL_ENUM.FLAGSHIP){
    return SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.FLAGSHIP]
  }else if (value==SPACE_LEVEL_ENUM.PROFESSIONAL){
    return SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.PROFESSIONAL]
  }
  return "未知"
}
//获取空间信息
const getSpaceList = async () => {
  const res = await SpaceListWithUserAPI(<SpaceListWithUserRequest>{
    id:searchSpace.value.id,
    spaceName:searchSpace.value.spaceName,
    spaceLever:searchSpace.value.spaceLever,
    userId:searchSpace.value.userId,
    page:searchSpace.value.page,
    size:searchSpace.value.size,
  })
  if (res.code === 0) {
    tableData.value = res.data.records!
    pageCount.value = res.data.total!
    console.log(tableData.value)
    ElMessage.success('已更新空间数据')
  } else {
    ElMessage.error('更新空间数据失败')
  }
}

const spaceLeverSelect  = ref<string>()
const spaceLever = (item:string)=>{
  searchSpace.value.spaceLever=Number(item)
  spaceLeverSelect.value = SPACE_LEVEL_MAP[Number(item)]
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
let deleteSpace = ref<SpaceDeleteShow>({
  id: '',
  spaceName: ''
})

// 删除
const handleDelete = (vo: SpaceAndUserResponse) => {
  deleteSpace.value.id = vo.id!
  deleteSpace.value.spaceName = vo.spaceName!
  deleteDialogFormVisible.value = true
}

//确认提交删除选项
const DeleteSubmit = async () => {
  deleteDialogFormVisible.value = false
  const res = await SpaceDeleteAPI(deleteSpace.value.id!)
  if (res.code == 0) {
    ElMessage.success('删除成功')
    await getSpaceList()
  }
}

//分页下标切换 重新进行分页查询
const handlePage = () => {
  getSpaceList()
}

onMounted(() => {
  getSpaceList()
})

</script>

<style scoped lang="less">
.manage {
  height: 90%;
}
</style>
