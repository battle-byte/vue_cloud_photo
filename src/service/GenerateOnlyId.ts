//用户注册接口
import type { ApiResponse } from '@/request/ApiResponse'
import service from '@/request/request'

export const GenerateOnlyIdAPI = (): Promise<ApiResponse<string>> => {
  return service.get('/GenerateOnlyId')
}
