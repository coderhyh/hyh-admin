<template>
  <el-container>
    <el-aside>
      <Aside />
    </el-aside>
    <el-container style="min-width: 375px">
      <el-header :style="{ height: headerHeight }" style="transition: all 0.2s ease">
        <Header />
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="tabs.map((i) => i.path.slice(1))">
              <component :is="Component" :key="route.name"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { DEVICE } from '~/global/mapDeviceSize'
import { Aside, Header } from '~/layout'
const { tabs, winSize } = useStore('layout')

const headerHeight = computed(() => (winSize.value, window.innerWidth <= DEVICE.mobile ? '60px' : '100px'))
</script>

<style lang="less" scoped>
:deep(.el-aside) {
  width: auto !important;
}

:deep(.el-container) {
  height: 100vh;

  .el-header {
    padding: 0;
    height: 100px;
    background: var(--hyh-bg-color);
  }

  .el-main {
    overflow-x: hidden;
    overflow-y: scroll;
    background: var(--hyh-sub-bg);
  }
}
</style>
