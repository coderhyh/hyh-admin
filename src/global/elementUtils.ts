import { ElMessage, ElMessageBox, MessageHandler } from 'element-plus'

export const elementUtils = {
  $message(message: string, type?: 'success' | 'warning' | 'info' | 'error'): MessageHandler {
    return ElMessage({
      message,
      grouping: true,
      type,
      showClose: true,
      offset: 80
    })
  },
  $messageBox(message: string, title = '提示') {
    ElMessageBox.alert(message, title, {
      confirmButtonText: 'OK',
      dangerouslyUseHTMLString: true
    })
  }
}
