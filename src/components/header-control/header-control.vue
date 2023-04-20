<template>
  <div class="header-control">
    <Icon class="theme-icon" size="20px" :icon="icon" @click="toggleTheme" />
    <el-popover placement="bottom-start" :effect="theme" :width="50" trigger="hover" :teleported="false">
      <template #reference>
        <el-avatar :size="35" cursor-pointer src="http://124.71.138.107/logo.png" />
      </template>
      <ul class="header-control-menu">
        <li>你好! {{ userInfo.nickname }}</li>
        <li @click="logout">退出登录</li>
      </ul>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
const { logoutAction, userInfo } = useStore('user')
const { theme, toggleTheme, setBodyTheme } = useStore('layout')
const router = useRouter()
const logout = async () => {
  await logoutAction()
  router.replace('/login')
}

const icon = computed(() => (theme.value === 'dark' ? 'icon-park-solid:moon' : 'material-symbols:light-mode'))
</script>

<style lang="less" scoped>
.header-control {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;

  > * {
    margin-left: 20px;
  }

  .theme-icon {
    cursor: pointer;
    color: var(--hyh-text-color);
  }

  :deep(.el-popper) {
    padding: 0;
    border: 1px solid var(--hyh-border-color);
    min-width: 100px !important;
  }

  &-menu {
    width: 100px;
    background-color: var(--hyh-bg-color);
    user-select: none;

    li {
      cursor: pointer;
      line-height: 30px;
      text-align: center;
      transition: all 0.3s ease;
    }

    li:not(li:nth-child(1)) {
      border-top: 1px solid var(--hyh-border-color);

      &:hover {
        color: #5a9cf8;
      }
    }
  }
}
</style>
