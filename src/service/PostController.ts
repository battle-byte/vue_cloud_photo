import type { ApiResponse } from '@/request/ApiResponse'
import service from '@/request/request'
import type {
  AddPostCount,
  adminUpdatePost,
  postList,
  SearchPost,
  submitPost
} from '@/types/Post'
import type { PageResult } from '@/types/Pages'

/**
 * 模糊查询官方文章
 */
export const getAdminPostMessageSearchAPI = (data: SearchPost): Promise<ApiResponse<PageResult<postList>>> => {
  return service.post('/admin/post/getListPost', data)
}

/**
 * 查看 流式传输 文章
 */
export const ViewPostAPI = (id: string): Promise<ApiResponse<string>> => {
  return service.get(`/admin/post/openNewPost/${id}`)
}


/**
 * 提交文章
 * @param id
 */
export const submitPostAPI = (data: submitPost): Promise<ApiResponse<number>> => {
  return service.get('/admin/post/submitPost')
}


/**
 * 模糊查询用户文章
 */
export const getPostMessageSearchAPI = (data: SearchPost): Promise<ApiResponse<PageResult<postList>>> => {
  return service.post('/admin/post/getPostMessageSearch', data)
}


//管理员重新编辑文章
export const handleEditPostAPI = (data: adminUpdatePost): Promise<ApiResponse<number>> => {
  return service.post('/admin/post/handleEditPost', data)
}


