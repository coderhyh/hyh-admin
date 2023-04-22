declare namespace App {
  interface ITab {
    title: string
    path: string
  }

  interface IDefaultResult {
    code: number
    message: string
  }

  interface IDefaultObject {
    [k: string]: any
  }

  interface ISelectOption {
    value: string
    label: string
  }
}
