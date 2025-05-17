export type ListApisRequest ={
  apiGroup:string
  page:number
  size:number
}

export type ListApisResponse ={
  records:ApisData
  total:number
}
export type ApisGroupsResponse ={
  apiGroups:string[]
}
export type ApisData ={
  id:string
  path:string
  description:string
  apiGroup:string
  method:string
  createdAt:string
  updatedAt:string
}
export type ApiBase ={
  path:string
  method:string
}
