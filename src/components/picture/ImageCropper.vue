<template>
  <a-modal
    class="image-cropper"
    v-model:visible="visible"
    title="编辑图片"
    :footer="false"
    @cancel="closeModal"
  >
    <div class="image-cropper">
      <vueCropper
        ref="cropperRef"
        :img="imageUrl"
        :autoCrop="true"
        :fixedBox="false"
        :centerBox="true"
        :canMoveBox="true"
        :info="true"
        outputType="png"
      />
      <div style="margin-bottom: 16px" />
      <!-- 图片操作 -->
      <div class="image-cropper-actions" v-if="isTeamSpace">
        <a-space>
          <a-button v-if="editingUser" disabled>{{ editingUser?.nickname }}正在编辑</a-button>
          <a-button v-if="canEnterEdit" @click="enterEdit" type="primary">进入编辑</a-button>
          <a-button v-if="canExitEdit" @click="exitEdit" danger ghost>退出编辑</a-button>
        </a-space>
      </div>
      <div style="margin-bottom: 16px" />
      <!-- 图片操作 -->
      <div class="image-cropper-actions">
        <a-space>
          <a-button @click="rotateLeft" :disabled="!canEdit">向左旋转</a-button>
          <a-button @click="rotateRight" :disabled="!canEdit">向右旋转</a-button>
          <a-button @click="changeScale(1)" :disabled="!canEdit">放大</a-button>
          <a-button @click="changeScale(-1)" :disabled="!canEdit">缩小</a-button>
          <a-button type="primary" :loading="loading" @click="handleConfirm" :disabled="!canEdit"
            >确认</a-button
          >
        </a-space>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

import {
  PICTURE_EDIT_ACTION_ENUM, PICTURE_EDIT_ACTION_MAP,
  PICTURE_EDIT_MESSAGE_TYPE_ENUM,
  type PictureData
} from '@/types/picture'
import { ElMessage } from 'element-plus'
import { FileLoadAndParseAPI } from '@/service/UpLoadFile'
import { userStore } from '@/stores'
import type { SysUserListVO } from '@/types/Users'
import PictureEditWebSocket from '@/utils/webSocketUtil'
import { SPACE_TYPE_ENUM, type SpaceData } from '@/types/space'

interface Props {
  imageUrl?: string
  picture?: PictureData
  spaceId?: string
  onSuccess?: (newPicture: PictureData) => void
  space?:SpaceData
}

const props = defineProps<Props>()

const isTeamSpace = computed(() =>{
  return props.space?.spaceType === SPACE_TYPE_ENUM.TEAM
})

// 编辑器组件的引用
const cropperRef = ref()

// 向左旋转
const rotateLeft = () => {
  cropperRef.value.rotateLeft()
  editAction(PICTURE_EDIT_ACTION_MAP.ROTATE_LEFT)
}

// 向右旋转
const rotateRight = () => {
  cropperRef.value.rotateRight()
  editAction(PICTURE_EDIT_ACTION_MAP.ROTATE_RIGHT)
}

// 缩放
const changeScale = (num: number) => {
  cropperRef.value.changeScale(num)
  if (num > 0) {
    editAction(PICTURE_EDIT_ACTION_MAP.ZOOM_IN)
  } else if (num < 0) {
    editAction(PICTURE_EDIT_ACTION_MAP.ZOOM_OUT)
  }
}
const handleConfirm = () => {
  cropperRef.value.getCropBlob((blob: Blob) => {
    const fileName = (props.picture?.picName || 'image') + '.png'
    const file = new File([blob], fileName, { type: blob.type })
    addPhoto({ file })
  })
}

