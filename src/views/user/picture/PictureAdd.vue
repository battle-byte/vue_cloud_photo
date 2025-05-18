<template>
  <div id="picture_add">
    <view style="font-size: 24px">
      <el-row>
        <h2>{{ route.query?.id ? '修改图片' : '创建图片' }}</h2>
      </el-row>
    </view>
    <view v-if="spaceId" style="font-size: 16px">
      <el-row>
        <h2>
          保存至空间:
          <el-link type="primary" :href="`/space_detail/${spaceId}`" target="_blank">{{
            spaceData.spaceName
          }}</el-link>
        </h2>
      </el-row>
    </view>
    <!-- 选择上传方式 -->
    <el-tabs v-model="uploadType">
      <el-tab-pane label="本地上传" name="file">
        <PictureUpload :space-id="spaceId" :picture="picture" :on-success="onSuccess" />
      </el-tab-pane>
      <el-tab-pane label="路径上传" name="webp">
        <PictureUploadUrl :space-id="spaceId" :picture="picture" :onSuccess="onSuccess" />
      </el-tab-pane>
    </el-tabs>
    <!--表单-->
    <el-row>
      <div v-if="picture.url" style="width: 50%; padding-top: 20px">
        <a-button style="margin: auto; display: flex" @click="doEditPicture">编辑图片</a-button>
        <image-cropper
          ref="imageCropperRef"
          :on-success="onSuccess"
          :image-url="picture.url"
          :picture="picture"
          :space-id="spaceId"
          :space="spaceData"
        />
      </div>

      <div v-if="picture.url" style="width: 50%; padding-top: 20px">
        <a-button style="margin: auto; display: flex" @click="doOutPainting">AI扩图</a-button>
        <image-out-painting
          ref="outPaintingRef"
          :space-id="spaceId"
          :on-success="outPaintingSuccess"
          :picture="picture"
        />
      </div>
    </el-row>

    <el-form :rules="rules" :model="picture" ref="form" size="large" autocomplete="off">
      <view style="display: flex; padding-top: 10px"></view>
      <el-form-item prop="picName">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">图片名称</span>
          <el-input v-model="picture.picName" style="width: 600px" placeholder="图片名称" />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="introduction">
        <div style="display: flex">
          <span style="padding-right: 10px; font-size: 18px; width: 100px">图片简介</span>
          <el-input
            v-model="picture.introduction"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            style="width: 600px"
            placeholder="图片简介"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>
      <el-form-item prop="category">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">图片分类</span>
          <!-- 自动补全组件-->
          <el-autocomplete
            v-model="picture.category"
            clearable
            :fetch-suggestions="querySearch"
            placeholder="请输入分类"
            style="width: 600px"
          />
          <view style="padding-right: 50px" />
        </div>
      </el-form-item>

      <el-form-item prop="tags">
        <div style="display: flex">
          <span style="padding-right: 10px; width: 100px; font-size: 18px">图片标签</span>
          <el-input-tag
            :autocomplete="true"
            style="width: 600px"
            :max="10"
            v-model="picture.tags"
            draggable
            clearable
            aria-autocomplete="both"
            @click="mySelect.toggleMenu()"
            placeholder="按下回车键以确认标签"
          >
          </el-input-tag>
          <el-select
            class="my-custom-popper"
            v-model="picture.tags"
            multiple
            clearable
            collapse-tags
            style="width: 0; opacity: 0; position: absolute"
            ref="mySelect"
          >
            <el-option
              v-for="(item, index) in tags"
              :key="index"
              :label="item"
              :value="item"
              style="display: flex"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" @click="submitSave(form)" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import PictureUpload from '@/components/picture/PictureUpload.vue'
import { computed, h, onMounted, ref } from 'vue'
import type { PictureData } from '@/types/picture'
import { ElMessage, type FormInstance } from 'element-plus'
import { PictureEditAPI, PictureFindByIdAPI, PictureTagCategory } from '@/service/PictureController'
import { useRoute } from 'vue-router'
import PictureUploadUrl from '@/components/picture/PictureUploadUrl.vue'
import { SPACE_TYPE_ENUM, type SpaceData } from '@/types/space'
import { SpaceUserFindByIdAPI, SpaceUserFindByUserIdAPI } from '@/service/SpaceController'
import ImageCropper from '@/components/picture/ImageCropper.vue'
import ImageOutPainting from '@/components/picture/ImageOutPainting.vue'

interface Category {
  value: string
}

