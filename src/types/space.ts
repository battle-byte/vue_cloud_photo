import type { SysUserListVO } from '@/types/Users'
import { saveAs } from 'file-saver'

export type SpaceCreateRequest ={
  spaceName:string
  spaceLevel:number
  spaceType:number
}

export type SpaceUpdateRequest ={
  id:string
  spaceName:string
  spaceLever:number
  maxSize:number
  maxCount:number
  spaceType:number
}

export type SpaceListWithUserRequest ={
  id:string
  spaceName:string
  spaceLever:number
  userId:string
  page:number
  size:number
}

export type SpaceAndUserResponse ={
  id:string
  spaceName:string
  spaceLever:number
  maxSize:number
  maxCount:number
  totalSize:number
  totalCount:number
  userId:string
  createdAt:string
  editAt:string
  updatedAt:string
  spaceType:number
  user:SysUserListVO
}

export type SpaceUserFindByIdResponse ={
  data:SpaceData
}
export type SpaceUserFindByUserIdRequest ={
  spaceType:number
}

export type SpaceUserFindByUserIdResponse ={
  data:SpaceData
}

export type SpaceData ={
  id:string
  spaceName:string
  spaceLever:number
  maxSize:number
  maxCount:number
  totalSize:number
  totalCount:number
  userId:string
  createdAt:string
  editAt:string
  updatedAt:string
  spaceType:number
}
export type SpaceEditRequest ={
  id:string
  spaceName:string
  spaceLever:number
}
export type SpaceLeverListResponse ={
  records:SpaceLeverData[]
}
export type SpaceDeleteShow ={
  id:string
  spaceName:string
}

export type SpaceLeverData ={
  text:string
  value:string
  maxCount:number
  maxSize:number
}

export const SPACE_LEVEL_ENUM={
  COMMON:0,
  PROFESSIONAL:1,
  FLAGSHIP:2
}

export const SPACE_LEVEL_MAP:Record<number, string>={
  0:"普通版",
  1:"专业版",
  2:"旗舰版"
}

export const SPACE_LEVEL_OPTIONS=Object.keys(SPACE_LEVEL_MAP).map((key)=>{
  const value = Number(key)
  return {
    label:SPACE_LEVEL_MAP[value],
    value:key
  }
});


// 空间类型枚举
export const SPACE_TYPE_ENUM = {
  PRIVATE: 0,
  TEAM: 1,
}
// 空间类型文本映射
export const SPACE_TYPE_MAP: Record<number, string> = {
  0: '私有空间',
  1: '团队空间',
}

// 空间类型选项映射
export const SPACE_TYPE_OPTIONS = Object.keys(SPACE_TYPE_MAP).map((key) => {
  const value = Number(key) // 将字符串 key 转换为数字
  return {
    label: SPACE_TYPE_MAP[value],
    value,
  }
})