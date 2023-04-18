import { ITableConfig } from '~/base-ui/hyh-table'

export const tableConfig: ITableConfig = {
  title: '文献黑名单',
  showIndexColumn: true,
  showSelectColumn: true,
  tableProps: {
    stripe: true
  },
  listDataConfig: [
    {
      slotName: 'userName',
      prop: 'name',
      columnLabel: '姓名'
    },
    {
      slotName: 'userAge',
      prop: 'age',
      columnLabel: '年龄'
    },
    {
      customSlotName: 'image',
      prop: 'img',
      columnLabel: '图片'
    },
    {
      slotName: 'handler',
      columnLabel: '操作',
      columnProps: {
        width: 200
      }
    }
  ]
}
