import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  QuestionAddDTO,
  QuestionEditDTO,
  QuestionQueryDTO,
  QuestionUpdateDTO,
  QuestionVO
} from '@/types/Question'
import type { DeleteDTO } from '@/types/Delete'
import type { AppQueryDTO } from '@/types/App'
import type { PageResult } from '@/types/Pages'

/**
 * 创建题目
 * @param data
 */
export const addQuestionAPI = (data: QuestionAddDTO): Promise<ApiResponse<String>> => {
  return service.post('/question/add', data)
}

/**
 * 删除题目
 * @param data
 */
export const deleteQuestionAPI = (data: DeleteDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/question/delete', data)
}

/**
 * 更新题目（仅管理员可用）
 * @param data
 */
export const updateQuestionAPI = (data: QuestionUpdateDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/question/update', data)
}

/**
 * 根据 id 获取题目（封装类）
 * @param id
 */
export const getQuestionVOByIdAPI = (id: string): Promise<ApiResponse<QuestionVO>> => {
  return service.get(`/question/get/vo/${id}`)
}

/**
 * 分页获取题目列表（仅管理员可用）
 * @param data
 */
export const listQuestionByPageAPI = (
  data: QuestionQueryDTO
): Promise<ApiResponse<PageResult<QuestionVO>>> => {
  return service.post(`/question/list/page`, data)
}

/**
 * 分页获取题目列表（封装类）
 * @param data
 */
export const listQuestionVOByPageAPI = (
  data: QuestionQueryDTO
): Promise<ApiResponse<PageResult<QuestionVO>>> => {
  return service.post(`/question/list/page/vo`, data)
}

/**
 * 分页获取当前登录用户创建的题目列表
 * @param data
 */
export const listMyQuestionVOByPageAPI = (
  data: QuestionQueryDTO
): Promise<ApiResponse<PageResult<QuestionVO>>> => {
  return service.post(`/question/my/list/page/vo`, data)
}

/**
 * 编辑题目（给用户使用）
 * @param data
 */
export const editQuestionAPI = (data: QuestionEditDTO): Promise<ApiResponse<boolean>> => {
  return service.post(`/question/edit`, data)
}
