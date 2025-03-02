export type About = {
  // 关于高校
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// AboutParam 高校介绍类回查询
export type AboutParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// AboutVO 高校介绍类回显
export type AboutVO = {
  aid?: string
  name?: string
}

// AboutContent 高校介绍类内容回显
export type AboutContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// AboutContent 高校介绍类内容保存
export type AboutContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// AboutContent 高校介绍类删除回显
export type AboutDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveAbout 保存或查询 高校介绍类
export type SelectOrInSaveAbout = {
  aid?: string
  jid?: string
}
