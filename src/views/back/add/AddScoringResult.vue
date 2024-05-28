<template>
  <view class="AddAPP">
    <span style="font-size: 40px; padding-bottom: 20px; border-bottom: 20px" v-if="!updateId"
      >设置评分结果</span
    >
    <el-space>
      <span
        style="font-size: 40px; padding-bottom: 20px; border-bottom: 20px; padding-right: 50px"
        v-if="updateId"
        >修改评分结果</span
      >
      <el-button @click="addNewResult()" v-if="updateId" type="info">添加新的评分结果</el-button>
    </el-space>
    <p style="font-size: 22px; padding-top: 10px">
      正在设置应用：{{ props.id }} {{ AppMessage.appName }}
    </p>
    <p style="font-size: 22px; padding-top: 10px" v-if="updateId">
      正在修改评分结果：{{ ScoringResultAddMessage.resultName }}
    </p>
    <view style="display: flex; font-size: 40px; padding-bottom: 20px; border-bottom: 20px"></view>
    <el-form
      :rules="rules"
      :model="ScoringResultAddMessage"
      ref="form"
      size="large"
      autocomplete="off"
    >
      <el-form-item v-model="ScoringResultAddMessage.resultName" prop="resultName">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 25px">结果名称</span>
          <el-input
            v-model="ScoringResultAddMessage.resultName"
            style="width: 600px"
            placeholder="请输入结果名称"
            :maxlength="20"
          />
          <view style="padding-right: 50px" />
          <view style="padding-right: 50px" />
          <el-button
            style="width: 150px"
            @click="submit(form)"
            class="submit-button"
            type="primary"
          >
            提交评分结果
          </el-button>
        </div>
      </el-form-item>
      <el-form-item prop="resultDesc">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 25px">结果描述</span>
          <el-input
            v-model="ScoringResultAddMessage.resultDesc"
            style="width: 1000px"
            placeholder="请输入结果描述"
            :maxlength="40"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="resultProp">
        <div style="display: flex">
          <span style="padding-right: 35px; padding-top: 20px; font-size: 25px">结果集</span>
          <el-card>
            <el-tag
              v-for="(tag, index) in ScoringResultAddMessage.resultProp"
              :key="index"
              class="mx-1"
              closable
              @close="handleClose(tag)"
              >{{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              size="small"
              placeholder="回车确认"
              @keyup.enter="handleInputConfirm()"
              @blur="handleInputConfirm()"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput()">
              添加新的结果
            </el-button>
          </el-card>
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="resultScoreRange">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 25px">结果得分范围</span>
          <el-input
            v-model="ScoringResultAddMessage.resultScoreRange"
            style="width: 1000px"
            placeholder="请输入结果得分范围"
            :minlength="1"
            :maxlength="10"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-space>
        <el-form-item>
          <el-upload
            class="upload-demo"
            :limit="1"
            :show-file-list="false"
            :http-request="addPhoto"
            :multiple="false"
          >
            <el-button style="padding-bottom: 15px; width: 200px" type="primary"
              >应用图片上传
            </el-button>
            <template #tip>
              <div class="el-upload__tip" style="font-size: 18px">图片选则不要超过2MB</div>
            </template>
          </el-upload>
        </el-form-item>
        <view style="display: flex; padding-top: 10px"></view>
        <el-form-item>
          <el-image
            style="width: 150px; height: 150px; padding-left: 5px"
            :src="ScoringResultAddMessage.resultPicture"
            fit="fill"
          />
        </el-form-item>
      </el-space>
    </el-form>
    <!--底部设置条目栏-->
    <view>
      <!--表格-->
      <!--prop要求必须和集合中的字段对应-->
      <el-table height="90%" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="resultName" label="结果名称" width="200" />
        <el-table-column prop="resultDesc" label="结果描述" width="200" />
        <el-table-column prop="resultPicture" label="结果图片" width="200px">
          <template #default="scope">
            <el-image :src="scope.row.resultPicture" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="resultProp" label="结果属性集合" width="200" />
        <el-table-column prop="resultScoreRange" label="结果得分范围" width="200px" />
        <el-table-column prop="createTime" label="创建时间" width="200px" />
        <el-table-column prop="updateTime" label="更新时间" width="200px" />
        <el-table-column label="操作" width="200px">
          <template #default="scope">
            <el-button size="small" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="warning" @click="handleDelete(scope.row)">删除</el-button>
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
          v-model:current-page="scoringResultPage.page"
          @current-change="handlePage"
        />
      </div>
    </view>
  </view>
</template>

<script setup lang="ts">
//用户的基本信息
import { onMounted, nextTick, ref } from 'vue'
import { ElMessage, ElInput } from 'element-plus'
import { addAppAPI } from '@/service/AppController'
import type { AppAddDTO } from '@/types/App'
import { uploadImage } from '@/service/UpLoadFile'
import router from '@/router'
import type { ScoringResultAddDTO, ScoringResultVO } from '@/types/ScoringResult'
import type { PageParams } from '@/types/Pages'
import {
  addScoringResultAPI,
  deleteScoringResultAPI,
  editScoringResultAPI,
  getScoringResultVOByIdAPI,
  listMyScoringResultVOByPageAPI,
  listScoringResultByPageAPI
} from '@/service/ScroingResultController'

const AppMessage = ref<AppAddDTO>([])
const ScoringResultAddMessage = ref<ScoringResultAddDTO>([])
const updateId = ref<string>('')

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => ''
})

