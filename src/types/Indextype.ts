export type Index = {
  id?: number // 首页内容信息表
  jcount?: number //期刊数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
}

// IndexQueryVO 查询首页内容渲染
export type IndexQueryVO = {
  id?: number // 首页内容信息表
  jcount?: number //期刊数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
}

// IndexEditParam 首页内容修改
export type IndexEditParam = {
  id?: string // 首页内容信息表
  jcount?: number //期刊数
  pcount?: number //文章数
  ecount?: number //编辑数
  vcount?: number //视图数
  ucount?: number //下载数
  btitle?: string //大字标题
  ltitle?: string //小字标题
}




