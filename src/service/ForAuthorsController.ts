import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  ForAuthorsContent,
  ForAuthorsContentEdit,
  ForAuthorsParam,
  ForAuthorsVO,
  SelectOrInSaveForAuthors
} from '@/types/ForAuthors'
import type { PageResult } from '@/types/Pages'

// 分页查询
export const SelectForAuthorsByPageAPI = (
  data: ForAuthorsParam
): Promise<ApiResponse<PageResult<ForAuthorsVO>>> | Promise<never> => {
  return service.post(`/forAuthors/selectList`, data)
}

// 删除
export const DeleteForAuthorsByAidAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/forAuthors/delete/${id}`)
}

// 查询并创建
export const SaveOrCreateForAuthorsAPI = (
  data: SelectOrInSaveForAuthors
): Promise<ApiResponse<ForAuthorsContent>> | Promise<never> => {
  return service.post(`/forAuthors/SaveOrCreateForAuthors`, data)
}

// 修改
export const EditForAuthorsJournalsAPI = (
  data: ForAuthorsContentEdit
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/forAuthors/editForAuthors`, data)
}
