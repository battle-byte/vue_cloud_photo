import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type { UserArticleParam, UserArticleVO } from '@/types/UserArticle'

// 分页查询新闻列表
export const SelectUserArticleByPageAPI = (
  data: UserArticleParam
): Promise<ApiResponse<PageResult<UserArticleVO>>> | Promise<never> => {
  return service.post(`/userArticle/selectList`, data)
}

// deleteNewsIdAPI 删除高校
export const DeleteUserArticleIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/userArticle/delete/${id}`)
}
