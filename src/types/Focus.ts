export type Focus = {
  // 关于高校
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// FocusParam 高校介绍类回查询
export type FocusParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// FocusVO 高校介绍类回显
export type FocusVO = {
  aid?: string
  name?: string
}

// FocusContent 高校介绍类内容回显
export type FocusContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// FocusContent 高校介绍类内容保存
export type FocusContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// FocusContent 高校介绍类删除回显
export type FocusDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveFocus 保存或查询 高校介绍类
export type SelectOrInSaveFocus = {
  aid?: string
  jid?: string
}
