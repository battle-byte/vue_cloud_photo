export type Editorial = {
  // 编委会信息
  id?: string
  eid?: string // 编委会id
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}

// EditorialQueryVO 分页搜索查询团队结果集
export type EditorialQueryVO = {
  eid?: string
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}

// EditorialQueryByPageParam 分页搜索查询团队
export type EditorialQueryByPageParam = {
  eid?: string
  eName?: string // 名称
  page?: number
  pageSize?: number
}

// EditorialSaveParam 修改团队内容
export type EditorialEditParam = {
  eid?: string
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}

// EditorialSaveParam 修改团队内容
export type EditorialSaveParam = {
  eid?: string
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}

// EditorialDeleteParam 删除团队
export type EditorialDeleteParam = {
  eid?: string
  eName?: string // 名称
}

// EditorialQueryVO 分页搜索查询团队结果集
export type EditorialQueryVOList = {
  eid?: string
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}

