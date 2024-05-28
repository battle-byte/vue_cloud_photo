import type { UserVO } from '@/types/Admin'
/*questionVO*/
export type QuestionVO = {
  id?: string
  questionContent?: QuestionContentDTO[]
  appId?: string
  userId?: string
  createTime?: string
  updateTime?: string
  user?: UserVO
}

/*题目选项*/
export type Option = {
  result?: string
  score?: number
  value?: string
  key?: string
}

/*
 * DTO
 */

/*题目选择情况*/
export type QuestionContentDTO = {
  title?: string
  options?: Option[]
}

//添加题目
export type QuestionAddDTO = {
  questionContentDTO?: QuestionContentDTO[]
  appId?: string
}

//编辑题目请求
export type QuestionEditDTO = {
  questionContentDTO?: QuestionContentDTO[]
  id?: string
}

/**
 * 题目查询
 */
export type QuestionQueryDTO = {
  id?: string
  questionContentDTO?: string
  userId?: string
  appId?: string
  searchText?: string
  page?: number
  pageSize?: number
}

/**
 * 题目更新请求
 */
export type QuestionUpdateDTO = {
  questionContentDTO?: QuestionContentDTO[]
  id?: string
}
