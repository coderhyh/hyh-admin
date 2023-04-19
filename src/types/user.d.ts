declare namespace User {
  interface IUserLoginSuccess {
    code: number
    message: string
    token: string
    userInfo: UserInfo
  }

  interface IUserInfo {
    id: number
    user_name: string
    nickname: string
    create_time: string
    update_time: string
    last_login_time?: any
    role: Role
    permission: string[]
  }

  interface Role {
    id: number
    role_name: string
    role_alias: string
  }
}
