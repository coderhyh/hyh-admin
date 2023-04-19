<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { getUserInfoAction, token } = useStore('user')
const { setBodyTheme } = useStore('layout')
token.value && getUserInfoAction()
setBodyTheme()
</script>

<style lang="less" scoped></style>
