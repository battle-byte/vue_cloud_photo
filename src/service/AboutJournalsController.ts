import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { AboutJournalsEditParam, AboutJournalsParam, AboutJournalsVO } from '@/types/Aboutjournals'

// 查询
export const SelectAboutJournalsAPI = (
  data: AboutJournalsParam
): Promise<ApiResponse<AboutJournalsVO>> | Promise<never> => {
  return service.post(`/aboutJournals/selectAboutJournals`, data)
}

// 修改
export const EditAboutJournalsAPI = (
  data: AboutJournalsEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/aboutJournals/editAboutJournals`, data)
}
