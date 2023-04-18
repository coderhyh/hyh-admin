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
    role: number
    create_time: string
    update_time: string
    last_login_time: null | string
  }
}
