<template>
  <div class="page-table">
    <HyhTable
      ref="hyhTableRef"
      v-model:page="store.pageParams"
      v-bind="{
        tableConfig,
        tableData: automaticRequestFn ? _tableData : tableData,
        isLoading,
        isShowSelectColumn,
        pageTotal: store.pageTotal
      }"
      @on-page-change="handlePageChange"
      @on-sort-change="handlePageChange"
      @selection-change="handleSelectionChange"
    >
      <template #headerHandler>
        <section class="flex content-center">
          <Icon
            icon="mdi:refresh"
            size="25"
            class="cursor-pointer refresh"
            :class="{ 'refresh-click': refreshLoading }"
            @click="handleRefreshClick"
          />

          <el-popconfirm title="确定要删除吗?" @confirm="handleBatchDelete">
            <template #reference>
              <el-button
                v-show="selectUsers.length && isShowSelectColumn"
                type="danger"
                size="small"
                class="ml-10px"
                :disabled="isDelete"
              >
                批量删除
              </el-button>
            </template>
          </el-popconfirm>

          <el-button type="primary" size="small" @click="handleBatchDeletion"> 批量操作 </el-button>
          <el-button type="primary" size="small" :disabled="isInsert" @click="handleCreateClick"> 新建 </el-button>
        </section>
      </template>

      <template #handler="{ row }">
        <div class="flex content-center">
          <el-button size="small" type="primary" :disabled="isUpdate" @click="handleEditClick(row)">
            {{ editText }}
          </el-button>
          <el-popconfirm title="确定要删除吗?" @confirm="handleDeleteClick(row)">
            <template #reference>
              <el-button size="small" type="danger" :disabled="isDelete"> 删除 </el-button>
            </template>
          </el-popconfirm>
          <el-dropdown v-if="isShowMore" ml-10px>
            <Icon icon="ion:ellipsis-horizontal" size="18" class="cursor-pointer outline-none hover:text-#409eff" />
            <el-button type="primary" link></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="isUpdate" @click="$emit('onResetPassword', row)">
                  重置密码
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>

      <template v-for="item in customSlotNameList" :key="item.prop" #[item.customSlotName!]="scope">
        <template v-if="item.customSlotName">
          <slot :name="item.customSlotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyhTable>
  </div>
</template>

<script setup lang="ts">
import HyhTable, { ITableConfig } from '~/base-ui/hyh-table'

const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfig
    automaticRequestFn?: (...args: any[]) => Promise<any>
    tableData?: any[]
    pageType?: undefined | 'role' | 'user'
    editText?: string
    isShowMore?: boolean
    isShowRefresh?: boolean
  }>(),
  {
    automaticRequestFn: undefined,
    tableData: () => [],
    editText: '编辑',
    isShowMore: false,
    isShowRefresh: true,
    pageType: undefined
  }
)
const isShowSelectColumn = ref(false)
const selectUsers = ref<any[]>([])
const refreshLoading = ref<boolean>(false)
const handleRefreshClick = () => {
  refreshLoading.value = true
  fetchData()
  setTimeout(() => {
    refreshLoading.value = false
  }, 1500)
}
const handleBatchDeletion = () => {
  isShowSelectColumn.value = !isShowSelectColumn.value
}

const customSlotNameList = computed(() => props.tableConfig.listDataConfig.filter((e) => e.customSlotName))
// 权限
const isInsert = useVerifyPermission('table', 'insert')
const isDelete = useVerifyPermission('table', 'delete')
const isUpdate = useVerifyPermission('table', 'update')
// 更新table
const { winSize } = useStore('layout')
const hyhTableRef = ref<InstanceType<typeof HyhTable>>()
watch(winSize, () => {
  hyhTableRef.value!.doLayout()
})
// 请求数据
const store = ref<App.IDefaultObject>({})
if (props.pageType) {
  store.value = useStore(props.pageType)
}
const _tableData = ref<any[]>([])
const handlePageChange = async () => {
  props.tableConfig.columnUnifyConfig?.sortable === 'custom' && (await fetchData())
  document.querySelector('#layout-main')?.scrollTo(0, 0)
}
const fetchData = async () => {
  if (props.automaticRequestFn) {
    showLoading()
    const list = await props.automaticRequestFn()
    _tableData.value = list
    selectUsers.value = []
    hideLoading()
  }
}
onMounted(fetchData)
// loading
const isLoading = ref<boolean>(false)
const showLoading = () => (isLoading.value = true)
const hideLoading = () => (isLoading.value = false)
defineExpose({ showLoading, hideLoading, fetchData })
// 事件处理
const emit = defineEmits<{
  (e: 'onDeleteClick', row: any): void
  (e: 'onEditClick', row: any): void
  (e: 'onCreateClick'): void
  (e: 'onBatchDelete', selectUsers: any[]): void
  (e: 'onResetPassword', userItem: User.IUserInfo): void
}>()
const handleDeleteClick = (row: any) => {
  emit('onDeleteClick', row)
}
const handleEditClick = (row: any) => {
  emit('onEditClick', row)
}
const handleCreateClick = () => {
  emit('onCreateClick')
}
const handleSelectionChange = (selects: any[]) => {
  selectUsers.value = selects
}
const handleBatchDelete = () => {
  emit('onBatchDelete', selectUsers.value)
}
</script>

<style lang="less" scoped>
.page-table {
  padding: 20px;
  border-radius: 15px;
  background-color: var(--hyh-bg-color);
  box-shadow: var(--el-box-shadow-lighter);
  transition: all 0.3s ease;

  .refresh {
    &:hover {
      color: var(--theme-color);
      transition: color 0.3s ease;
    }
  }

  .flex.content-center {
    background: inherit;
  }

  .refresh-click {
    animation: refresh 1.5s infinite;
  }

  @keyframes refresh {
    to {
      transform: rotate(720deg);
    }
  }

  :deep(.el-dropdown) {
    align-items: center;
  }

  .cover-color() {
    border-color: var(--hyh-border-color) !important;
    background: var(--hyh-bg-color) !important;
    transition: all 0.3s ease;
  }

  :deep(.el-table__inner-wrapper) {
    &::after,
    &::before {
      background: var(--hyh-border-color) !important;
      transition: all 0.3s ease;
    }

    tbody {
      > tr {
        background: var(--hyh-bg-color);

        > td {
          background: var(--hyh-bg-color);
        }
      }

      .hover-row > td,
      .hover-row .flex.content-center {
        background: var(--hyh-sub-bg) !important;
      }
    }

    .cell-row {
      .cover-color();
    }

    .header-row {
      th {
        .cover-color();
      }
    }
  }

  :deep(.el-table--border) {
    &::after,
    .el-table__border-left-patch {
      background: var(--hyh-border-color) !important;
      transition: all 0.3s ease;
    }
  }

  :deep(.el-pagination) {
    .el-input__wrapper {
      .cover-color();

      box-shadow: 0 0 0 1px var(--hyh-border-color);
    }

    .btn-prev,
    .el-pager li,
    .btn-next {
      background: initial !important;
    }
  }
}
</style>
