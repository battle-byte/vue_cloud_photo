export type periodical = {
  id?: string
  periodicalName?: string
  elSSN?: string
  eIC?: string
  frequency?: string
  APC?: string
  publishingModel?: string
  peerReviewModel?: string
  indexArchiving?: string
  periodicalPhoto?: string
  publishTime?: string
}


//模糊查询活动数据
export type searchPeriodical = {
  id?: string
  periodicalName?: string
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 20 */
  pageSize?: number
}

// 添加期刊
export type addPeriodical = {
  periodicalName?: string
  elSSN?: string
  eic?: string
  frequency?: string
  apc?: string
  publishingModel?: string
  peerReviewModel?: string
  indexArchiving?: string
  periodicalPhoto?: string
  publishTime?: string
}

// 添加期刊
export type updatePeriodical = {
  id?: string
  periodicalName?: string
  elSSN?: string
  eic?: string
  frequency?: string
  apc?: string
  publishingModel?: string
  peerReviewModel?: string
  indexArchiving?: string
  periodicalPhoto?: string
  publishTime?: string
}