import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  News,
  NewsBaseEditParam,
  NewsContentEditParam,
  NewsContentEditVO,
  NewsQueryByPageParam,
  NewsQueryVO
} from '@/types/News'

// 分页查询新闻列表
export const SelectNewsByPageAPI = (
  data: NewsQueryByPageParam
): Promise<ApiResponse<PageResult<NewsQueryVO>>> | Promise<never> => {
  return service.post(`/news/selectList`, data)
}

// 根据id搜索新闻内容 SelectNewsByIdAPI
export const selectNewsOneAPI = (id: string): Promise<ApiResponse<NewsQueryVO>> | Promise<never> => {
  return service.get(`/news/selectNewsOne/${id}`)
}

// 根据id搜索新闻内容  selectNewsContentOne
export const SelectNewsContentByIdAPI = (id: string): Promise<ApiResponse<NewsContentEditParam>> | Promise<never> => {
  return service.get(`/news/selectNewsContentOne/${id}`)
}

// 修改新闻内容 EditNewsBase
export const EditNewsBaseAPI = (
  data: NewsBaseEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/news/editNews`, data)
}


// SaveNewsBaseAPI 修改新闻基础内容
export const SaveNewsBaseAPI = (
  data: NewsBaseEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/news/saveNews`, data)
}

// SaveNewsBaseAPI 修改新闻核心内容
export const EditNewsContentAPi = (
  data: NewsContentEditVO
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/news/editNewsContent`, data)
}

// deleteNewsIdAPI 删除期刊
export const deleteNewsIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/news/delete/${id}`)
}
