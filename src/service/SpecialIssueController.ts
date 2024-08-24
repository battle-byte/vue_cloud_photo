import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  SpecialIssueContent,
  SpecialIssueContentEdit,
  SpecialIssueParam,
  SpecialIssueVO,
  SelectOrInSaveSpecialIssue
} from '@/types/SpecialIssue'
import type { PageResult } from '@/types/Pages'

// 分页查询
export const SelectSpecialIssueByPageAPI = (
  data: SpecialIssueParam
): Promise<ApiResponse<PageResult<SpecialIssueVO>>> | Promise<never> => {
  return service.post(`/specialIssue/selectList`, data)
}

// 删除
export const DeleteSpecialIssueByAidAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/specialIssue/delete/${id}`)
}

// 查询并创建
export const SaveOrCreateSpecialIssueAPI = (
  data: SelectOrInSaveSpecialIssue
): Promise<ApiResponse<SpecialIssueContent>> | Promise<never> => {
  return service.post(`/specialIssue/SaveOrCreateSpecialIssue`, data)
}

// 修改
export const EditSpecialIssueJournalsAPI = (
  data: SpecialIssueContentEdit
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/specialIssue/editSpecialIssue`, data)
}
