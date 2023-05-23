<template>
  <div class="login">
    <div class="login-wrap">
      <LoginForm />
      <div class="overlay-wrap">
        <div class="overlay">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './cpns/login-form.vue'
</script>

<style>
@media screen and (max-width: 800px) {
  .overlay-wrap {
    display: none !important;
  }
}

@media screen and (max-width: 500px) {
  .login-wrap {
    min-height: 420px !important;
  }
}
</style>

<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100vh;
  background: #f6f5f7;
  font-family: Montserrat, sans-serif;
  transition: all 0.3s ease;

  .login-wrap {
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    min-height: 480px;
    background-color: #fff;
    box-shadow: var(--el-box-shadow);
    transition: all 0.3s ease;
  }

  .overlay-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 10px;
    background-color: #5a9cf8;
    background-image: linear-gradient(90deg, #5a9cf8 0%, #acd2ff 100%);
    text-align: center;
    font-weight: 100;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0.5px;
  }
}
</style>
