//用户全部常量
export type User = {
  createTime?: string;
  id?: number;
  isDelete?: number;
  mpOpenId?: string;
  phone?: number;
  sex?: number;
  unionId?: string;
  updateTime?: string;
  userAccount?: string;
  userAvatar?: string;
  userName?: string;
  userPassword?: string;
  userProfile?: string;
  userRole?: number;
  school?: number
  fans: ?number
};


//批量获取用户信息
export type UserList = {
  id?: string,
  userName?: string;
  sex?: number,
  school?: number,
  createTime?: string,
  userProfile?: string,
  phone?: string,
  userRole?: number
  userAvatar?: string
  fans?: number
}

//修改用户信息泛型
export type updateUser = {
  id?: string,
  userName?: string;
  userAvatar?: string
  userProfile?: string,
}

//模糊查询用户信息泛型
export type SearchUser = {
  id?: string,
  userName?: string;
  /** 页码：默认值为 1 */
  page?: number
  /** 页大小：默认值为 20 */
  pageSize?: number
}

//添加新的用户管理员
export type AddAdmin = {
  userName?: string;
  school?: number;
  userAvatar?: string;
  userProfile?: string;
  AdminAccount?: string;
  AdminPassword?: string;
  checkPassword?: string
}

//条形图
export type AddUserCount = {
  /**
   * 日期
   */
  timeList?: string[]

  /**
   * 人员数量
   */
  userCountList?: string[]
}
