import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  ArticleBaseEditParam,
  ArticleContentEditParam,
  ArticleContentEditVO,
  ArticlePerfect,
  ArticlePublish,
  ArticleQueryAndPeriodicalVO,
  ArticleQueryByPageParam,
  ArticleQueryVO
} from '@/types/Article'
import type { PageResult } from '@/types/Pages'

// 分页查询文章列表
export const SelectArticleByPageAPI = (
  data: ArticleQueryByPageParam
): Promise<ApiResponse<PageResult<ArticleQueryAndPeriodicalVO>>> | Promise<never> => {
  return service.post(`/article/selectList`, data)
}

// 发布文章 SetArticlePublish
export const SetArticlePublishAPI = (
  data: ArticlePublish
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/publish`, data)
}

// 发布文章 SetArticleNotPublish
export const SetArticleNotPublishAPI = (
  data: ArticlePublish
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/cancelPublish`, data)
}

// 设为精品 SetArticlePublish
export const SetArticlePerfectAPI = (
  data: ArticlePerfect
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/perfect`, data)
}

// 取消精品 SetArticleNotPublish
export const SetArticleNotPerfectAPI = (
  data: ArticlePerfect
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/cancelPerfect`, data)
}

// 根据id搜索文章基本内容 SelectArticleByIdAPI
export const SelectArticleByIdAPI = (
  id: string
): Promise<ApiResponse<ArticleQueryVO>> | Promise<never> => {
  return service.get(`/article/selectArticleOne/${id}`)
}

// 根据id搜索文章核心内容 SelectArticleByIdAPI
export const SelectArticleContentByIdAPI = (
  id: string
): Promise<ApiResponse<ArticleContentEditVO>> | Promise<never> => {
  return service.post(`/article/SelectArticleContent/${id}`)
}

// 修改文章基本内容 EditArticleBase
export const EditArticleBaseAPI = (
  data: ArticleBaseEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/editArticleBase`, data)
}
// 修改文章基本内容 EditArticleBase
export const EditArticleCommentAPI = (
  data: ArticleContentEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/editArticleComment`, data)
}

// SaveArticleBaseAPI 修改文章基本内容
export const SaveArticleBaseAPI = (
  data: ArticleBaseEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/article/saveArticleBase`, data)
}

// deleteArticleIdAPI 删除期刊
export const deleteArticleIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/article/delete/${id}`)
}