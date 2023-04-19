<template>
  <div class="header-tabs">
    <transition-group name="fade" tag="div" class="tabs">
      <div
        v-for="(item, index) in tabs"
        :key="item.path"
        class="tab-item"
        :class="{ 'tab-active': item.path === route.path }"
        :draggable="true"
        @click="tabClick(item.path, false)"
        @contextmenu.prevent="rightClick($event, item.path)"
        @dragenter.prevent="dragenter(index)"
        @dragover.prevent
        @dragstart="dragstart(index)"
      >
        <div v-show="item.path === route.path" class="circle"></div>
        <div class="content">{{ item.title }}</div>
        <div class="carbon:close hover:carbon:close-filled close-icon" @click.stop="tabRemove(item.path)"></div>
      </div>
    </transition-group>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="tabRemove()">关闭</li>
      <li @click="tabRemoveOther">关闭其他</li>
      <li @click="tabRemoveRight">关闭到右侧</li>
      <li @click="tabRemoveAll">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, RouteLocationRaw } from 'vue-router'

import { debounce } from '~/utils'

const { tabs, addTab, removeTab, removeOtherTab, removeRightTab, removeAllTab } = useStore('layout')

const route = useRoute()
const router = useRouter()

// 更新头部tabs
onBeforeRouteUpdate((to, from, next) => {
  const tab = { title: to.meta.name as string, path: to.path }
  addTab(tab)
  next()
})

// 切换tabs
const tabClick = (val: number | string = 0, delay = true) => {
  let path: RouteLocationRaw
  if (typeof val === 'number') path = tabs.value[val].path
  else path = val
  setTimeout(
    () => {
      router.push(path)
    },
    delay ? 200 : 0
  )
}

// tabs右键选项
const visible = ref(false)
const top = ref(0)
const left = ref(0)
let clickPath = ''
const rightClick = (e: { x: number; y: number }, path: string) => {
  clickPath = path
  left.value = e.x + 5
  top.value = e.y + 5
  visible.value = true
}
const closeMenu = () => {
  visible.value = false
}
const tabRemove = (path: string = clickPath) => {
  const index = tabs.value.findIndex((i: App.Tab) => i.path === path)
  removeTab(path)
  if (route.path === path) {
    const len = tabs.value.length - 1
    const nextTabIndex = index > len ? len : index
    tabClick(nextTabIndex, false)
  }
}
const tabRemoveOther = () => {
  removeOtherTab(clickPath)
  tabClick()
}
const tabRemoveRight = () => {
  removeRightTab(clickPath)
  if (tabs.value.every((i: App.Tab) => i.path !== route.path)) {
    tabClick(clickPath)
  }
}
const tabRemoveAll = () => {
  removeAllTab()
  tabClick()
}
watch(visible, (cur) => {
  if (cur) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

//tabs拖拽
let dragIndex = 0

const dragstart = (index: number) => {
  dragIndex = index
  closeMenu()
}

const dragenter = debounce(
  (index: number) => {
    if (dragIndex !== index) {
      const source = tabs.value[dragIndex]
      tabs.value.splice(dragIndex, 1)
      tabs.value.splice(index, 0, source)
      dragIndex = index
    }
  },
  { delay: 300 }
)
</script>

<style lang="less" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.header-tabs {
  box-sizing: border-box;
  padding: 5px;
  border-top: 1px solid var(--hyh-border-color);
  border-bottom: 1px solid var(--hyh-border-color);
  width: 100%;
  height: 40px;
  background: var(--hyh-bg-color);
  font-size: 12px;
  color: #666;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  .tabs {
    position: relative;
  }

  .tab-item {
    display: inline-block;
    position: relative;
    z-index: 999;
    margin: 0 3px;
    padding: 5px 20px;
    border: 1px solid var(--hyh-border-color);
    border-radius: 2px;
    background: var(--hyh-sub-bg);
    cursor: pointer;
    transition: all 0.5s ease;

    .circle {
      margin-right: 5px;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      background: #fff;
    }

    .circle,
    .content {
      display: inline-block;
      transition: transform 0.2s;
    }

    .close-icon {
      position: absolute;
      right: 0;
      top: 6px;
      opacity: 0;
      font-size: 14px;
      transition-property: opacity, transform;
      transition-duration: 0.2s, 0.2s;
    }

    &:hover {
      .circle,
      .content,
      .close-icon {
        transform: translateX(-7px);
      }

      .close-icon {
        opacity: 1;
      }
    }
  }

  .tab-active {
    border-color: #42b983;
    background: #42b983;
    color: #fff;
  }

  .contextmenu {
    position: absolute;
    z-index: 1000;
    list-style-type: none;
    margin: 0;
    padding: 5px 0;
    border-radius: 4px;
    background: var(--hyh-bg-color);
    box-shadow: var(--el-box-shadow-light);
    font-weight: 400;
    font-size: 12px;
    color: var(--hyh-sub-text-color);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      // eee
      &:hover {
        background: var(--hyh-sub-bg);
      }
    }
  }
}
</style>
