<template>
  <div class="header">
    <Crumbs />
    <HeaderTabs v-if="isShowHeaderTabs" />
  </div>
</template>

<script lang="ts" setup>
import { DEVICE } from '~/global/mapDeviceSize'

const { winSize } = useStore('layout')
const isShowHeaderTabs = computed(() => (winSize.value, window.innerWidth > DEVICE.mobile))
</script>

<style lang="less" scoped>
.header {
  height: 60px;
}
</style>
