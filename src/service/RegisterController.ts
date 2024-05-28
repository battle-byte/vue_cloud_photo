//用户注册接口
import type { ApiResponse } from '@/request/ApiResponse'
import type { adminMessage, userRegister } from '@/types/Admin'
import service from '@/request/request'

export const userRegisterAPI = (data: userRegister): Promise<ApiResponse<adminMessage>> => {
  return service.post('/user/register', data)
}
