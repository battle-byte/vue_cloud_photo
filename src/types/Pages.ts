/** 通用分页参数类型 */
export type PageParams = {
    /** 页码：默认值为 1 */
    page: number
    /** 页大小：默认值为 20 */
    size: number
}

/** 通用分页结果类型 */
export type PageResult<T> = {
    /** 列表数据 */
    records: T[]
    /** 总条数 */
    total: number
}