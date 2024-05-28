import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { AppAddDTO, AppDeleteDTO, AppEditDTO, AppQueryDTO, AppUpdateDTO, AppVO, ReviewDTO } from '@/types/App'
import type { PageResult } from '@/types/Pages'
import type { DeleteDTO } from '@/types/Delete'

/**
 * 创建应用
 * @param data
 */
export const addAppAPI = (data: AppAddDTO): Promise<ApiResponse<String>> => {
  return service.post('/app/add', data)
}

/**
 * 删除应用
 * @param data
 */
export const deleteAppAPI = (data: DeleteDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/app/delete', data)
}

/**
 * 更新应用（仅管理员可用）
 * @param data
 */
export const updateAppAPI = (data: AppUpdateDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/app/update', data)
}

/**
 * 根据 id 获取应用（封装类）
 * @param id
 */
export const getAppVOByIdAPI = (id: string): Promise<ApiResponse<AppVO>> => {
  return service.get(`/app/get/vo/${id}`)
}

/**
 * 分页获取应用列表（仅管理员可用）
 * @param data
 */
export const listAppByPageAPI = (data: AppQueryDTO): Promise<ApiResponse<PageResult<AppVO>>> => {
  return service.post(`/app/list/page`, data)
}

/**
 * 分页获取应用列表（封装类）
 * @param data
 */
export const listAppVOByPageAPI = (data: AppQueryDTO): Promise<ApiResponse<PageResult<AppVO>>> => {
  return service.post(`/app/list/page/vo`, data)
}

/**
 * 分页获取当前登录用户创建的应用列表
 * @param data
 */
export const listMyAppVOByPageAPI = (data: AppQueryDTO): Promise<ApiResponse<PageResult<AppVO>>> => {
  return service.post(`/app/my/list/page/vo`, data)
}

/**
 * 编辑应用（给用户使用）
 * @param data
 */
export const editAppAPI = (data: AppEditDTO): Promise<ApiResponse<PageResult<boolean>>> => {
  return service.post(`/app/edit`, data)
}

/**
 * 应用审核
 * @param data
 */
export const doAppReviewAPI = (data: ReviewDTO): Promise<ApiResponse<PageResult<boolean>>> => {
  return service.post(`/app/review`, data)
}