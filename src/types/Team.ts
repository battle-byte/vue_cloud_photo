export type Team = {
  // 团队表
  id?: string
  tid?: string
  tName?: string // 名称
  tPhoto?: string // 照片
  comment?: string // 简介
  email?: string // 邮箱
}

// TeamQueryVO 分页搜索查询团队结果集
export type TeamQueryVO = {
  tid?: string
  tName?: string // 名称
  tPhoto?: string // 照片
  comment?: string // 简介
  email?: string // 邮箱
}

// TeamQueryByPageParam 分页搜索查询团队
export type TeamQueryByPageParam = {
  tid?: string
  tName?: string // 名称
  page?: number
  pageSize?: number
}

// TeamSaveParam 修改团队内容
export type TeamEditParam = {
  tid?: string
  tName?: string // 名称
  tPhoto?: string // 照片
  comment?: string // 简介
  email?: string // 邮箱
}

// TeamSaveParam 修改团队内容
export type TeamSaveParam = {
  tid?: string
  tName?: string // 名称
  tPhoto?: string // 照片
  comment?: string // 简介
  email?: string // 邮箱
}

// TeamDeleteParam 删除团队
export type TeamDeleteParam = {
  tid?: string
  tName?: string // 名称
}