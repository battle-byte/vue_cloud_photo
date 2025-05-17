import type { SysUserListVO } from '@/types/Users'

export type SpaceUserCreateRequest ={
  spaceId:string
  spaceRole:string
  userId:string
}
export type SpaceUserEditRequest ={
  spaceId:string
  spaceRole:string
  userId:string
}

export type SpaceUserQueryRequest ={
  id:string
  spaceId:string
  spaceRole:string
  userId:string
}

export type SpaceUserQueryResponse ={
  record:SpaceUserAndSysUser[]
}
export type SpaceUserAndSysUser ={
  spaceUser:SpaceUserData
  sysUser:SysUserListVO
}

export type SpaceUserData ={
  id:string
  spaceId:string
  userId:string
  spaceRole:string
  createdAt:string
  editAt:string
}
export type SpaceUserRoleResponse ={
  role:string
}
export type SpaceUserListRequest ={
}
export type SpaceUserListResponse ={
  record:SpaceUserListData[]
}

export type SpaceUserListData ={
  spaceId:string
  spaceRole:string
  spaceName:string
}
export type SpaceUserDeleteUserRequest ={
  spaceId:string
  userId:string
}


// 空间角色枚举
export const SPACE_ROLE_ENUM = {
  VIEWER: "space_viewer",
  EDITOR: "space_editor",
  ADMIN: "space_admin",
} as const;

// 空间角色文本映射
export const SPACE_ROLE_MAP: Record<string, string> = {
  space_viewer: "浏览者",
  space_editor: "编辑者",
  space_admin: "管理员",
};

// 空间角色选项映射
export const SPACE_ROLE_OPTIONS = Object.keys(SPACE_ROLE_MAP).map((key) => {
  return {
    label: SPACE_ROLE_MAP[key],
    value: key,
  };
});
