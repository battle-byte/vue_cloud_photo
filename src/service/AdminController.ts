import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type { AddAdmin, SearchUser, updateUser, User, UserList } from '@/types/user'
import type { adminLogin, adminMessage, UserListVO } from '../types/Admin'




//管理员登录接口
export const adminLoginAPI = (data: adminLogin): Promise<ApiResponse<adminMessage>> => {
  return service.post('/admin/login', data)
}


//编辑用户
export const handleEditAPI = (data: updateUser): Promise<ApiResponse<number>> => {
  return service.post('/admin/handleEdit', data)
}

//封禁用户
export const handleBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.post(`/admin/handleBan/${id}`)
}

//解禁用户
export const handleNotBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.post(`/admin/handleNotBan/${id}`)
}

//模糊查询用户信息
export const getUserMessageSearchAPI = (data: SearchUser): Promise<ApiResponse<PageResult<UserListVO>>> => {
  return service.post('/admin/getListUserMessageSearch', data)
}


//模糊查询管理员信息
export const getAdminMessageSearchAPI = (data: SearchUser): Promise<ApiResponse<PageResult<UserList>>> => {
  return service.post('/admin/getAdminMessageSearch', data)
}

//封禁管理员
export const handleAdminBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.post(`/admin/handleAdminBan/${id}`)
}

//解禁管理员
export const handleAdminNotBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.post(`/admin/handleAdminNotBan/${id}`)
}

//添加新的普通管理员
export const handleAddAdminAPI = (data: AddAdmin): Promise<ApiResponse<number>> => {
  return service.post('/admin/handleAddAdmin', data)
}

