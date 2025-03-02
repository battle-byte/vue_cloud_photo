export type ForAuthors = {
  // 关于高校
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// ForAuthorsParam 高校介绍类回查询
export type ForAuthorsParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// ForAuthorsVO 高校介绍类回显
export type ForAuthorsVO = {
  aid?: string
  name?: string
}

// ForAuthorsContent 高校介绍类内容回显
export type ForAuthorsContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// ForAuthorsContent 高校介绍类内容保存
export type ForAuthorsContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// ForAuthorsContent 高校介绍类删除回显
export type ForAuthorsDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveForAuthors 保存或查询 高校介绍类
export type SelectOrInSaveForAuthors = {
  aid?: string
  jid?: string
}
