<template>
  <div class="header-control">
    <el-popover placement="bottom-start" :width="50" trigger="hover" :teleported="false">
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
const router = useRouter()
const logout = async () => {
  logoutAction()
  router.replace('/login')
}
</script>

<style lang="less" scoped>
.header-control {
  padding-right: 20px;

  :deep(.el-popper) {
    padding: 0;
    min-width: 100px !important;
  }

  &-menu {
    margin: 3px 0;
    width: 100px;
    user-select: none;

    li {
      cursor: pointer;
      line-height: 30px;
      text-align: center;
      transition: all 0.3s ease;
    }

    li:not(li:nth-child(1)) {
      border-top: 1px solid #eee;

      &:hover {
        background: #5a9cf8;
        color: white;
      }
    }
  }
}
</style>
