import type { SysUserListVO } from '@/types/Users'
import { saveAs } from 'file-saver'

export type PictureEditRequest ={
  pid:string
  picName:string
  introduction:string
  category:string
  tags:string[]
}

export type PictureUpdateRequest ={
  pid:string
  picName:string
  introduction:string
  category:string
  tags:string[]
}

export type PictureListRequest ={
  pid:string
  picName:string
  introduction:string
  category:string
  tags:string[]
  picSize:number
  picWidth:number
  picHeight:number
  picScale:number
  picFormat:string
  searchText:string
  page:number
  size:number
  spaceId:string
  startEditTime:string
  endEditTime:string
  ave:string
}

export type PictureData={
  id:string
  pid:string
  url:string
  picName:string
  introduction:string
  category:string
  tags:string[]
  picSize:number
  picWidth:number
  picHeight:number
  picScale:number
  picFormat:string
  userId:string
  createdAt:string
  editAt:string
  updatedAt:string
  reviewerId:string
  reviewMessage:string
  reviewStatus:number
  reviewAt:string
  webp:string
  thumbnailUrl:string
}

export type PictureTagCategoryResponse={
  category:string[]
  tags:string[]
}

// 可以用通用返回结果
export type PictureListResponse ={
  records:PictureData[];
  total:number;
}
export type PictureFindByIdRequest ={
  pid:string;
  spaceId:string;
}
export type PictureFindByIdResponse ={
  picture:PictureData;
}

export type PictureDeleteShow = {
  pid?: string
  pictureName?: string
}
export type PictureUsingList={
  id:string
  pid:string
  url:string
  picName:string
  introduction:string
  category:string
  tags:string[]
  webp:string
  thumbnailUrl:string
  spaceId:string
  ave:string
}
export type PictureAndUserFindByIdResponse={
  id:string
  pid:string
  url:string
  webp:string
  thumbnailUrl:string
  picName:string
  introduction:string
  category:string
  tags:string[]
  picSize:number
  picWidth:number
  picHeight:number
  picScale:number
  picFormat:string
  createdAt:string
  user:SysUserListVO
  spaceId:string
}
export type PictureReviewRequest = {
  pid?: string
  reviewStatus?: number
}


export type PictureUploadByBatchRequest={
  searchText:string
  introduction:string
  category:string
  tags:string[]
  count:number
}
export type PictureUploadByBatchResponse={
  count:number
}
export type PictureSearchBySearchRequest={
  url:string
}
export type PictureSearchBySearchResponse={
  records:PictureSearchBySearch[]
}
export type PictureSearchBySearch={
  thumbUrl:string
  formUrl:string
}
export type PictureSearchByColorRequest={
  color:string
  spaceId:string
}
export type PictureListEditRequest={
  pid:string[]
  tags:string[]
  category:string
  spaceId:string
  picName:string
}
export type PictureCreateOutPaintingTaskRequest={
  pid:string
  parameters:Parameters
}


export type PictureCreateOutPaintingTaskResponse={
  taskId:string
}

export type PictureGetOutPaintingTaskRequest={
  taskId:string
}
export type PictureGetOutPaintingTaskResponse={
  isSuccess:number
  imageUrl:string
  errMessage:string
}

export type Parameters={
  angle:number
  left_offset:number
  right_offset:number
  top_offset:number
  bottom_offset:number
  x_scale:number
  y_scale:number
  output_ratio:string
  best_quality:boolean
  limit_image_size:boolean
  add_watermark:boolean
}

export const PIC_REVIEW_STATUS_ENUM={
  PictureReviewing:1,
  PicturePass:2,
  PictureReject:3
} as const

/**
 * 格式化文件大小
 * @param size
 */
export const formatSize = (size?: number) => {
  if (!size) return '未知'
  if (size < 1024) return size + ' B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
  return (size / (1024 * 1024)).toFixed(2) + ' MB'
}
/**
 * 下载图片
 * @param url 图片下载地址
 * @param fileName 要保存为的文件名
 */
export const downloadImage = (url?: string, fileName?: string)=> {
  if (!url) {
    return
  }
  // 使用第三方 file-saver库下载文件
  saveAs(url, fileName)
}



export const PICTURE_EDIT_MESSAGE_TYPE_ENUM = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  ENTER_EDIT: 'ENTER_EDIT',
  EXIT_EDIT: 'EXIT_EDIT',
  EDIT_ACTION: 'EDIT_ACTION',
};

export const PICTURE_EDIT_MESSAGE_TYPE_MAP = {
  INFO: '发送通知',
  ERROR: '发送错误',
  ENTER_EDIT: '进入编辑状态',
  EXIT_EDIT: '退出编辑状态',
  EDIT_ACTION: '执行编辑操作',
};

export const PICTURE_EDIT_ACTION_ENUM = {
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
  ROTATE_LEFT: 'ROTATE_LEFT',
  ROTATE_RIGHT: 'ROTATE_RIGHT',
};

export const PICTURE_EDIT_ACTION_MAP = {
  ZOOM_IN: '放大操作',
  ZOOM_OUT: '缩小操作',
  ROTATE_LEFT: '左旋操作',
  ROTATE_RIGHT: '右旋操作',
};
