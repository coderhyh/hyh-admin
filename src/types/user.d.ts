declare namespace User {
  interface IUserLoginSuccess {
    code: number
    message: string
    token: string
    userInfo: UserInfo
  }

  interface IUserExit {
    code: string
    message: string
  }

  interface IUserInfo {
    id: number
    username: string
    nickname: string
    create_time: string
    update_time: string
    last_login_time?: string
    role: Role
    permission: string[]
  }

  interface Role {
    id: number
    role_name: string
    role_alias: string
    status: 0 | 1
    grade: number
  }
}
