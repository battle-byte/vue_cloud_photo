import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  UserAnswerAddDTO,
  UserAnswerEditDTO,
  UserAnswerQueryDTO,
  UserAnswerUpdateDTO,
  UserAnswerVO
} from '@/types/UserAnswer'
import type { DeleteDTO } from '@/types/Delete'
import type { PageResult } from '@/types/Pages'

/**
 * 创建用户答案
 * @param data
 */
export const addUserAnswerAPI = (data: UserAnswerAddDTO): Promise<ApiResponse<String>> => {
  return service.post('/userAnswer/add', data)
}

/**
 * 删除用户答案
 * @param data
 */
export const deleteUserAnswerAPI = (data: DeleteDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/userAnswer/delete', data)
}

/**
 * 更新用户答案（仅管理员可用）
 * @param data
 */
export const updateUserAnswerAPI = (data: UserAnswerUpdateDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/userAnswer/update', data)
}

/**
 * 根据 id 获取用户答案（封装类）
 * @param id
 */
export const getUserAnswerVOByIdAPI = (id: string): Promise<ApiResponse<UserAnswerVO>> => {
  return service.get(`/userAnswer/get/vo/${id}`)
}

/**
 * 分页获取用户答案列表（仅管理员可用）
 * @param data
 */
export const listUserAnswerByPageAPI = (
  data: UserAnswerQueryDTO
): Promise<ApiResponse<PageResult<UserAnswerVO>>> => {
  return service.post(`/userAnswer/list/page`, data)
}

/**
 * 分页获取用户答案列表（封装类）
 * @param data
 */
export const listUserAnswerVOByPageAPI = (
  data: UserAnswerQueryDTO
): Promise<ApiResponse<PageResult<UserAnswerVO>>> => {
  return service.post(`/userAnswer/list/page/vo`, data)
}

/**
 * 分页获取当前登录用户创建的用户答案列表
 * @param data
 */
export const listMyUserAnswerVOByPageAPI = (
  data: UserAnswerQueryDTO
): Promise<ApiResponse<PageResult<UserAnswerVO>>> => {
  return service.post(`/userAnswer/my/list/page/vo`, data)
}

/**
 * 编辑用户答案（给用户使用）
 * @param data
 */
export const editUserAnswerAPI = (data: UserAnswerEditDTO): Promise<ApiResponse<boolean>> => {
  return service.post(`/userAnsweredit`, data)
}
