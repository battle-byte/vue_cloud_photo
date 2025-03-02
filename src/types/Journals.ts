import type { ArticleQueryByPageParam } from '@/types/Article'
import type { Editorial } from '@/types/Editorial'

export type Journals = {
  // 高校表
  id?: string
  jid?: string // jId
  journalsName?: string // 高校名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 高校封面-- 长条图
  bigImage?: string // 大的背景图
  smallImage?: string // 小的背景图
  launched?: string // 发表日期
  count?: number // 文章数量
  createTime?: string // 创建时间
  updateTime?: string //修改时间
  isPublish?: number //文章状态  0 发布 1不发布
  isDelete?: number //是否删除 0不删 1删
  type?: number //高校类型 0高校 1书籍
  email?: string // 邮箱
}

// JournalsQueryVO 分页查询高校展示
export type JournalsQueryVO = {
  // 高校表
  jid?: string // jId
  journalsName?: string // 高校名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 出版模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 高校封面
  bigImage?: string // 大的背景图
  smallImage?: string // 小的背景图
  launched?: string // 发表日期
  count?: number // 文章数量
  createTime?: string // 创建时间
  isPublish?: number //文章状态  0 发布 1不发布
  type?: number //高校类型 0高校 1书籍
  email?: string // 邮箱
}

// 搜索高校泛型
export type JournalsQueryByPageParam = {
  jid?: string // jId
  journalsName?: string // 高校名称
  isPublish?: string //文章状态  0 发布 1不发布
  page?: number
  pageSize?: number
}

// 修改高校发布状态泛型
export type JournalsPublishParam = {
  jid?: string
  isPublish?: number //发布状态  0 发布 1不发布
}

// 修改高校类型泛型
export type JournalsTypeParam = {
  jid?: string
  type?: number //高校类型 0高校 1书籍
}

// 修改高校基础配置泛型
export type JournalsEditParam = {
  jid?: string // jId
  journalsName?: string // 高校名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 高校封面
  bigImage?: string // 大的背景图
  smallImage?: string // 小的背景图
  launched?: string // 发表日期
  email?: string // 邮箱
}

// 保存or创建 高校基础配置
export type JournalsSaveParam = {
  jid?: string // jId
  journalsName?: string // 高校名称
  elssn?: string // elssN
  eic?: string // elc
  frequency?: string // 频率
  apc?: string // apc
  publishingModel?: string // 发布模式
  peerReviewModel?: string // 同行评议模式c
  indexArchiving?: string // 索引与归档id
  journalsPhoto?: string // 高校封面
  bigImage?: string // 大的背景图
  smallImage?: string // 小的背景图
  launched?: string // 发表日期
  email?: string // 邮箱
}

// 删除高校展示泛型
export type JournalsDeleteShow = {
  jid?: string // jId
  journalsName?: string // 高校名称
}

// 高校添加文章/移除 泛型
export type JournalsAddArticleParam = {
  jid?: string // jid 高校id
  pid?: string // 文章id
}
// 高校添加编辑人员 泛型
export type JournalsAddEditorialParam = {
  jid?: string // jid 高校id
  eid?: string // 编辑人员id
  rank?: number // 编辑人员等级 0主编 1副主编 2成员
}

// 高校移除编辑人员 泛型
export type JournalsRemoveEditorialParam = {
  id?: string
  jid?: string // jid 高校id
  eid?: string // 编辑人员id
}
