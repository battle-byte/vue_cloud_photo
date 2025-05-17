import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { ListRolesRequest, ListRolesResponse, RoleData } from '@/types/roles'
import type { PageResult } from '@/types/Pages'
import type { ApisData, ApisGroupsResponse, ListApisRequest } from '@/types/apis'



//刷新接口
export const RefreshApisAPI = (): Promise<ApiResponse<string>> => {
  return service.get('/v1/api')
}

export const ListApisAPI = (data:ListApisRequest): Promise<ApiResponse<PageResult<ApisData>>> => {
  return service.post(`/v1/apis`,data)
}
export const ApisGroupsAPI = (): Promise<ApiResponse<ApisGroupsResponse>> => {
  return service.get(`/v1/apis/group`)
}