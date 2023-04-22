declare namespace Role {
  interface IRoleList {
    id: number
    role_name: string
    role_alias: string
    create_by: string
    update_by: string
    create_time: string
    update_time: string
    permission: IRolePermission[]
  }

  interface IRolePermission {
    id: number
    page: string
    control: string
    handler: string
    description: string
  }

  interface IRoleTypeList {
    id: number
    role_name: string
    role_alias: string
  }
}
