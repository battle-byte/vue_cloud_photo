import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  ScoringResultAddDTO,
  ScoringResultEditDTO,
  ScoringResultQueryDTO,
  ScoringResultUpdateDTO,
  ScoringResultVO
} from '@/types/ScoringResult'
import type { DeleteDTO } from '@/types/Delete'
import type { PageResult } from '@/types/Pages'

/**
 * 创建评分结果
 * @param data
 */
export const addScoringResultAPI = (data: ScoringResultAddDTO): Promise<ApiResponse<String>> => {
  return service.post('/scoringResult/add', data)
}

/**
 * 删除评分结果
 * @param data
 */
export const deleteScoringResultAPI = (data: DeleteDTO): Promise<ApiResponse<boolean>> => {
  return service.post('/scoringResult/delete', data)
}

/**
 * 更新评分结果（仅管理员可用）
 * @param data
 */
export const updateScoringResultAPI = (
  data: ScoringResultUpdateDTO
): Promise<ApiResponse<boolean>> => {
  return service.post('/scoringResult/update', data)
}

/**
 * 根据 id 获取评分结果（封装类）
 * @param id
 */
export const getScoringResultVOByIdAPI = (id: string): Promise<ApiResponse<ScoringResultVO>> => {
  return service.get(`/scoringResult/get/vo/${id}`)
}

/**
 * 分页获取评分结果列表（仅管理员可用）
 * @param data
 */
export const listScoringResultByPageAPI = (
  data: ScoringResultQueryDTO
): Promise<ApiResponse<PageResult<ScoringResultVO>>> => {
  return service.post(`/scoringResult/list/page`, data)
}

/**
 * 分页获取评分结果列表（封装类）
 * @param data
 */
export const listScoringResultVOByPageAPI = (
  data: ScoringResultQueryDTO
): Promise<ApiResponse<PageResult<ScoringResultVO>>> => {
  return service.post(`/scoringResult/list/page/vo`, data)
}

/**
 * 分页获取当前登录用户创建的评分结果列表
 * @param data
 */
export const listMyScoringResultVOByPageAPI = (
  data: ScoringResultQueryDTO
): Promise<ApiResponse<PageResult<ScoringResultVO>>> => {
  return service.post(`/scoringResult/my/list/page/vo`, data)
}

/**
 * 编辑评分结果（给用户使用）
 * @param data
 */
export const editScoringResultAPI = (data: ScoringResultEditDTO): Promise<ApiResponse<boolean>> => {
  return service.post(`/scoringResult/edit`, data)
}
