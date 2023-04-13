<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <Icon :icon="menu.meta?.icon" size="30" />
        <span>{{ menu.meta?.name }}</span>
      </template>
      <TreeMenu :menu-list="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <Icon :icon="menu.meta?.icon" size="30" />
      <template #title>{{ menu.meta?.name }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'
withDefaults(
  defineProps<{
    menuList?: RouteRecordRaw[]
  }>(),
  { menuList: () => [] }
)
</script>

<style lang="less" scoped></style>
