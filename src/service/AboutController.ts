import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  AboutContent,
  AboutContentEdit,
  AboutParam,
  AboutVO,
  SelectOrInSaveAbout
} from '@/types/About'
import type { PageResult } from '@/types/Pages'

// 分页查询
export const SelectAboutByPageAPI = (
  data: AboutParam
): Promise<ApiResponse<PageResult<AboutVO>>> | Promise<never> => {
  return service.post(`/about/selectList`, data)
}

// 删除
export const DeleteAboutByAidAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/about/delete/${id}`)
}

// 查询并创建
export const SaveOrCreateAboutAPI = (
  data: SelectOrInSaveAbout
): Promise<ApiResponse<AboutContent>> | Promise<never> => {
  return service.post(`/about/SaveOrCreateAbout`, data)
}

// 修改
export const EditAboutJournalsAPI = (
  data: AboutContentEdit
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/about/editAbout`, data)
}
