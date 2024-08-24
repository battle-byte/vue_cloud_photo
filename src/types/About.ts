export type About = {
  // 关于期刊
  id?: string
  isDelete?: number
  aid?: string
  jid?: string
  name?: string
  content?: string
}

// AboutParam 期刊介绍类回查询
export type AboutParam = {
  aid?: string
  jid?: string
  name?: string
  page?: number
  pageSize?: number
}

// AboutVO 期刊介绍类回显
export type AboutVO = {
  aid?: string
  name?: string
}

// AboutContent 期刊介绍类内容回显
export type AboutContent = {
  aid?: string
  journalsName?: string
  name?: string
  content?: string
}

// AboutContent 期刊介绍类内容保存
export type AboutContentEdit = {
  aid?: string
  name?: string
  content?: string
}

// AboutContent 期刊介绍类删除回显
export type AboutDelete = {
  aid?: string
  name?: string
}

// SelectOrInSaveAbout 保存或查询 期刊介绍类
export type SelectOrInSaveAbout = {
  aid?: string
  jid?: string
}
