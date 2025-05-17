import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { userStore } from '@/stores'
import router from '@/router'
import type { ApiResErrorResponse } from '@/request/ApiResponse'
//请求路径
const baseURL = 'http://127.0.0.1:8101' // 本地测试使用
// const baseURL = 'https://compusos.cn/v1' //上线使用

//创建axios实例
const service = axios.create({
  // 设置基础地址和超时时间d
  baseURL,
  //十秒
  timeout: 20000,
  // withCredentials:true
})

//请求拦截器 添加请求头
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  const userMessage = userStore()
  //添加用户token
  config.headers.Authorization = "Bearer "+userMessage.user?.token
  return config
})

//响应拦截
service.interceptors.response.use(
  (res) => {
    //处理通用响应结构，返回 data 部分
    // const apiResponse: ApiResponse<any> = res.data
    const code: number = res.data.code
    //响应码为失败
    if (code !== 0) {
      ElMessage.error(res.data.message)
      return res.data
    }
    return res.data
  },
  (err: AxiosError) => {
    //特殊错误情况 登陆验证过期重新登陆
    if (err.response?.status === 401) {
      // router.push('/login')
    }
    const {code,message} = err.response?.data as ApiResErrorResponse

    if (message==="Unauthorized Access"){
      ElMessage.error("无权限")
    }else {
      ElMessage.error(message||"请求失败")
    }
    if (message.includes('JWT')||message.includes("Token")||message.includes("token")) {
      // jwt 出现问题 重新登录
      router.push('/login')
    }
    return err
  }
)

// 返回实例
export default service
