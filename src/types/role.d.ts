declare namespace Role {
  interface IRoleInfo {
    id: number
    role_name: string
    role_alias: string
    create_by: string
    update_by: string
    status: number
    grade: number
    create_time: string
    update_time: string
    permission: IRolePermission[]
  }

  interface IRolePermission {
    id: number
    page: string
    permission: string
  }

  interface IRoleListSelect {
    id: number
    role_name: string
    role_alias: string
    status: App.AccountStatus
    grade: number
  }
}
