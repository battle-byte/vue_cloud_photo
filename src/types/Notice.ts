export type Notice = {
  // 公告表
  id?: string
  nid?: string // 公告id
  comment?: string // 文本内容
  name?: string // 公告名称
  kind?: number
}

// NoticeQueryByPageVO 分页搜索查询公告展示表
export type NoticeQueryByPageVO = {
  // 公告表
  nid?: string // 公告id
  name?: string // 公告名称
  kind?: number // 公告位置
}

// NoticeQueryByPageParam 分页搜索查询公告
export type NoticeQueryByPageParam = {
  // 公告表
  nid?: string // 公告id
  name?: string // 公告名称
  page?: number //
  pageSize?: number //
}

// NoticeContentEditVO 修改公告内容 以及回显
export type NoticeContentEditVO = {
  // 公告表
  nid?: string // 公告id
  comment?: string // 文本内容
  name?: string // 公告名称
}

// NoticeContentSaveVODTO 创建新的公告
export type NoticeContentSaveVODTO = {
  // 公告表
  nid?: string // 公告id
  comment?: string // 文本内容
  name?: string // 公告名称
}

// 删除公告展示泛型
export type NoticeDeleteShow = {
  nid?: string // 公告id
  name?: string // 公告名称
}

// NoticeKindSaveVODTO 修改公告位置
export type NoticeKindSaveVODTO = {
  nid?: string // 公告id
  kind?: number // 公告位置
}
