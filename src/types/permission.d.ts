declare namespace IPermission {
  interface IListSelect {
    page: string
    route: string
    children: IListSelectChildren[]
  }

  interface IListSelectChildren {
    id: number
    page: string
    route: string
    handle: string
    control: string
    description: string
  }
}
