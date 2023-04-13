<template>
  <div class="login">
    <main>
      <LoginForm></LoginForm>
    </main>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './cpns/login-form.vue'
</script>

<style scoped lang="less">
.login {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #8ec5fc;
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);

  main {
    margin: auto;
    border-radius: 10px;
    width: 500px;
    height: 400px;
    background: white;
  }
}
</style>
