type control = 'table'
type handle = 'insert' | 'delete' | 'update' | 'query'
export const useVerifyPermission = (control: control, handle: handle) => {
  const { userInfo } = useStore('user')
  const route = useRoute()
  const { permission: permissionList, id } = userInfo.value
  const path = route.fullPath.slice(1)
  const curPermission = `${id}:${path}[${control}]:${handle}`
  return !permissionList?.includes(curPermission)
}
