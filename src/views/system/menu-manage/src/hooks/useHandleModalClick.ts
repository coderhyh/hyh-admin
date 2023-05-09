import { Ref } from 'vue'

import { setMenu } from '~/api/menu'
import { ICreateMenuParams } from '~/api/menu/types'
import { IFormConfig, IFormDataList } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'

import { modalFormConfig } from '../config'

interface IParams {
  pageTableRef: Ref<InstanceType<typeof PageTable> | undefined>
}

export const useHandleModalClick = (params: IParams) => {
  const { pageTableRef } = params
  const { title, handleType, isShowDialog, modalFormData, handleClick, updateModalFormConfig } = usePageModal()
  const global = getCurrentInstance()?.proxy
  const { menuListTree, fetchMenus } = useStore('menu')

  // 通过选择单选择改变表单
  type IMenuType = 'defaultConfig' | Menu.MenuType
  const menuType = computed<IMenuType>(() => modalFormData.value.type || 'menu')
  const currentModalConfig = computed(() => modalConfig[menuType.value])
  const handleRadioChange = (val?: string, row?: Menu.IMenuListTree) => {
    const originFormData = useFormDataOrigin(currentModalConfig.value.formDataList)
    const newFormData = Object.entries(modalFormData.value).reduce<App.IDefaultObject>(
      (data, [k, v]) => (originFormData[k] !== undefined && (data[k] = v), data),
      {}
    )
    let editFormData: App.IDefaultObject | undefined = undefined
    if (row) {
      editFormData = getEditFormData(currentModalConfig.value.formDataList, row)
      editFormData = Object.entries(editFormData).reduce<App.IDefaultObject>(
        (data, [k, v]) => (originFormData[k] !== undefined && (data[k] = v), data),
        {}
      )
    }

    updateModalFormConfig(currentModalConfig.value, {
      ...defaultValue.value,
      ...(row && editFormData),
      ...newFormData
    })
  }
  const getEditFormData = (list: IFormDataList[], row: Menu.IMenuListTree) =>
    list.reduce<App.IDefaultObject>((data, it) => {
      const val = row[it.modelValue as keyof Menu.IMenuListTree]
      if (it.modelValue === 'parentId') data[it.modelValue] = val ?? 0
      else data[it.modelValue] = val
      return data
    }, {})
  const handleEditRadioChange = (row: Menu.IMenuListTree) => () => {
    handleRadioChange(undefined, row)
  }

  const defaultValue = computed(() =>
    currentModalConfig.value.formDataList.reduce<App.IDefaultObject>(
      (data, e) => (e.defaultValue !== undefined && (data[e.modelValue] = e.defaultValue), data),
      {}
    )
  )

  // 请求权限选择项
  let modalConfig: { [k in IMenuType]: IFormConfig } = modalFormConfig(menuListTree.value, handleRadioChange)

  // modal click
  let menuId: number | undefined
  const handleEditClick = (row: Menu.IMenuListTree) => {
    modalConfig = modalFormConfig(menuListTree.value, handleEditRadioChange(row))
    menuId = row.id
    handleClick({
      type: 'edit',
      config: modalConfig[row.type],
      title: '修改菜单',
      formData: getEditFormData(modalConfig[row.type].formDataList, row)
    })
  }
  const handleCreateClick = () => {
    modalConfig = modalFormConfig(menuListTree.value, handleRadioChange)
    handleClick({
      type: 'create',
      config: currentModalConfig.value,
      title: '新建菜单',
      formData: useFormDataOrigin(currentModalConfig.value.formDataList)
    })

    handleRadioChange()
  }
  const handleModalSubmit = () => {
    useFetchTryCatch(async () => {
      let res: App.IDefaultObject = {}
      if (handleType.value === 'edit') {
        res = await setMenu(modalFormData.value as ICreateMenuParams, false, menuId)
      } else if (handleType.value === 'create') {
        res = await setMenu(modalFormData.value as ICreateMenuParams)
      }
      await fetchMenus()
      if (res.code === 200) isShowDialog.value = false
      global?.$message(res.message, res.code === 200 ? 'success' : 'error')
      pageTableRef.value?.fetchData()
    }).catch((error: any) => {
      global?.$message(error?.response?.data?.message, 'error')
    })
  }

  return {
    title,
    isShowDialog,
    modalFormData,
    handleEditClick,
    handleCreateClick,
    handleModalSubmit
  }
}
