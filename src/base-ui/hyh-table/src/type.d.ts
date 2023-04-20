import { ElTable, ElTableColumn } from 'element-plus'

type defaultEventType = { [k: string]: (...args: any[]) => void }

export interface ITableConfig {
  title?: string
  tableProps?: InstanceType<typeof ElTable>['$props']
  tableEvent?: defaultEventType
  showSelectColumn?: boolean
  showIndexColumn?: boolean
  showFooter?: boolean
  columnUnifyConfig?: InstanceType<typeof ElTableColumn>['$props']
  listDataConfig: ITableListData[]
}

export interface ITableListData {
  slotName?: string
  customSlotName?: string
  formatter?: (row: any) => string
  prop?: string
  columnLabel: string
  columnProps?: InstanceType<typeof ElTableColumn>['$props']
}
