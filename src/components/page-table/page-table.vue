<template>
  <div class="page-table">
    <HyhTable
      ref="hyhTableRef"
      v-model:page="page"
      v-bind="{
        tableConfig,
        tableData: fetchFn ? _tableData : tableData,
        isLoading,
        isShowSelectColumn
      }"
      @on-page-change="handlePageChange"
      @on-sort-change="handlePageChange"
      @selection-change="handleSelectionChange"
    >
      <template #headerHandler>
        <el-button
          v-show="selectUsers.length && isShowSelectColumn"
          type="danger"
          size="small"
          :disabled="isDelete"
          @click="handleBatchDelete"
        >
          批量删除
        </el-button>
        <el-button type="primary" size="small" :disabled="isDelete" @click="handleBatchDeletion"> 批量操作 </el-button>
        <el-button type="primary" size="small" :disabled="isInsert" @click="handleCreateClick"> 新建 </el-button>
      </template>

      <template #handler="{ row }">
        <div>
          <el-button size="small" type="primary" :disabled="isUpdate" @click="handleEditClick(row)"> 编辑 </el-button>
          <el-popconfirm title="确定要删除吗?" @confirm="handleDeleteClick(row)">
            <template #reference>
              <el-button size="small" type="danger" :disabled="isDelete"> 删除 </el-button>
            </template>
          </el-popconfirm>
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
    fetchFn?: (...args: any[]) => Promise<any>
    tableData?: any[]
  }>(),
  {
    fetchFn: undefined,
    tableData: () => [],
    selectUsers: () => []
  }
)
const isShowSelectColumn = ref(false)
const selectUsers = ref<User.IUserInfo[]>([])
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
type pageType = InstanceType<typeof HyhTable>['$props']['page']
const page = ref<pageType>({
  pageTotal: 0,
  pageNo: 1,
  pageSize: 20,
  orderBy: 'id',
  order: 'ASC'
})
const _tableData = ref<any[]>([])
const handlePageChange = async () => {
  await fetchData()
  document.querySelector('#layout-main')?.scrollTo(0, 0)
}
const fetchData = async (fn?: (page: Omit<NonNullable<pageType>, 'pageTotal'>) => Promise<any[]>) => {
  if (props.fetchFn) {
    showLoading()
    const [total, list] = await (fn ? fn(page.value!) : props.fetchFn(page.value))
    page.value!.pageTotal = total
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
  (e: 'onBatchDelete', selectUsers: User.IUserInfo[]): void
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
const handleSelectionChange = (selects: User.IUserInfo[]) => {
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
  background-color: white;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
