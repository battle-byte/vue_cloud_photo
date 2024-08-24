export type SpecialIssue = {
  // 关于期刊
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// SpecialIssueParam 期刊介绍类回查询
export type SpecialIssueParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// SpecialIssueVO 期刊介绍类回显
export type SpecialIssueVO = {
  aid?: string
  name?: string
}

// SpecialIssueContent 期刊介绍类内容回显
export type SpecialIssueContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// SpecialIssueContent 期刊介绍类内容保存
export type SpecialIssueContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// SpecialIssueContent 期刊介绍类删除回显
export type SpecialIssueDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveSpecialIssue 保存或查询 期刊介绍类
export type SelectOrInSaveSpecialIssue = {
  aid?: string
  jid?: string
}
