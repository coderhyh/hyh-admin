<template>
  <div class="page-table">
    <HyhTable
      ref="hyhTableRef"
      :table-config="tableConfig"
      :table-data="fetchFn ? _tableData : tableData"
      :is-loading="isLoading"
      :page-total="_total"
      @on-page-change="handlePageChange"
    >
      <template #headerHandler>
        <el-button type="primary" size="small" :disabled="isInsert"> 新建 </el-button>
      </template>

      <template #handler>
        <div>
          <el-button size="small" type="primary" :disabled="isUpdate"> 编辑 </el-button>
          <el-button size="small" type="danger" :disabled="isDelete"> 删除 </el-button>
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
import { useVerifyPermission } from '~/hooks'

const props = withDefaults(
  defineProps<{
    tableConfig: ITableConfig
    fetchFn?: (page: pageType) => Promise<any>
    tableData?: any[]
  }>(),
  {
    fetchFn: undefined,
    tableData: () => []
  }
)
const customSlotNameList = computed(() => props.tableConfig.listDataConfig.filter((e) => e.customSlotName))

const isInsert = useVerifyPermission('table', 'insert')
const isDelete = useVerifyPermission('table', 'delete')
const isUpdate = useVerifyPermission('table', 'update')

const { winSize } = useStore('layout')
const hyhTableRef = ref<InstanceType<typeof HyhTable>>()
watch(winSize, () => {
  hyhTableRef.value!.doLayout()
})

type pageType = { currentPage: number; pageSize: number }
const _tableData = ref<any[]>([])
const _total = ref<number>(0)
const handlePageChange = async (page: pageType) => {
  fetchData(page)
  document.querySelector('#layout-main')?.scrollTo(0, 0)
}
const fetchData = async (page?: pageType) => {
  if (props.fetchFn) {
    showLoading()
    const [total, list] = await props.fetchFn(page!)
    _total.value = total
    _tableData.value = list
    hideLoading()
  }
}
onMounted(fetchData)

const isLoading = ref<boolean>(false)
const showLoading = () => (isLoading.value = true)
const hideLoading = () => (isLoading.value = false)
defineExpose({ showLoading, hideLoading })
</script>

<style lang="less" scoped>
.page-table {
  padding: 20px;
  border-radius: 15px;
  background-color: white;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