//活动图片上传
const addPhoto = async (files: any) => {
  let fromData = new FormData()
  fromData.append('file', files.file)
  let res = await uploadImage(fromData) // 上传到阿里云
  ScoringResultAddMessage.value.resultPicture = res.data
}

//表单校验
const form = ref<InstanceType<typeof FormInstance>>()

//表单校验规则
const rules = {
  resultName: [
    { required: true, message: '应用名称不能为空', trigger: 'change' },
    {
      min: 1,
      max: 20,
      message: '应用名称必须为1-18位',
      trigger: 'change'
    }
  ],
  resultDesc: [
    { required: true, message: '应用描述不能为空', trigger: 'change' },
    {
      min: 1,
      max: 40,
      message: '应用描述必须为1-40位',
      trigger: 'change'
    }
  ],
  resultProp: [{ required: true, message: '结果集不能为空', trigger: 'change' }],
  resultScoreRange: [
    { required: true, message: '结果得分范围不能为空', trigger: 'change' },
    {
      min: 1,
      max: 10,
      message: '结果得分范围必须为1-10位',
      trigger: 'change'
    }
  ]
}

//标签结果集合
const inputValue = ref<string>('')
const inputVisible = ref<boolean>(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (index: string) => {
  ScoringResultAddMessage.value.resultProp?.splice(
    ScoringResultAddMessage.value.resultProp.indexOf(index),
    1
  )
}
//打开输入框
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
//确认输入框
const handleInputConfirm = () => {
  if (inputValue.value) {
    ScoringResultAddMessage.value.resultProp?.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

//提交文章前的校验并且校验成功后
const submit = async (formE: InstanceType<typeof FormInstance> | undefined) => {
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交选项,切勿重复保存',
        type: 'success'
      })
      ensureSubmit()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

// 获取当前APP下的答案情况
//分页下标
const pageCount = ref<number>(0)
//分页查询页数
const scoringResultPage = ref<PageParams>({
  page: 1,
  pageSize: 15
})
//表格数据
const tableData = ref<ScoringResultVO[]>([])

//删除某条结果信息
const handleDelete = async (scoringResultVO: ScoringResultVO) => {
  const res = await deleteScoringResultAPI({
    id: scoringResultVO.id,
    isDelete: 1
  })
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
    ElMessage.success('已更新数据')
  }
}

// 重新编辑当前结果
const handleEdit = async (scoringResultVO: ScoringResultVO) => {
  console.log(scoringResultVO.id)
  const res = await getScoringResultVOByIdAPI(scoringResultVO.id)
  if (res.code === 0) {
    //封禁成功刷新用户当页用户信息
    updateId.value = res.data.id
    ScoringResultAddMessage.value.resultName = res.data.resultName
    ScoringResultAddMessage.value.resultProp = res.data.resultProp
    ScoringResultAddMessage.value.resultPicture = res.data.resultPicture
    ScoringResultAddMessage.value.resultDesc = res.data.resultDesc
    ScoringResultAddMessage.value.resultScoreRange = res.data.resultScoreRange
    ElMessage.success('正在重新编辑')
  }
}

// 提交或者修改结果
const ensureSubmit = async () => {
  let res: any
  if (updateId.value) {
    // 修改id存在 执行修改策略
    res = await editScoringResultAPI({
      id: updateId.value,
      resultName: ScoringResultAddMessage.value.resultName,
      resultDesc: ScoringResultAddMessage.value.resultDesc,
      resultPicture: ScoringResultAddMessage.value.resultPicture,
      resultProp: ScoringResultAddMessage.value.resultProp,
      resultScoreRange: ScoringResultAddMessage.value.resultScoreRange
    })
    if (res.code === 0) {
      ElMessage.success('修改成功')
      getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
    }
  } else {
    //执行提交策略
    res = await addScoringResultAPI({
      resultName: ScoringResultAddMessage.value.resultName,
      resultDesc: ScoringResultAddMessage.value.resultDesc,
      resultPicture: ScoringResultAddMessage.value.resultPicture,
      resultProp: ScoringResultAddMessage.value.resultProp,
      resultScoreRange: ScoringResultAddMessage.value.resultScoreRange,
      appId: props.id
    })
    if (res.code === 0) {
      ElMessage.success('提交成功')
      getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
    }
  }
}

// 获取当前APP下的答案情况
const getScoringResultMessageList = async (page: number, pageSize: number) => {
  const res = await listMyScoringResultVOByPageAPI({
    appId: props.id,
    page: page,
    pageSize: pageSize
  })
  //将后端的内容添加到集合内
  tableData.value = res.data.records
  pageCount.value = res.data.total
}
//分页下标切换 重新进行分页查询
const handlePage = (val: number) => {
  getScoringResultMessageList(val, scoringResultPage.value.pageSize)
}

// 重新将当前页面设置为添加新结果模式
const addNewResult = () => {
  updateId.value = ''
}

onMounted(() => {
  ScoringResultAddMessage.value.resultProp = []
  getScoringResultMessageList(scoringResultPage.value.page, scoringResultPage.value.pageSize)
})
</script>

<style scoped lang="less"></style>
