
//管理员创建用户
export type CreateSysUserRequest = {
  uid: string
  username: string
  password: string
  nickname: string
  avatar: string
  code: string
  uuid: string
}

//登录请求泛型
export type SysUserLoginRequest = {
  username?: string
  password?: string
  code?: string
  uuid?: string

}

//用户搜索 and 分页查询用户
export type ListSysUserRequest = {
  username?: string
  uid?: string
  page?: number
  size?: number
  rid:number
}

// 用户列表请求泛型
export type ListSysUserResponse = {
  users?: SysUserListVO[]
  total?: number
}

// 用户列表响应
export type SysUserListVO = {
  uid?: string
  username?: string
  nickname?: string
  avatar?: string
  updateBy?: string
  createBy?: string
  roleId?: number
  status?: number
  updateAt?: string
  createAt?: string
}

// 更新用户状态
export type ChangeStatusRequest = {
  status?: number
  uid?: string
}
//用户登录响应泛型
export type SysUserLoginResponse = {
  token?: string
  uid?: string
  username?: string
  nickname?: string
  avatar?: string
  status?: number
  expireAt?: number
  rid?: number
}



/*用户注册*/
export type SysUserRegisterRequest = {
  username?: string
  password?: string
  passwordAgain?: string
  code?: string
  uuid?: string
}
// 删除管理员回显
export type AdminDeleteShow = {
  username?: string
  uid?: string
}

/*修改用户密码*/
export type SysUserUpdatePasswordRequest = {
  username?: string
  password?: string
  oldPassword?: string
}
/*根据id获取的用户信息*/
export type SysUserFindByIdResponse = {
  uid?: string
  username?: string
  nickname?: string
  status?: number
  rid?: number
  avatar?: string
}
// 修改用户
export type SysUserUpdateRequest = {
  uid?: string
  username?: string
  nickname?: string
  avatar?: string
}

// 用户删除回显
export type SysUserDeleteShow = {
  uid?: string
  username?: string
}
// 搜索用户
export type SysUserSearch = {
  uid?: string
  username?: string
  rid?: number
}

/*修改用户密码*/
export type SysUserUpdatePasswordByAdminRequest = {
  username?: string
  password?: string
  uid?:string
}
