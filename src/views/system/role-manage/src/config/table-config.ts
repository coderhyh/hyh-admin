import { ITableConfig } from '~/base-ui/hyh-table'
import { utcToLocale } from '~/utils'

export const tableConfig: ITableConfig = {
  title: '角色管理',
  showFooter: true,
  tableProps: {
    stripe: true,
    defaultSort: { prop: 'id', order: 'ascending' },
    tooltipOptions: {
      effect: 'light'
    }
  },
  columnUnifyConfig: {
    minWidth: 125,
    sortable: 'custom',
    sortOrders: ['ascending', 'descending']
  },
  listDataConfig: [
    {
      prop: 'id',
      columnLabel: 'ID',
      columnProps: {
        width: 90
      }
    },
    {
      prop: 'role_name',
      columnLabel: '角色名'
    },
    {
      prop: 'role_alias',
      columnLabel: '别名'
    },
    {
      prop: 'grade',
      columnLabel: '级别',
      customSlotName: 'grade',
      columnProps: {
        width: 80
      }
    },
    {
      prop: 'status',
      columnLabel: '状态',
      customSlotName: 'status',
      columnProps: { sortable: false }
    },
    {
      prop: 'create_by',
      columnLabel: '创建者'
    },
    {
      prop: 'update_by',
      columnLabel: '修改者'
    },
    {
      prop: 'create_time',
      columnLabel: '创建时间',
      formatter: utcToLocale
    },
    {
      prop: 'update_time',
      columnLabel: '更新时间',
      formatter: utcToLocale
    },

    {
      slotName: 'handler',
      columnLabel: '操作',
      columnProps: {
        width: 160,
        fixed: 'right',
        sortable: false
      }
    }
  ]
}
