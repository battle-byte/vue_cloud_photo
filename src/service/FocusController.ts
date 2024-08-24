import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  FocusContent,
  FocusContentEdit,
  FocusParam,
  FocusVO,
  SelectOrInSaveFocus
} from '@/types/Focus'
import type { PageResult } from '@/types/Pages'

// 分页查询
export const SelectFocusByPageAPI = (
  data: FocusParam
): Promise<ApiResponse<PageResult<FocusVO>>> | Promise<never> => {
  return service.post(`/focus/selectList`, data)
}

// 删除
export const DeleteFocusByAidAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/focus/delete/${id}`)
}

// 查询并创建
export const SaveOrCreateFocusAPI = (
  data: SelectOrInSaveFocus
): Promise<ApiResponse<FocusContent>> | Promise<never> => {
  return service.post(`/focus/SaveOrCreateFocus`, data)
}

// 修改
export const EditFocusJournalsAPI = (
  data: FocusContentEdit
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/focus/editFocus`, data)
}
