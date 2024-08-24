import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  ForReviewersContent,
  ForReviewersContentEdit,
  ForReviewersParam,
  ForReviewersVO,
  SelectOrInSaveForReviewers
} from '@/types/ForReviewers'
import type { PageResult } from '@/types/Pages'

// 分页查询
export const SelectForReviewersByPageAPI = (
  data: ForReviewersParam
): Promise<ApiResponse<PageResult<ForReviewersVO>>> | Promise<never> => {
  return service.post(`/forReviewers/selectList`, data)
}

// 删除
export const DeleteForReviewersByAidAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/forReviewers/delete/${id}`)
}

// 查询并创建
export const SaveOrCreateForReviewersAPI = (
  data: SelectOrInSaveForReviewers
): Promise<ApiResponse<ForReviewersContent>> | Promise<never> => {
  return service.post(`/forReviewers/SaveOrCreateForReviewers`, data)
}

// 修改
export const EditForReviewersJournalsAPI = (
  data: ForReviewersContentEdit
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/forReviewers/editForReviewers`, data)
}
