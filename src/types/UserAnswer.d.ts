/*UserAnswerVO*/
import type { UserVO } from '@/types/Admin'

export type UserAnswerVO = {
  id?: string
  appId?: string
  appType?: number
  scoringStrategy?: number
  choices?: string[]
  resultId?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultScore?: number
  userId?: string
  createTime?: string
  user?: UserVO
}

/*DTO*/
/**
 * 创建用户答案请求
 */
export type UserAnswerAddDTO = {
  appId?: string
  choices?: string[]
}

/**
 * 编辑用户答案请求
 */
export type UserAnswerEditDTO = {
  id?: string
  appId?: string
  choices?: string[]
}

/**
 * 查询用户答案请求
 */
export type UserAnswerQueryDTO = {
  id?: string
  appId?: string
  appType?: number
  scoringStrategy?: number
  choices?: string
  resultId?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultScore?: number
  userId?: string
  notId?: string
  searchText?: string
  page?: number
  pageSize?: number
}

/**
 * 更新用户答案请求
 */
export type UserAnswerUpdateDTO = {
  id?: string
  appId?: string
  choices?: string[]
}
