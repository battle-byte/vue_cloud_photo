import type { ApiBase, ApisData } from '@/types/apis'

export type ListRolesRequest = {
  page:number
  size:number
  status:number
  roleName:string
  roleKey:string
}

export type ListRolesResponse = {
  total:number
  roles:RoleData[]
}

export type RoleData = {
  rid:string
  roleName:string
  status:number
  roleKey:string
  createBy:string
  updateBy:string
  remark:string
  updateAt:string
  createAt:string
  parentId:string
}

export type RoleDeleteShow = {
  rid?: string
  roleName?: string
}
export type GetRolesResponse = {
role: RoleData
}


export type GetRoleApisRequest = {
  roleKey?: string
}
export type GetRoleApisResponse = {
  records: CasbinData[]
}
export type CasbinData = {
  id: string
  ptype: string
  v0: string
  v1: string
  v2: string
}
export type RoleApisDeleteRequest = {
  roleKey?: string
  ids?: number[]
}
export type RoleApisSaveRequest = {
  roleKey?: string
  ids?: number[]
}

export type CreateRolesRequest = {
  roleName:string
  roleKey:string
  status:number
  remark:string
  rid:string
  parentId:string
  apiIds:ApiBase[]
}

export type UpdateRolesRequest = {
  roleName:string
  roleKey:string
  remark:string
  rid:string
  status:number
  parentId:string
}