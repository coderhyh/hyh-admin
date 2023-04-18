<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const { getUserInfoAction, token } = useStore('user')
const router = useRouter()
token.value && getUserInfoAction()
</script>

<style lang="less" scoped></style>
