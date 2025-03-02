export type Index = {
  id?: number // 首页内容信息表
  jcount?: number //高校数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
  logo?: string //左上角logo
  note?: string //备案信息
  background?: string //大背景图
  littlelogo?: string //底部小logo
  registerurl?: string // 选择2  注册网址
  logurl?:      string  // 选择2  登录网址
  emailurl?:    string  // 选择3  邮箱网址
}

// IndexQueryVO 查询首页内容渲染
export type IndexQueryVO = {
  id?: number // 首页内容信息表
  jcount?: number //高校数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
  logo?: string //左上角logo
  note?: string //备案信息
  background?: string //大背景图
  littlelogo?: string //底部小logo
  registerurl?: string // 选择2  注册网址
  logurl?:      string  // 选择2  登录网址
  emailurl?:    string  // 选择3  邮箱网址
}

// IndexEditParam 首页内容修改
export type IndexEditParam = {
  id?: string // 首页内容信息表
  jcount?: number //高校数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
  logo?: string //左上角logo
  note?: string //备案信息
  background?: string //大背景图
  littlelogo?: string //底部小logo
  registerurl?: string // 选择2  注册网址
  logurl?:      string  // 选择2  登录网址
  emailurl?:    string  // 选择3  邮箱网址
}
