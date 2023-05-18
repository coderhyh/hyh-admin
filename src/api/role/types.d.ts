export interface ICreateRole {
  role_name: string
  role_alias: string
  status: App.AccountStatus
  grade: number
  permissionList: number
}

export type IGetRoleListParams = App.IPageListParams<{ id: string; role_name: string; role_alias: string }>

export interface IUpdateRoleParams {
  roleId: number
  role_name: string
  role_alias: string
  status: App.AccountStatus
  grade: number
  permissionList: number[]
}

export interface IUpdateRoleStatusParams {
  roleId: number
  status: number
}
