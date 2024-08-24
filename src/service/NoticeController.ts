import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  Notice,
  NoticeContentEditVO,
  NoticeQueryByPageParam, NoticeQueryByPageVO

} from '@/types/Notice'

// 分页查询公告列表
export const SelectNoticeByPageAPI = (
  data: NoticeQueryByPageParam
): Promise<ApiResponse<PageResult<NoticeQueryByPageVO>>> | Promise<never> => {
  return service.post(`/notice/selectList`, data)
}

// 根据id搜索公告内容 SelectNoticeByIdAPI
export const selectNoticeOneAPI = (id: string): Promise<ApiResponse<NoticeQueryByPageVO>> | Promise<never> => {
  return service.get(`/notice/selectNoticeOne/${id}`)
}

// 根据id搜索公告内容  selectNoticeContentOne
export const SelectNoticeContentByIdAPI = (id: string): Promise<ApiResponse<NoticeContentEditVO>> | Promise<never> => {
  return service.get(`/notice/selectNoticeContentOne/${id}`)
}


// SaveNoticeBaseAPI 修改公告核心内容
export const EditNoticeContentAPi = (
  data: NoticeContentEditVO
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/notice/editNoticeContent`, data)
}

// deleteNoticeIdAPI 删除期刊
export const deleteNoticeIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/notice/delete/${id}`)
}
