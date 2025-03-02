export type Editorialandjournal = {
  // 高校中编辑人员成员
  id?: string // 高校中编辑人员成员表
  eid?: string // 编辑人员成员id
  jid?: string // 高校id
  rank?: number //  0无 1主编 2副主编 3成员
}

// EditorialAndJournalsQueryParam 分页获取高校对应的编辑信息
export type EditorialAndJournalsQueryParam = {
  // 高校中编辑人员成员
  eName?: string // 高校中编辑人员名称
  currentJid?: string // 当前高校
  eid?: string // 编辑人员成员id
  jid?: string // 高校id
  page?: number
  pageSize?: number
}

// EditorialAndJournalsQueryParam 分页获取高校对应的编辑信息
export type EditorialAndJournalsQueryVO = {
  eid?: string // 高校中编辑人员成员
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
  rank?: number //  0无 1主编 2副主编 3成员
}


// 添加编辑
export type EditorialQueryVOList = {
  eid?: string
  eName?: string // 名称
  ePhoto?: string // 照片
  comment?: string // 简介
  sections?: string // 评价
}
// 移除编辑