// 是否可见
const visible = ref(false)
const picture = ref<PictureData>({
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
  reviewAt: '',
  reviewMessage: '',
  reviewStatus: 0,
  reviewerId: '',
  tags: [],
  thumbnailUrl: '',
  updatedAt: '',
  url: '',
  userId: '',
  webp: ''
})
// 打开弹窗
const openModal = () => {
  visible.value = true
}
const loading = ref<boolean>(false)
// 关闭弹窗
const closeModal = () => {
  visible.value = false
}
const addPhoto = async (files: any) => {
  ElMessage({
    message: '上传中,请耐心等待',
    type: 'success'
  })
  loading.value = true
  try {
    let fromData = new FormData()
    fromData.append('file', files.file)
    fromData.append('spaceId', props.spaceId ?? '0')
    // 图片id 0为新建图片 否则为覆盖原来的图片
    if (props.picture?.pid === '' || props.picture?.pid === undefined) {
      fromData.append('pid', '0')
    } else {
      fromData.append('pid', props.picture?.pid)
    }
    let res = await FileLoadAndParseAPI(fromData) // 上传图片并解析
    if (res.code === 0) {
      ElMessage({
        message: '上传成功,等待加载中',
        type: 'success'
      })
      picture.value.url = res.data.url
      picture.value.pid = res.data.pid
      picture.value.category = res.data.category
      picture.value.createdAt = res.data.createdAt
      picture.value.editAt = res.data.editAt
      picture.value.id = res.data.id
      picture.value.introduction = res.data.introduction
      picture.value.picFormat = res.data.picFormat
      picture.value.picHeight = res.data.picHeight
      picture.value.picName = res.data.picName
      picture.value.picScale = res.data.picScale
      picture.value.picSize = res.data.picSize
      picture.value.picWidth = res.data.picWidth
      picture.value.pid = res.data.pid
      picture.value.tags = res.data.tags
      picture.value.updatedAt = res.data.updatedAt
      picture.value.url = res.data.url
      picture.value.userId = res.data.userId
      picture.value.thumbnailUrl = res.data.thumbnailUrl
      picture.value.webp = res.data.webp
      // 将数据送回父组件
      props.onSuccess?.(picture.value)
      closeModal()
    } else {
      ElMessage({
        message: res.message,
        type: 'error'
      })
    }
  } catch (err) {
    ElMessage({
      message: '上传失败',
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}
// 暴露函数给父组件
defineExpose({
  openModal
})

/*实施编辑*/
const loginUserStore = userStore()
const loginUser = loginUserStore.user
// 正在编辑的用户
const editingUser = ref<SysUserListVO>()

const canEnterEdit = computed(() => {
  return !editingUser.value
})
// 当前用户是否可以退出编辑
const canExitEdit = computed(() => {
  return editingUser.value?.uid == loginUser?.uid
})

// 是否可以点击编辑按钮
const canEdit = computed(() => {
  // 私有空间
  if (!isTeamSpace.value){
    return true
  }
  // 团队空间
  return editingUser.value?.uid == loginUser?.uid
})

let websocket: PictureEditWebSocket | undefined
// 初始化websocket
const initWebsocket = () => {
  const picture = props.picture?.pid
  if (!picture || !visible.value) {
    // 图片没有id以及弹窗没有打开
    return
  }

  // 如果已经存在websocket则先断开 防止之前的连接未释放
  if (websocket) {
    websocket.disconnect()
  }

  // 创建websocket
  websocket = new PictureEditWebSocket(Number(picture))
  websocket.connect()

  // 监听一些列的事件
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.INFO, (msg) => {
    ElMessage.success(msg)
  })

  // 监听一些列的事件
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ERROR, (msg) => {
    ElMessage.success(msg)
  })

  // 监听一些列的事件
  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT, (msg) => {

    ElMessage.success(msg)
    editingUser.value = msg.user
  })

  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT, (msg) => {
    ElMessage.success(msg)
    editingUser.value = undefined
  })

  websocket.on(PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION, (msg) => {
    ElMessage.success(msg)
    if (editingUser.value?.uid == loginUser?.uid) {
      return
    } // 如果是当前用户则不执行
    switch (msg.editAction) {
      case PICTURE_EDIT_ACTION_MAP.ROTATE_LEFT: //左旋
        rotateLeft()
        break
      case PICTURE_EDIT_ACTION_MAP.ROTATE_RIGHT: //左旋
        rotateRight()
        break
      case PICTURE_EDIT_ACTION_MAP.ZOOM_IN: //放大
        changeScale(1)
        break
      case PICTURE_EDIT_ACTION_MAP.ZOOM_OUT: //缩小
        changeScale(-1)
        break
    }
  })
}

// 监听属性变化 初始化websocket
watchEffect(() => {
  // 团队空间才能进行初始化websocket
  if (isTeamSpace.value){
    initWebsocket()
  }
})

onMounted(() => {
  if (websocket) {
    websocket.disconnect()
  }
  editingUser.value = undefined
})

// 进入编辑
const enterEdit = () => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.ENTER_EDIT
    })
  }
}

// 进入编辑
const exitEdit = () => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EXIT_EDIT
    })
  }
}

// 执行操作
const editAction = (editAction: string) => {
  if (websocket) {
    websocket.sendMessage({
      type: PICTURE_EDIT_MESSAGE_TYPE_ENUM.EDIT_ACTION,
      edit_action:editAction
    })
  }
}
</script>

<style scoped>
.image-cropper {
  text-align: center;
}

.image-cropper .vue-cropper {
  height: 400px;
}
</style>