const uploadType = ref('file')
const route = useRoute()
const mySelect = ref()
const tags = ref<string[]>()
const category = ref<string[]>()
const spaceId = computed(() => {
  return route.query?.spaceId ?? "0"
})
const imageCropperRef = ref()
const outPaintingRef = ref()
// 尽量不要定义空的对象
const picture = ref<PictureData>({
  thumbnailUrl: '',
  webp: '',
  reviewAt: '',
  reviewMessage: '',
  reviewStatus: 0,
  reviewerId: '',
  category: '',
  createdAt: '',
  editAt: '',
  id: '',
  introduction: '',
  picFormat: '',
  picHeight: 0,
  picName: '',
  picScale: 0,
  picSize: 0,
  picWidth: 0,
  pid: '',
  tags: [],
  updatedAt: '',
  url: '',
  userId: ''
})
// 编辑图片
const doEditPicture = () => {
  if (imageCropperRef.value) {
    imageCropperRef.value.openModal()
  }
}
const doOutPainting = () => {
  if (outPaintingRef.value) {
    outPaintingRef.value.openModal()
  }
}

//表单校验
const form = ref<FormInstance>()
//表单校验规则
const rules = {
  picName: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  introduction: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  category: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  tags: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  webp: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
}
//提交普通用户前的校验并且校验成功后
const submitSave = async (formE: FormInstance | undefined) => {
  console.log(picture.value)
  if (!formE) return
  await formE.validate((valid: any, fields: any) => {
    if (valid) {
      //提示成功信息
      ElMessage({
        message: '正在提交信息中,请勿重复保存',
        type: 'success'
      })
      savePicture()
    } else {
      ElMessage.error('请合理填写信息！')
    }
  })
}

const savePicture = async () => {
  const res = await PictureEditAPI({
    pid: picture.value.pid,
    picName: picture.value.picName,
    introduction: picture.value.introduction,
    category: picture.value.category,
    tags: picture.value.tags
  })
  console.log(picture.value)
  if (res.code == 0) {
    ElMessage.success('保存成功!')
  }
}

const outPaintingSuccess = (newPicture: string) => {
  picture.value.url = newPicture
  picture.value.webp = newPicture
}
const onSuccess = (newPicture: PictureData) => {
  picture.value.url = newPicture.url
  picture.value.pid = newPicture.pid
  picture.value.thumbnailUrl = newPicture.thumbnailUrl
  picture.value.webp = newPicture.webp
  picture.value.picName = newPicture.picName
  picture.value.picSize = newPicture.picSize
  picture.value.picFormat = newPicture.picFormat
  picture.value.picScale = newPicture.picScale
  picture.value.picHeight = newPicture.picHeight
  picture.value.picWidth = newPicture.picWidth
}

const GetTagsAndCategory = async () => {
  const res = await PictureTagCategory()
  if (res.code == 0) {
    tags.value = res.data.tags
    category.value = res.data.category
  }
}
const querySearch = (queryString: string, cb: any) => {
  // const results = queryString
  //   ? category.value!.filter(createFilter(queryString))
  //   : category.value;
  // call callback function to return suggestions

  cb(convertToCategoryArray(category.value!))
}

const convertToCategoryArray = (strArray: string[]): Category[] => {
  return strArray.map((item) => ({ value: item }))
}

const getOlPicture = async () => {
  const id = route.query?.id as string
  const spaceId = route.query?.id as string
  if (id) {
    //如果传来了新id 直接搜索
    const res = await PictureFindByIdAPI({
      pid: id,
      spaceId: spaceId ?? '0'
    })
    if (res.code == 0) {
      picture.value = res.data.picture
      console.log(res.data.picture)
    }
  } else {
    //上传新图片 无需处理
  }
}
const spaceData = ref<SpaceData>({
  spaceType: 0,
  createdAt: '',
  editAt: '',
  id: '',
  maxCount: 0,
  maxSize: 0,
  spaceLever: 0,
  spaceName: '公共空间',
  totalCount: 0,
  totalSize: 0,
  updatedAt: '',
  userId: ''
})
const getUserSpaceData = async () => {
    const res = await SpaceUserFindByIdAPI(spaceId.value as string)
    if (res.code == 0) {
      spaceData.value = res.data.data
      console.log(res.data.data)
    }
}


onMounted(async () => {
  await GetTagsAndCategory()
  await getOlPicture()
  if (spaceId.value != '0') {
    await getUserSpaceData()
  }
})
</script>

<style scoped lang="css">
#picture_add {
  max-width: 720px;
  margin: 0 auto;
}

:deep(.el-popper is-light el-select__popper) {
  margin-left: 50px !important;
}
</style>