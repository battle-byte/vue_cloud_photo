import type { ArticleQueryByPageParam } from '@/types/Article'
import type { Editorial } from '@/types/Editorial'

export type Journals = {
  // 期刊表
  id?: string
  jid?: string // jId
  journalsName?: string // 期刊名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 期刊封面
  launched?: string // 发表日期
  count?: number // 文章数量
  createTime?: string // 创建时间
  updateTime?: string //修改时间
  isPublish?: number //文章状态  0 发布 1不发布
  isDelete?: number //是否删除 0不删 1删
}

// JournalsQueryVO 分页查询期刊展示
export type JournalsQueryVO = {
  // 期刊表
  jid?: string // jId
  journalsName?: string // 期刊名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 出版模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 期刊封面
  launched?: string // 发表日期
  count?: number // 文章数量
  createTime?: string // 创建时间
  isPublish?: number //文章状态  0 发布 1不发布
}

// 搜索期刊泛型
export type JournalsQueryByPageParam = {
  jid?: string // jId
  journalsName?: string // 期刊名称
  isPublish?: string //文章状态  0 发布 1不发布
  page?: number
  pageSize?: number
}

// 修改期刊发布状态泛型
export type JournalsPublishParam = {
  jid?: string
  isPublish?: number //发布状态  0 发布 1不发布
}

// 修改期刊基础配置泛型
export type JournalsEditParam = {
  jid?: string // jId
  journalsName?: string // 期刊名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 期刊封面
  launched?: string // 发表日期
}

// 保存or创建 期刊基础配置
export type JournalsSaveParam = {
  jid?: string // jId
  journalsName?: string // 期刊名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 期刊封面
  launched?: string // 发表日期
}

// 删除期刊展示泛型
export type JournalsDeleteShow = {
  jid?: string // jId
  journalsName?: string // 期刊名称
}

// 期刊添加文章/移除 泛型
export type JournalsAddArticleParam = {
  jid?: string // jid 期刊id
  pid?: string // 文章id
}
// 期刊添加编委会 泛型
export type JournalsAddEditorialParam = {
  jid?: string // jid 期刊id
  eid?: string // 编委会id
  rank?: number // 编委会等级 0主编 1副主编 2成员
}

// 期刊移除编委会 泛型
export type JournalsRemoveEditorialParam = {
  id?: string
  jid?: string // jid 期刊id
  eid?: string // 编委会id
}
