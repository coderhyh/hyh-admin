export interface ICreateUserParams {
  username: string
  password: string
  nickname: string
  role: string
}

export interface IUserLoginParams {
  username: string
  password: string
}

export type IGetUserListParams = App.IPageListParams<{ id: string; username: string; nickname: string }>

export interface IUpdateUserParams {
  userId: string
  username: string
  nickname: string
  role: string
  status: App.AccountStatus
}

export interface IResetPasswordParams {
  userId: string | number
  newPassword: string | number
}
