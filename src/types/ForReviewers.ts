export type ForReviewers = {
  // 关于高校
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// ForReviewersParam 高校介绍类回查询
export type ForReviewersParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// ForReviewersVO 高校介绍类回显
export type ForReviewersVO = {
  aid?: string
  name?: string
}

// ForReviewersContent 高校介绍类内容回显
export type ForReviewersContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// ForReviewersContent 高校介绍类内容保存
export type ForReviewersContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// ForReviewersContent 高校介绍类删除回显
export type ForReviewersDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveForReviewers 保存或查询 高校介绍类
export type SelectOrInSaveForReviewers = {
  aid?: string
  jid?: string
}
