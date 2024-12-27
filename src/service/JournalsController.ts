import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  Journals,
  JournalsAddArticleParam,
  JournalsAddEditorialParam,
  JournalsEditParam,
  JournalsPublishParam,
  JournalsQueryByPageParam,
  JournalsQueryVO,
  JournalsRemoveEditorialParam,
  JournalsSaveParam, JournalsTypeParam
} from '@/types/Journals'
import type {
  EditorialAndJournalsQueryParam,
  EditorialAndJournalsQueryVO
} from '@/types/Editorialandjournal'

// 分页查询期刊列表
export const SelectJournalsByPageAPI = (
  data: JournalsQueryByPageParam
): Promise<ApiResponse<PageResult<JournalsQueryVO>>> | Promise<never> => {
  return service.post(`/journals/selectList`, data)
}

// 发布期刊 SetJournalsPublishAPI
export const SetJournalsPublishAPI = (
  data: JournalsPublishParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/publish`, data)
}

// 下架期刊 SetJournalsNotPublishAPI
export const SetJournalsNotPublishAPI = (
  data: JournalsPublishParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/cancelPublish`, data)
}

// 下架期刊 SetJournalsNotPublishAPI
export const SetJournalsTypeJournalAPI = (
  data: JournalsTypeParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/setJournal`, data)
}

// 下架期刊 SetJournalsNotPublishAPI
export const SetJournalsTypeBookAPI = (
  data: JournalsTypeParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/setBook`, data)
}

// SelectJournalsByIdAPI 根据id期刊基本内容
export const SelectJournalsByIdAPI = (
  id: string
): Promise<ApiResponse<JournalsQueryVO>> | Promise<never> => {
  return service.get(`/journals/selectJournalsOne/${id}`)
}

// EditJournals 修改期刊基本内容
export const EditJournalsAPI = (
  data: JournalsEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/editJournals`, data)
}

// SaveArticleBaseAPI 添加期刊基本内容
export const SaveJournalsAPI = (
  data: JournalsSaveParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/saveJournals`, data)
}

// deleteJournalsIdAPI 删除期刊
export const deleteJournalsIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/journals/delete/${id}`)
}

// journalsAddArticle 期刊添加文章
export const JournalsAddArticleAPI = (
  data: JournalsAddArticleParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/journalsAddArticle`, data)
}

//  journalsRemoveArticleAPI 移除期刊文章
export const JournalsRemoveArticleAPI = (
  data: JournalsAddArticleParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/journalsRemoveArticle`, data)
}

//  SelectJournalsAndEditorialByPageAPI 分页查询期刊和主编之间的信息
export const SelectJournalsAndEditorialByPageAPI = (
  data: EditorialAndJournalsQueryParam
): Promise<ApiResponse<PageResult<EditorialAndJournalsQueryVO>>> | Promise<never> => {
  return service.post(`/journals/selectJournalsAndEditorialByPage`, data)
}

//  JournalsAddEditorialAPI 添加编委
export const JournalsAddEditorialAPI = (
  data: JournalsAddEditorialParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/journalsAddEditorial`, data)
}

//  JournalsRemoveEditorialAPI 删除编委
export const JournalsRemoveEditorialAPI = (
  data: JournalsRemoveEditorialParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/journals/journalsRemoveEditorial`, data)
}
