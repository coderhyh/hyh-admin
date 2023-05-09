export interface ICreateMenuParams {
  page: string
  icon: string
  status: Omit<App.AccountStatus, 2>
  route: string
  routeName: string
  permission: string
  component: string
  type: Menu.MenuType
  parentId: number
  requiredId: number
  order: number
}
