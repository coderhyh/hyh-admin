import { ITableConfig } from '~/base-ui/hyh-table'
import { utcToLocale } from '~/utils'

export const tableConfig: ITableConfig = {
  title: '用户管理',
  showFooter: true,
  tableProps: {
    stripe: true,
    defaultSort: { prop: 'id', order: 'ascending' },
    tooltipOptions: {
      effect: 'light'
    }
  },
  columnUnifyConfig: {
    minWidth: 130,
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
      prop: 'username',
      columnLabel: '用户名'
    },
    {
      prop: 'nickname',
      columnLabel: '昵称'
    },
    {
      prop: 'role',
      formatter: (row: User.Role) => row.role_name,
      columnLabel: '角色'
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
      prop: 'last_login_time',
      columnLabel: '最后登录时间',
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
