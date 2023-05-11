<template>
  <div class="aside" :style="{ width: `${asideWidth}px` }">
    <section>
      <img src="/favicon.ico" alt="logo" />
      <h2 v-if="!isCollapse && size > 500" class="title">hyh-admin</h2>
    </section>
    <el-menu
      router
      :default-active="currentPath"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      @select="menuSelect"
    >
      <TreeMenu :menu-list="menus"></TreeMenu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { DEVICE } from '~/global/mapDeviceSize'

const { menus } = useStore('menu')
const { isCollapse, winSize: size } = useStore('layout')

const route = useRoute()
const currentPath = computed(() => route.fullPath.slice(route.fullPath.lastIndexOf('/') + 1))

const menuSelect = () => {
  if (window.innerWidth <= DEVICE.mobile) {
    isCollapse.value = true
    size.value = window.innerWidth > DEVICE.ipad ? 600 : window.innerWidth
  }
}

const asideWidth = computed(() => {
  if (size.value > DEVICE.ipad) {
    return 250
  } else if (size.value > DEVICE.mobile && size.value <= DEVICE.ipad) {
    return 70
  } else if (size.value <= DEVICE.mobile) {
    return 0
  }
})

const handleResize = () => {
  isCollapse.value = size.value <= 730
}
watch(size, handleResize, { immediate: true, deep: true })
</script>

<style lang="less" scoped>
::-webkit-scrollbar-track {
  background: var(--hyh-aside-bg);
}

.aside {
  overflow-x: hidden;
  position: relative;
  max-width: 250px;
  height: 100vh;
  background: var(--hyh-aside-bg);
  transition: all 0.3s ease;

  section {
    display: flex;
    position: absolute;
    top: 6px;
    z-index: 999;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 34px;
    user-select: none;

    .title {
      text-align: center;
      font-size: 23px;
      color: white;
      white-space: nowrap;
    }

    img {
      margin-right: 5px;
      border-radius: 5px;
      width: 34px;
      height: 34px;
    }
  }

  :deep(.el-menu) {
    transition: all 0.3s ease;
  }

  :deep(.el-menu--vertical) {
    margin-top: 60px;
    border: 0 !important;
    width: 250px;
    transition: all 0.3s ease;
  }

  :deep(.el-menu--collapse) {
    width: 70px;
  }

  :deep(.el-drawer) {
    .el-drawer__body {
      padding: 0;
      background-color: #304156;

      > .el-menu--vertical {
        width: 150px !important;
      }
    }
  }
}
</style>
