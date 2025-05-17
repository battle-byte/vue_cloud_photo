import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { captcha } from '@/types/Captcha'


//获取图形验证码
export const getCaptchaAPI = ():Promise<ApiResponse<captcha>> => {
  return service.get('/v1/captcha')
}







