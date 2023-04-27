<template>
  <div class="crumbs">
    <Icon
      class="crumbs-icon"
      :icon="isCollapse ? 'foundation-indent-less' : 'foundation-indent-more'"
      size="30px"
      @click="updateCollapse"
    />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">控制台</el-breadcrumb-item>
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadcrumbArr" :key="item.path" :to="item.children ? '' : item.path">
          {{ item.meta?.name }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'

import { DEVICE } from '~/global/mapDeviceSize'
import { routes } from '~/router/routes'
const { isCollapse, winSize: size } = useStore('layout')
const route = useRoute()

const layoutChildren = routes[0].children

const updateCollapse = () => {
  isCollapse.value = !isCollapse.value
  if (isCollapse.value) {
    size.value = window.innerWidth > DEVICE.ipad ? 600 : window.innerWidth
  } else {
    size.value = DEVICE.ipad + 1
  }
}

const breadcrumbArr = computed((): RouteRecordRaw[] => {
  const currentRouteName = route.meta.name
  const currentRouteObj = getTreeParent(layoutChildren!, currentRouteName)
  const currentRoute: RouteRecordRaw[] = readNodes(currentRouteObj, route.meta?.name as string)
  return currentRoute.filter((i) => i.meta?.name !== '控制台')
})

function getTreeParent(list: RouteRecordRaw[], target: unknown): RouteRecordRaw {
  return list.find(
    (i) => i.meta?.name === target || (i.children && getTreeParent(i.children, target))
  ) as RouteRecordRaw
}

function readNodes(node: RouteRecordRaw, target = ''): RouteRecordRaw[] {
  const arr: RouteRecordRaw[] = []
  const foo = (node: RouteRecordRaw) => {
    if (node.meta?.name === target) {
      return arr.push(node)
    } else if (node.children && node.children.length > 0) {
      for (const item of node.children) {
        if (foo(item)) {
          return arr.unshift(node)
        }
      }
    }
    return false
  }
  foo(node)
  return arr
}
</script>

<style lang="less" scoped>
.crumbs {
  display: flex;
  align-items: center;
  min-width: 330px;
  height: 60px;

  &-icon {
    margin-right: 20px;
    padding: 15px;
    cursor: pointer;
    color: var(--hyh-text-color);
    transition: all 0.3s;

    &:hover {
      background: rgb(0 0 0 / 10%);
    }
  }
}
</style>
