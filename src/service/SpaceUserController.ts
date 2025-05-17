import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  SpaceUserCreateRequest, SpaceUserDeleteUserRequest,
  SpaceUserEditRequest, SpaceUserListRequest, SpaceUserListResponse, SpaceUserQueryRequest,
  SpaceUserQueryResponse,
  SpaceUserRoleResponse
} from '@/types/space_user'


export const SpaceUserCreateAPI = (data: SpaceUserCreateRequest): Promise<ApiResponse<string>> => {
  return service.post('/v1/space-users', data)
}

export const SpaceUserEditAPI = (data: SpaceUserEditRequest,): Promise<ApiResponse<string>> => {
  return service.post('/v1/space-users/edit', data)
}

export const SpaceUserQueryAPI = (data: SpaceUserQueryRequest): Promise<ApiResponse<SpaceUserQueryResponse>> => {
  return service.put(`/v1/space-users`, data)
}

export const SpaceDeleteAPI = (pid: string): Promise<ApiResponse<string>> => {
  return service.delete(`/v1/space-users/${pid}`)
}

export const SpaceUserDeleteUserAPI = (data: SpaceUserDeleteUserRequest): Promise<ApiResponse<string>> => {
  return service.put(`/v1/space-users/remove`,data)
}

export const SpaceUserDelete = (id: string,role:string): Promise<ApiResponse<string>> => {
  return service.delete(`/v1/space-users/${id}`,{
    headers: {
      'X-Domain': role
    }
  })
}
export const SpaceUserRoleAPI = (space_id:string): Promise<ApiResponse<SpaceUserRoleResponse>> => {
  return service.get(`/v1/space-users/${space_id}`)
}
export const SpaceUserListAPI = (data:SpaceUserListRequest): Promise<ApiResponse<SpaceUserListResponse>> => {
  return service.post(`/v1/space-users/list`,data)
}

