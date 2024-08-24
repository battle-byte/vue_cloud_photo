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
import type { UserArticleParam, UserArticleVO } from '@/types/UserArticle'

// 分页查询新闻列表
export const SelectUserArticleByPageAPI = (
  data: UserArticleParam
): Promise<ApiResponse<PageResult<UserArticleVO>>> | Promise<never> => {
  return service.post(`/userArticle/selectList`, data)
}

// deleteNewsIdAPI 删除期刊
export const DeleteUserArticleIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/userArticle/delete/${id}`)
}
