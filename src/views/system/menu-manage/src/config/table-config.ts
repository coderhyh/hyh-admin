import { ITableConfig } from '~/base-ui/hyh-table'
import { MENU_TYPE } from '~/enums'

export const tableConfig: ITableConfig = {
  title: '菜单管理',
  showFooter: false,
  tableProps: {
    rowKey: 'id',
    border: true,
    defaultSort: { prop: 'id', order: 'ascending' },
    tooltipOptions: {
      effect: 'light'
    }
  },
  columnUnifyConfig: {
    minWidth: 125,
    sortOrders: ['ascending', 'descending']
  },
  listDataConfig: [
    {
      prop: 'page',
      columnLabel: '菜单名称',
      columnProps: {
        width: 170,
        sortable: true
      }
    },
    {
      prop: 'icon',
      customSlotName: 'icon',
      columnLabel: '图标',
      columnProps: {
        width: 80
      }
    },
    {
      prop: 'order',
      columnLabel: '排序',
      columnProps: {
        width: 80,
        sortable: true
      }
    },
    {
      prop: 'type',
      columnLabel: '权限标识',
      formatter(prop: Menu.MenuType, row: Menu.IMenuListTree) {
        return prop === 'permission' ? row.permission : ''
      }
    },
    {
      prop: 'component',
      columnLabel: '组件路径'
    },
    {
      prop: 'route',
      columnLabel: '路由地址',
      formatter(prop: string, row: Menu.IMenuListTree) {
        return row.type !== 'permission' ? prop : ''
      }
    },
    {
      prop: 'type',
      columnLabel: '菜单类型',
      formatter: (prop: keyof typeof MENU_TYPE, row) => (prop ? MENU_TYPE[prop] : prop),
      columnProps: {
        width: 100
      }
    },
    {
      prop: 'requiredText',
      columnLabel: '需要权限',
      columnProps: {
        width: 120
      }
    },
    {
      prop: 'status',
      columnLabel: '状态',
      customSlotName: 'status',
      columnProps: {
        width: 80
      }
    },
    {
      slotName: 'handler',
      columnLabel: '操作',
      columnProps: {
        width: 130,
        fixed: 'right'
      }
    }
  ]
}
