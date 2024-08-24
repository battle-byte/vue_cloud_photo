//登录请求泛型
export type adminLogin = {
  userAccount?: string
  userPassword?: string
  code?: string
  uuid?: string
}

//用户搜索
export type SearchUserParam = {
  userAccount?: string
  uid?: string
  page?: number
  pageSize?: number
}

//用户登录响应泛型
export type UserLoginVO = {
  token?: string
  uid?: string
  userAccount?: string
  userRole?: number
}

/*UserVO*/
export type UserVO = {
  uid?: string
  userAccount?: string
  userRole?: number
  createTime?: string
}

/*用户注册*/
export type UserRegister = {
  userAccount?: string
  userPassword?: string
  userPasswordAgain?: string
  code?: string
}
// 删除管理员回显
export type AdminDeleteShow = {
  userAccount?: string
  uid?: string
}

// 临时验证码
export type AdminCode = {
  code?: string
}

/*修改用户密码*/
export type UserUpdatePassword = {
  userAccount?: string
  userPassword?: string
}
