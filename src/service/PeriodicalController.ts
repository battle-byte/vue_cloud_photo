//活动上传接口
import type { ApiResponse } from '@/request/ApiResponse'
import service from '@/request/request'
import type { PageResult } from '@/types/Pages'
import type { addPeriodical, periodical, searchPeriodical, updatePeriodical } from '@/types/Periodical'

//添加活动
export const submitPeriodical = (data: addPeriodical): Promise<ApiResponse<number>> => {
  console.log(data)
  return service.post('/admin/periodical/submitPeriodical', data)
}


//查询期刊列表
export const selectPeriodicalListAPI = (data: searchPeriodical): Promise<ApiResponse<PageResult<periodical>>> => {
  return service.post('/admin/periodical/getListPeriodical', data)
}

//查询单挑活动数据
export const getPeriodicalOneAPI = (id: string): Promise<ApiResponse<periodical>> => {
  return service.get(`/admin/periodical/getPeriodicalOne/${id}`)
}

//管理员重新编辑活动
export const handleEditPeriodicalAPI = (data: updatePeriodical): Promise<ApiResponse<number>> => {
  return service.post('/admin/periodical/handleEditPeriodical', data)
}
