<template>
  <div id="userloginview">
    <div class="registerCard">
      <h2 class="title">用户注册</h2>
      <a-form
        style="max-width: 480px"
        label-align="left"
        :model="formState"
        name="basic"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[
            {
              required: true,
              message: '请输入密码',
            },
            {
              min: 8,
              message: '密码不能小于8位',
            },
          ]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="确认密码"
          name="checkpassword"
          :rules="[
            {
              required: true,
              message: '请输入确认密码',
            },
            {
              min: 8,
              message: '确认密码不能小于8位',
            },
          ]"
        >
          <a-input-password v-model:value="formState.checkpassword" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 10, span: 20 }">
          <a-button type="primary" html-type="submit">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { reactive } from 'vue'

interface FormState {
  username: string
  password: string
  checkpassword: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  checkpassword: '',
})

// values:form表单的值
const onFinish = (values: FormState) => {
  if (values.password != values.checkpassword) {
    message.error('两次密码不一致！')
    return
  }
}
const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo)
}
</script>
<style scoped>
#userloginview .title {
  text-align: center;
  margin-bottom: 20px;
}

.registerCard {
  background-color: white;
  margin: 0 auto;
  max-width: 500px;
  min-height: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
