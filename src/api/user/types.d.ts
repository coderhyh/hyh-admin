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

export interface IGetUserListParams {
  pageNo: number
  pageSize: number
}

export interface IUpdateUserParams {
  userId: string
  username: string
  nickname: string
  role: string
}
