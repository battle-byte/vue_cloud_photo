//用户注册接口
import type { ApiResponse } from '@/request/ApiResponse'
import service from '@/request/request'
type CreateIdResponse = {
  id:string
}

export const GenerateOnlyIdAPI = (): Promise<ApiResponse<CreateIdResponse>> => {
  return service.get('/v1/id')
}
