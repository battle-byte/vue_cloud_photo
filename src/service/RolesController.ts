import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type {
  CreateRolesRequest,
  GetRoleApisRequest,
  GetRoleApisResponse,
  GetRolesResponse,
  ListRolesRequest,
  ListRolesResponse, RoleApisDeleteRequest, RoleApisSaveRequest,
  RoleData, UpdateRolesRequest
} from '@/types/roles'
import type { PageResult } from '@/types/Pages'



//获取角色列表
export const ListRolesAPI = (data: ListRolesRequest): Promise<ApiResponse<PageResult<RoleData>>> => {
  return service.post('/v1/roles', data)
}

export const DeleteRolesAPI = (id:string): Promise<ApiResponse<string>> => {
  return service.delete(`/v1/role/${id}`)
}

export const GetRolesAPI = (id:string): Promise<ApiResponse<GetRolesResponse>> => {
  return service.get(`/v1/role/${id}`)
}

export const GetRoleApisAPI = (data:GetRoleApisRequest): Promise<ApiResponse<GetRoleApisResponse>> => {
  return service.post(`/v1/role/api`,data)
}

export const RoleApisDeleteAPI = (data:RoleApisDeleteRequest): Promise<ApiResponse<string>> => {
  return service.post(`/v1/role/api/d`,data)
}

export const RoleApisSaveAPI = (data:RoleApisSaveRequest): Promise<ApiResponse<string>> => {
  return service.post(`/v1/role/api/u`,data)
}

export const CreateRolesAPI = (data:CreateRolesRequest): Promise<ApiResponse<string>> => {
  return service.post(`/v1/role`,data)
}
export const UpdateRolesAPI = (data:UpdateRolesRequest): Promise<ApiResponse<string>> => {
  return service.put(`/v1/role`,data)
}