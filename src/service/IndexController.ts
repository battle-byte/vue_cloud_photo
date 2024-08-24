import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { IndexEditParam, IndexQueryVO } from '@/types/Indextype'


// 根据id搜索公告内容 SelectIndexByIdAPI
export const selectIndexOneAPI = (
  id: string
): Promise<ApiResponse<IndexQueryVO>> | Promise<never> => {
  return service.get(`/index/selectIndexOne/${id}`)
}

// 修改首页内容泛型
export const EditIndexBaseAPI = (
  data: IndexEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/index/editIndexBase`, data)
}

// deleteIndexIdAPI 删除首页
export const deleteIndexIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/index/delete/${id}`)
}
