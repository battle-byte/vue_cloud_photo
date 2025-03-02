//文章基础泛型
export type post = {
  id?: string;
  title?: string;//标题
  content?: string;//内容
  author?: string;//作者
  periodical?: string;//高校id
  textUrl?: string;//文章发表路径
  receiveTime?: string; //接收时间
  hireTime?: string;//录用时间
  postAvatar?: string;//头像
  publishTime?: string;//发布时间
  view?: number;//阅读量
  isDelete?: number//是否删除
  upload?: number//下载量
  introduction?: number//引言
};

//文章基础泛型
export type postList = {
  id?: string;
  title?: string;//标题
  content?: string;//内容
  author?: string;//作者
  periodical?: string;//高校id
  periodicalName?: string;//高校名称
  textUrl?: string;//文章发表路径
  receiveTime?: string; //接收时间
  hireTime?: string;//录用时间
  postAvatar?: string;//头像
  publishTime?: string;//发布时间
  view?: number;//阅读量
  isDelete?: number//是否删除
  upload?: number//下载量
  introduction?: number//引言
};


//模糊查询用户文章信息泛型
export type SearchPost = {
  id?: string,
  title?: string;
  author?: string
  periodical?: string
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 20 */
  pageSize?: number
}

//提交新文章
export type submitPost = {
  title?: string
  content?: string
  postAvatar?: string

}
//修改文章
export type adminUpdatePost = {
  id?: string
  title?: string
  content?: string
  postAvatar?: string
}


//修改用户文章信息泛型   暂定
export type updatePost = {
  id?: string,
  title?: string;
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 20 */
  pageSize?: number
}

//展示文章内容泛型
export type postView = {
  title?: string;
  context?: string
  postAvatar?: string
}

//柱状图数据
export type AddPostCount = {
  /**
   * 日期
   */
  timeList?: string[]

  /**
   * 人员数量
   */
  postCountList?: string[]

}

//用户模糊查询个人文章信息泛型
export type UserSearchPost = {
  title?: string;
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 20 */
  pageSize?: number
}

//用户修改文章
export type userUpdatePost = {
  id?: string
  title?: string
  content?: string
  postAvatar?: string
  category?: number
}


