export type Editorialandjournal = {
  // 期刊中编委会成员
  id?: string // 期刊中编委会成员表
  eid?: string // 编委会成员id
  jid?: string // 期刊id
  rank?: number //  0无 1主编 2副主编 3成员
}

// EditorialAndJournalsQueryParam 分页获取期刊对应的编辑信息
export type EditorialAndJournalsQueryParam = {
  // 期刊中编委会成员
  eName?: string // 期刊中编委会名称
  currentJid?: string // 当前期刊
  eid?: string // 编委会成员id
  jid?: string // 期刊id
  page?: number
  pageSize?: number
}

// EditorialAndJournalsQueryParam 分页获取期刊对应的编辑信息
export type EditorialAndJournalsQueryVO = {
  eid?: string // 期刊中编委会成员
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
