import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type { Team, TeamEditParam, TeamQueryByPageParam, TeamQueryVO, TeamSaveParam } from '@/types/Team'

// 分页查询文章列表
export const SelectTeamByPageAPI = (
  data: TeamQueryByPageParam
): Promise<ApiResponse<PageResult<TeamQueryVO>>> | Promise<never> => {
  return service.post(`/team/selectList`, data)
}

// 根据id搜索文章团队内容 SelectTeamByIdAPI
export const selectTeamOneAPI = (id: string): Promise<ApiResponse<TeamQueryVO>> | Promise<never> => {
  return service.get(`/team/selectTeamOne/${id}`)
}

// 修改文章团队内容 EditTeamBase
export const EditTeamBaseAPI = (
  data: TeamEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/team/editTeam`, data)
}


// SaveTeamBaseAPI 修改文章团队内容
export const SaveTeamBaseAPI = (
  data: TeamSaveParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/team/saveTeam`, data)
}

// deleteTeamIdAPI 删除高校
export const deleteTeamIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/team/delete/${id}`)
}
