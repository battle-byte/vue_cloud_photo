export type UserArticle = {
  title?: string
  firstName?: string
  lastName?: string
  file?: string
  email?: string
  id?: string
  uid?: string
  isDelete?: number
  createTime?: string
  journal?: string
}

// UserArticleParam 查询用户提交表
export type UserArticleParam = {
  title?: string
  firstName?: string
  lastName?: string
  uid?: string
  page?: number //
  pageSize?: number //
}

// UserArticleVO 查询用户提交表回显
export type UserArticleVO = {
  title?: string
  firstName?: string
  lastName?: string
  file?: string
  email?: string
  uid?: string
  createTime?: string
  journal?: string
}

// DeleteUserArticle 删除回显
export type DeleteUserArticle = {
  // 新闻表
  uid?: string // 新闻id
  title?: string // 标题
}
