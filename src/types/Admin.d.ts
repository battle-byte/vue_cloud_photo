//登录请求泛型
export type adminLogin = {
  userAccount?: string
  userPassword?: string
  code?: string
  uuid?: string
}

//管理员登录响应泛型
export type adminMessage = {
  userName?: string
  token?: string
  id?: string
  userAvatar?: string
  userRole?: number
}

//用户登录响应泛型
export type userMessage = {
  userName?: string
  token?: string
  id?: string
  userAvatar?: string
  userRole?: number
}

/*UserVO*/
//用户登录响应泛型
export type UserVO = {
  id?: string
  userName?: string
  userAvatar?: string
  userProfile?: string
  userRole?: string
  createTime?: string
}

/*用户注册*/
export type userRegister = {
  userAccount?: string
  userPassword?: string
  userPasswordAgain?: string
  code?: string
  uuid?: string
}


//管理员查看登录用户信息泛型
export type UserListVO = {
  id?: string
  userName?: string
  userAccount?: string
  userAvatar?: string
  userProfile?: string
  userRole?: string
  createTime?: string
  updateTime?: string
}