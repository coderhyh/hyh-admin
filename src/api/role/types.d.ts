export interface ICreateRole {
  role_name: string
  role_alias: string
  status: 0 | 1
  grade: number
  permissionList: number
}

export interface IGetUserListParams {
  pageNo: number
  pageSize: number
  orderBy: string
  order: 'ASC' | 'DESC'
  queryCondition: { id: string; role_name: string; role_alias: string }
}

export interface IUpdateRoleParams {
  roleId: number
  role_name: string
  role_alias: string
  status: 0 | 1
  grade: number
  permissionList: number[]
}

export interface IUpdateRoleStatusParams {
  roleId: number
  status: number
}
