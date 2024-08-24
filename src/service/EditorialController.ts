import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type { Editorial, EditorialEditParam, EditorialQueryByPageParam, EditorialQueryVO, EditorialSaveParam } from '@/types/Editorial'

// 分页查询编委会列表
export const SelectEditorialByPageAPI = (
  data: EditorialQueryByPageParam
): Promise<ApiResponse<PageResult<EditorialQueryVO>>> | Promise<never> => {
  return service.post(`/editorial/selectList`, data)
}

// 根据id搜索编委会编委会内容 SelectEditorialByIdAPI
export const selectEditorialOneAPI = (id: string): Promise<ApiResponse<EditorialQueryVO>> | Promise<never> => {
  return service.get(`/editorial/selectEditorialOne/${id}`)
}

// 修改编委会编委会内容 EditEditorialBase
export const EditEditorialBaseAPI = (
  data: EditorialEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/editorial/editEditorial`, data)
}


// SaveEditorialBaseAPI 修改编委会编委会内容
export const SaveEditorialBaseAPI = (
  data: EditorialSaveParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/editorial/saveEditorial`, data)
}

// deleteEditorialIdAPI 删除期刊
export const deleteEditorialIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/editorial/delete/${id}`)
}
