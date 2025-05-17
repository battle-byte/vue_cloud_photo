import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  ChangeStatusRequest,
  CreateSysUserRequest,
  ListSysUserRequest,
  ListSysUserResponse,
  SysUserFindByIdResponse,
  SysUserListVO,
  SysUserLoginRequest,
  SysUserLoginResponse,
  SysUserRegisterRequest, SysUserUpdatePasswordByAdminRequest,
  SysUserUpdatePasswordRequest,
  SysUserUpdateRequest
} from '@/types/Users'
import type { RoleData } from '@/types/roles'


//管理员创建新用户
export const CreateUsersAPI = (data: CreateSysUserRequest): Promise<ApiResponse<string>> => {
  return service.post('/v1/user', data)
}
/*{
    headers: {
      'X-Domain': role
    }
  }*/
//ListSysUserAPI模糊分页查询用户信息
export const ListSysUserAPI = (
  data: ListSysUserRequest
): Promise<ApiResponse<PageResult<RoleData>>> => {
  return service.post('/v1/users', data)
}


//ChangeStatusAPI 更新用户状态
export const ChangeStatusAPI = (data: ChangeStatusRequest): Promise<ApiResponse<number>> => {
  return service.put(`/v1/user/status`,data)
}

// SysUserDeleteAPI 删除普通用户
export const SysUserDeleteAPI = (uid: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.delete(`/v1/user/${uid}`)
}

//SysUserUpdatePasswordAPi 用户修改密码
export const SysUserUpdatePasswordByAdminAPi = (data: SysUserUpdatePasswordRequest): Promise<ApiResponse<string>> => {
  return service.put('/v1/user', data)
}


//SysUserUpdatePasswordAPi 管理员修改密码
export const SysUserUpdatePasswordAPi = (data: SysUserUpdatePasswordByAdminRequest): Promise<ApiResponse<string>> => {
  return service.put('/v1/user/u', data)
}


// SysUserRegisterAPi 用户注册
export const SysUserRegisterAPi = (
  data: SysUserRegisterRequest
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/v1/user/register`, data)
}

// SysUserFindByIdAPI 根据ID获取用户信息
export const SysUserFindByIdAPI = (uid: string): Promise<ApiResponse<SysUserFindByIdResponse>> | Promise<never> => {
  return service.get(`/v1/user/${uid}`)
}

// SysUserLoginAPi 用户注册
export const SysUserLoginAPi = (
  data: SysUserLoginRequest
): Promise<ApiResponse<SysUserLoginResponse>> | Promise<never> => {
  return service.post(`/v1/user/login`, data)
}
// SysUserUpdateAPI 修改用户信息
export const SysUserUpdateAPI = (
  data: SysUserUpdateRequest
): Promise<ApiResponse<number>> | Promise<never> => {
  return service.post(`/v1/user/save`, data)
}