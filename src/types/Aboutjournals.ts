export type Aboutjournals = {
  // 关于期刊和作者须知
  id?: string
  jid?: string // 期刊id
  status?: number // 0关于期刊 1作者须知
  content?: string // 关于期刊的信息
  updateTime?: string // 修改时间
  createTime?: string // 创建时间
}

// AboutJournalsParam 关于期刊和作者查询
export type AboutJournalsParam = {
  // 关于期刊和作者须知
  jid?: string // 期刊id
  status?: number // 0关于期刊 1作者须知
}

// AboutJournalsVO 关于期刊和作者须知数据库搜索回显与修改
export type AboutJournalsVO = {
  // 关于期刊和作者须知
  jid?: string // 期刊id
  status?: number // 0关于期刊 1作者须知
  content?: string // 关于期刊的信息
  journalsName?: string // 期刊标题
}

// AboutJournalsEditParam 关于期刊回显
export type AboutJournalsEditParam = {
  // 关于期刊和作者须知
  jid?: string // 期刊id
  status?: number // 0关于期刊 1作者须知
  content?: string // 关于期刊的信息
}
