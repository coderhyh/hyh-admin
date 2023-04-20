const { userInfo } = useStore('user')

type control = 'table'
type permission = 'insert' | 'delete' | 'update' | 'query'
export const useVerifyPermission = (control: control, permission: permission) => {
  const route = useRoute()
  const { permission: permissionList, id } = userInfo.value
  const path = route.fullPath.slice(1)
  const curPermission = `${id}:${path}[${control}]:${permission}`
  return !permissionList?.includes(curPermission)
}
