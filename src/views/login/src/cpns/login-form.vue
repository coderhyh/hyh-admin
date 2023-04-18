<template>
  <div class="login-form">
    <section>
      <h1>Log in</h1>
      <span>or use your account</span>
    </section>
    <HyhForm v-bind="{ formConfig, formRules }" ref="formRef" v-model="formData" @on-submit="handlerSubmit">
      <template #footer>
        <button type="submit" @click="handlerSubmit">Log in</button>
      </template>
    </HyhForm>
  </div>
</template>

<script setup lang="ts">
import type HyhForm from '~/base-ui/hyh-form'

import { formConfig, formRules } from '../config'

const global = getCurrentInstance()?.proxy
const { loginAction } = useStore('user')
const router = useRouter()

const formRef = ref<InstanceType<typeof HyhForm>>()

const formData = ref({
  username: '',
  password: ''
})

const handlerSubmit = async () => {
  const form = formRef.value?.getFormRef()

  const validateRes = await form?.validate()
  if (validateRes) {
    try {
      await loginAction(formData.value)
      router.replace('/')
    } catch (error) {
      global?.$message((<{ message: string }>error).message, 'error')
    }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 384px;

  section {
    margin-bottom: 20px;

    h1 {
      margin: 0;
      font-family: Montserrat, sans-serif;
      font-weight: bold;
    }

    span {
      font-size: 12px;
    }
  }

  button {
    margin: 10px auto 0;
    padding: 12px 45px;
    border: 1px solid #517de4;
    border-radius: 20px;
    background-color: #517de4;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
    color: #fff;
    letter-spacing: 1px;
    transition: transform 0.8s ease-in;
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }
}
</style>
