import { ElTable, ElTableColumn } from 'element-plus'

type defaultEventType = { [k: string]: (...args: any[]) => void }

export interface ITableConfig {
  title?: string
  tableProps?: InstanceType<typeof ElTable>['$props']
  tableEvent?: defaultEventType
  showSelectColumn?: boolean
  showIndexColumn?: boolean
  listDataConfig: ITableListData[]
}

export interface ITableListData {
  slotName?: string
  customSlotName?: string
  prop?: string
  columnLabel: string
  columnProps?: InstanceType<typeof ElTableColumn>['$props']
}
