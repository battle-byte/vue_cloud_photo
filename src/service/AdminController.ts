import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  adminLogin,
  SearchUserParam,
  UserLoginVO,
  UserRegister,
  UserUpdatePassword,
  UserVO
} from '../types/Admin'

//管理员登录接口
export const AdminLoginAPI = (data: adminLogin): Promise<ApiResponse<UserLoginVO>> => {
  return service.post('/user/login', data)
}

// 管理员创建新账户
export const SignUpHandlerAPI = (data: UserRegister): Promise<ApiResponse<string>> => {
  return service.post('/user/signUpHandler', data)
}

//封禁用户
export const handleBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.get(`/user/userBan/${id}`)
}

//解禁用户
export const handleNotBanAPI = (id: string): Promise<ApiResponse<number>> => {
  return service.get(`/user/userNotBan/${id}`)
}

//模糊分页查询用户信息
export const getUserSearchAPI = (
  data: SearchUserParam
): Promise<ApiResponse<PageResult<UserVO>>> => {
  return service.post('/user/selectList', data)
}

//AdminCreateCode 管理员生成临时验证码
export const AdminCreateCodeAPI = (): Promise<ApiResponse<string>> => {
  return service.get('/user/adminCreateCode')
}

//AdminEditPassword 管理员修改密码
export const AdminEditPasswordAPI = (data: UserUpdatePassword): Promise<ApiResponse<string>> => {
  return service.post('/user/adminEditPassword', data)
}

// deleteArticleIdAPI 删除管理员
export const deleteAdminIdAPI = (id: string): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/user/delete/${id}`)
}
