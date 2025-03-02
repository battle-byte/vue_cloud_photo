export type Article = {
  // 文章表
  id?: string
  pid?: string
  title?: string // 标题
  intro?: string // 简介
  content?: string // 内容
  author?: string // 作者
  periodical?: string // 高校id
  doi?: string // 文章发表路径
  publishTime?: string // 发布时间
  postAvatar?: string // 头像
  views?: number // 阅读量
  upload?: number // 下载量
  kuote?: number // 引用量
  model?: string // 高校名称
  status?: number // 状态 类型
  isPublish?: number //文章状态  0 发布 1不发布
  perfect?: number //精选文章  0不是 1是
  isDelete?: number //是否删除 0不删 1删
  pdf?: string
  word?: string
  mainIntro?: string // 摘要概括
  volume?: number // 第几期
  buyaddr?: number // 购买跳转地址
  logoaddr?: number // logo跳转地址
  archivist?: number // 是否归档 0不归档 1归档
}

// 修改文章泛型
export type UpdateArticle = {
  // 文章表
  pid?: string
  title?: string // 标题
  intro?: string // 简介
  author?: string // 作者
  doi?: string // 文章发表路径
  publishTime?: string // 发布时间
  postAvatar?: string // 头像
  views?: number // 阅读量
  upload?: number // 下载量
  kuote?: number // 引用量
  model?: string // 高校名称
  status?: string // 状态 类型
  mainIntro?: string // 摘要概括
  volume?: number // 第几期
  buyaddr?: number // 购买跳转地址
  logoaddr?: number // logo跳转地址
  archivist?: number // 是否归档 0不归档 1归档
}

// 设置文章基础泛型
export type ArticleQueryAndPeriodicalVO = {
  id?: string // 文章表
  pid?: string
  title?: string // 标题
  intro?: string // 简介
  content?: string // 内容
  author?: string // 作者
  periodical?: string // 所属高校id
  periodicalName?: string // 所属高校名称
  doi?: string // 文章发表路径
  publishTime?: string // 发布时间
  postAvatar?: string // 头像
  views?: number // 阅读量
  upload?: number // 下载量
  kuote?: number // 引用量
  model?: string // 高校名称
  status?: number // 状态 类型
  isPublish?: number //文章状态  0 发布 1不发布
  perfect?: number //精选文章  0不是 1是
  isDelete?: number //是否删除 0不删 1删
  pdf?: string
  word?: string
  mainIntro?: string // 摘要概括
  volume?: number // 第几期
  buyaddr?: number // 购买跳转地址
  logoaddr?: number // logo跳转地址
  archivist?: number // 是否归档 0不归档 1归档
}
// 搜索文章
export type ArticleQueryByPageParam = {
  pid?: string
  title?: string // 标题
  author?: string // 作者
  isPublish?: string //文章状态  0 发布 1不发布
  periodical?: string // 所属高校id
  page?: number
  pageSize?: number
}

// 修改文章发布状态泛型
export type ArticlePublish = {
  pid?: string
  isPublish?: number //文章状态  0 发布 1不发布
}

// 修改文章发布状态泛型
export type ArticleArchivist = {
  pid?: string
  archivist?: number //文章状态  0 发布 1不发布
}

// 修改文章精品泛型
export type ArticlePerfect = {
  pid?: string
  perfect?: number //精选文章  0不是 1是
}

// 设置文章基础泛型 单独查询一条文章泛型
export type ArticleQueryVO = {
  pid?: string
  title?: string // 标题
  intro?: string // 简介
  author?: string // 作者
  doi?: string // 文章发表路径
  publishTime?: string // 发布时间
  postAvatar?: string // 头像
  views?: number // 阅读量
  upload?: number // 下载量
  kuote?: number // 引用量
  model?: string // 高校名称
  status?: string // 状态 类型
  pdf?: string
  word?: string
  mainIntro?: string // 摘要概括
  volume?: number // 第几期
  buyaddr?: number // 购买跳转地址
  logoaddr?: number // logo跳转地址
  archivist?: number // 是否归档 0不归档 1归档
}

// 修改文章基础内容泛型
export type ArticleBaseEditParam = {
  pid?: string
  title?: string // 标题
  intro?: string // 简介
  author?: string // 作者
  doi?: string // 文章发表路径
  publishTime?: string // 发布时间
  postAvatar?: string // 头像
  views?: number // 阅读量
  upload?: number // 下载量
  kuote?: number // 引用量
  model?: string // 高校名称
  status?: string // 状态 类型
  mainIntro?: string // 摘要概括
  volume?: number // 第几期
  buyaddr?: number // 购买跳转地址
  logoaddr?: number // logo跳转地址
  archivist?: number // 是否归档 0不归档 1归档
}
// 查询文章内容泛型
export type ArticleContentEditVO = {
  pid?: string
  content?: string // 内容
  title?: string // 内容
}

// 修改文章内容泛型
export type ArticleContentEditParam = {
  pid?: string
  content?: string // 内容
}

// 删除文章泛型
export type ArticleContentDeleteParam = {
  pid?: string
  title?: string // 标题
}
// 上传文章pdf 或者word版本
export type ArticleWord = {
  pid?: string
  word?: string
}

// 上传文章pdf 或者word版本
export type ArticlePdf = {
  pid?: string
  pdf?: string
}
