import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { adminStore } from '@/stores/admin'
import { userStore } from '@/stores'
import router from '@/router'
//请求路径
const baseURL = 'http://localhost:8101/api'

//创建axios实例
const service = axios.create({
  // 设置基础地址和超时时间
  baseURL,
  //十秒
  timeout: 10000
})

//请求拦截器 添加请求头
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  const userMessage = userStore()
  //添加用户token
  config.headers.authentication = userMessage.user.token
  return config
})

//响应拦截
service.interceptors.response.use(
  (res) => {
    //处理通用响应结构，返回 data 部分
    // const apiResponse: ApiResponse<any> = res.data

    const code: number = res.data.code
    //响应码为失败
    if (code != 0) {
      ElMessage.error(res.data.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    //特殊错误情况
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error('登录认证已过期，请重新登录')
    return Promise.reject(err)
  }
)

// 返回实例
export default service
