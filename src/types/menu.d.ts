declare namespace Menu {
  type MenuType = 'menu' | 'directory' | 'permission'

  export interface IMenuListTree {
    id: number
    page: string
    icon: string
    status: number
    route: string
    routeName: string
    control: string
    handle: string
    description: string
    component: string
    type: MenuType
    parentId: number | null
    requiredId: number
    children: IMenuListTree[]
  }
}
