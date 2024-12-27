export type News = {
  // 新闻表
  id?: string
  nid?: string // 新闻id
  title?: string // 标题
  content?: string // 内容
  photo?: string // 新闻照片
  comment?: string // 简介
  views?: number // 浏览量
  nTime?: string // 新闻时间
}

// 单独搜索一条新闻数据 和 分页查询
export type NewsQueryVO = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  photo?: string // 新闻照片
  comment?: string // 简介
  views?: number // 浏览量
  nTime?: string // 新闻时间
}

// NewsQueryByPageParam 分页搜索新闻文章
export type NewsQueryByPageParam = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  page?: number //
  pageSize?: number //
}

// NewsBaseSaveParam 创建新闻基础配置
export type NewsBaseSaveParam = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  photo?: string // 新闻照片
  comment?: string // 简介
  views?: number // 浏览量
  nTime?: string // 新闻时间
}

// NewsBaseEditParam 修改新闻基础配置
export type NewsBaseEditParam = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  photo?: string // 新闻照片
  comment?: string // 简介
  views?: number // 浏览量
  nTime?: string // 新闻时间
}

// NewsContentEditParam 修改新闻核心内容回显
export type NewsContentEditParam = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  content?: string // 内容
}
// NewsContentEditParam 修改新闻核心内容
export type NewsContentEditDTO = {
  // 新闻表
  nid?: string // 新闻id
  title?: string // 标题
  content?: NullString // 内容
}


export type NullString = {
  String: string
  Valid: boolean // Valid is true if String is not NULL
}

// NewsContentEditParam 修改新闻核心内容
export type NewsContentEditVO = {
  // 新闻表
  nid?: string // 新闻id
  content?: string // 内容
}

// 删除新闻展示泛型
export type NewsDeleteShow = {
  nid?: string // 新闻id
  title?: string // 标题
}
