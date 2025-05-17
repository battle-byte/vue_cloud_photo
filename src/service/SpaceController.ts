import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  SpaceAndUserResponse,
  SpaceCreateRequest, SpaceEditRequest, SpaceLeverListResponse,
  SpaceListWithUserRequest,
  SpaceUpdateRequest, SpaceUserFindByIdResponse, SpaceUserFindByUserIdRequest, SpaceUserFindByUserIdResponse
} from '@/types/space'

export const SpaceCreateAPI = (data: SpaceCreateRequest): Promise<ApiResponse<string>> => {
  return service.post('/v1/space', data)
}

export const SpaceUpdateAPI = (
  data: SpaceUpdateRequest
): Promise<ApiResponse<string>> => {
  return service.put('/v1/space', data)
}

export const SpaceListWithUserAPI = (data: SpaceListWithUserRequest): Promise<ApiResponse<PageResult<SpaceAndUserResponse>>> => {
  return service.post(`/v1/spaces`,data)
}

export const SpaceDeleteAPI = (pid: string): Promise<ApiResponse<string>> => {
  return service.delete(`/v1/space/${pid}`)
}

export const SpaceUserFindByIdAPI = (id:string): Promise<ApiResponse<SpaceUserFindByIdResponse>> => {
  return service.get(`/v1/space/${id}`)
}
export const SpaceUserFindByUserIdAPI = (data:SpaceUserFindByUserIdRequest): Promise<ApiResponse<SpaceUserFindByUserIdResponse>> => {
  return service.post(`/v1/space/u`,data)
}
export const SpaceEditAPI = (data:SpaceEditRequest): Promise<ApiResponse<string>> => {
  return service.post(`/v1/space/edit`,data)
}

export const SpaceLeverListAPI = (): Promise<ApiResponse<SpaceLeverListResponse>> => {
  return service.get(`/v1/spaces`)
}