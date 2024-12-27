export type Membership = {
  // 伙伴关系表
  id?: string // 伙伴id
  url?: string // 跳转路由
  img?: string // 伙伴图片
}

// 单独搜索一条伙伴关系数据 和 分页查询
export type MembershipQueryVO = {
  // 伙伴关系表
  id?: string // 伙伴id
  url?: string // 跳转路由
  img?: string // 伙伴图片
}

// MembershipQueryByPageParam 分页搜索伙伴关系文章
export type MembershipQueryByPageParam = {
  // 伙伴关系表
  id?: string // 伙伴关系id
  page?: number // 页码
  pageSize?: number // 一页内容数量
}

// MembershipBaseSaveParam 创建伙伴关系基础配置
export type MembershipBaseSaveParam = {
  // 伙伴关系表
  id?: string // 伙伴id
  url?: string // 跳转路由
  img?: string // 伙伴图片
}

// MembershipBaseEditParam 修改伙伴关系基础配置
export type MembershipBaseEditParam = {
  // 伙伴关系表
  id?: string // 伙伴id
  url?: string // 跳转路由
  img?: string // 伙伴图片
}

// 删除伙伴关系展示泛型
export type MembershipDeleteShow = {
  id?: string // 伙伴关系id
}
