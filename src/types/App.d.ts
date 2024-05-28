/*AppVO*/
import type { UserVO } from '@/types/Admin'

export type AppVO = {
  id?: string
  appName?: string
  appDesc?: string
  appIcon?: string
  appType?: number
  scoringStrategy?: number
  reviewStatus?: number
  reviewMessage?: string
  reviewerId?: string
  reviewTime?: string
  userId?: string
  createTime?: string
  updateTime?: string
  user?: UserVO
}

/*DTO*/
//增加APP
export type AppAddDTO = {
  appName?: string
  appDesc?: string
  appIcon?: string
  appType?: number
  scoringStrategy?: number
}

//删除APP
export type AppDeleteDTO = {
  id?: string
  isDelete?: number
}

//编辑APP 用户使用
export type AppEditDTO = {
  id?: string
  appName?: string
  appDesc?: string
  appIcon?: string
  appType?: number
  scoringStrategy?: number
}

//查询APP
export type AppQueryDTO = {
  id?: string
  appName?: string
  appDesc?: string
  appIcon?: string
  appType?: number
  scoringStrategy?: number
  reviewStatus?: number
  reviewMessage?: string
  searchText?: string
  reviewerId?: string
  page?: number
  pageSize?: number
}

//修改APP
export type AppUpdateDTO = {
  id?: string
  appName?: string
  appDesc?: string
  appIcon?: string
  appType?: number
  scoringStrategy?: number
  reviewStatus?: string
  reviewMessage?: string
  reviewerId?: string
  reviewTime?: string
}

//审核状态
export type ReviewDTO = {
  id?: string
  reviewStatus?: number
  reviewMessage?: string
}
