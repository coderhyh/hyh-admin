<template>
  <div class="header">
    <section>
      <HeaderCrumbs />
      <HeaderControl />
    </section>
    <HeaderTabs v-show="isShowHeaderTabs" />
  </div>
</template>

<script lang="ts" setup>
import { DEVICE } from '~/global/mapDeviceSize'

const { winSize, winWidth } = useStore('layout')
const isShowHeaderTabs = computed(() => (winSize.value, winWidth.value > DEVICE.mobile))
</script>

<style lang="less" scoped>
.header {
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
