declare namespace Menu {
  export interface IMenuItemChildren {
    id: number
    page: string
    icon?: any
    status: number
    route: string
    control: string
    handle: string
    description: string
    component?: any
    type: string
    parentId: number
    requiredId?: any
    children: any[]
  }

  export interface IMenuListTree {
    id: number
    page: string
    icon: string
    status: number
    route: string
    control?: any
    handle?: any
    description?: any
    component: string
    type: string
    parentId?: any
    requiredId: number
    children: IMenuItemChildren[]
  }
}
