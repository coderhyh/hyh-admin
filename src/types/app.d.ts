declare namespace App {
  type AccountStatus = 0 | 1 | 2
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
    value: string | number
    label: string
    grade: number
    disabled?: boolean
  }
}
