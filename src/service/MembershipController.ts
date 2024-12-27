import service from '@/request/request'
import type { ApiResponse } from '@/request/ApiResponse'
import type { PageResult } from '@/types/Pages'
import type {
  Membership,
  MembershipBaseEditParam, MembershipBaseSaveParam,
  MembershipQueryByPageParam,
  MembershipQueryVO
} from '@/types/Membership'

// 分页查询合作伙伴列表
export const SelectMembershipByPageAPI = (
  data: MembershipQueryByPageParam
): Promise<ApiResponse<PageResult<MembershipQueryVO>>> | Promise<never> => {
  return service.post(`/membership/selectMemberShipList`, data)
}

// 根据id搜索合作伙伴内容 SelectMembershipByIdAPI
export const selectMembershipOneAPI = (
  id: string
): Promise<ApiResponse<MembershipQueryVO>> | Promise<never> => {
  return service.get(`/membership/selectMembershipOne/${id}`)
}

// 修改合作伙伴内容 EditMembershipBase
export const EditMembershipBaseAPI = (
  data: MembershipBaseEditParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/membership/EditMemberShipBase`, data)
}

// SaveMembershipBaseAPI 创建合作伙伴
export const SaveMembershipBaseAPI = (
  data: MembershipBaseSaveParam
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.post(`/membership/CreateMembership`, data)
}

// EditMemberShipBase 删除合作伙伴
export const deleteMembershipIdAPI = (
  id: string
): Promise<ApiResponse<string>> | Promise<never> => {
  return service.get(`/membership/delete/${id}`)
}
