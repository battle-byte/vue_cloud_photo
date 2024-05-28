/*ScoringResultVO*/
import type { UserVO } from '@/types/Admin'

export type ScoringResultVO = {
  id?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
  appId?: string
  userId?: string
  createTime?: string
  updateTime?: string
  user?: UserVO
}


/*DTO*/
/**
 * 创建评分结果请求
 */
export type ScoringResultAddDTO = {
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
  appId?: string
}

/**
 * 编辑评分结果请求
 */
export type ScoringResultEditDTO = {
  id?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
}
/**
 * 查询评分结果请求
 */
export type ScoringResultQueryDTO = {
  id?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultProp?: string
  resultScoreRange?: number
  appId?: string
  userId?: string
  notId?: string
  searchText?: string
  page?: number
  pageSize?: number
}

/**
 * 更新评分结果请求
 */
export type ScoringResultUpdateDTO = {
  id?: string
  resultName?: string
  resultDesc?: string
  resultPicture?: string
  resultProp?: string
  resultScoreRange?: number
}
