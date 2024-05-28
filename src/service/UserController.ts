import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { AddUserCount, SearchUser, UserList } from '@/types/user'
import type { PageResult } from '@/types/Pages'
import type { UserVO } from '@/types/Admin'



//查询用户总数
export const selectUserCountAPI = (): Promise<ApiResponse<number>> => {
  return service.get('/admin/selectUserCount')
}

//查询本月新增用户数量
export const selectMonthUserCountAPI = (): Promise<ApiResponse<number>> => {
  return service.get('/admin/selectMonthUserCount')
}


//条形图 查润近6个月的新增用户数量
export const userAddCountAPI = (): Promise<ApiResponse<AddUserCount>> => {
  return service.get('/admin/userAddCount')
}


