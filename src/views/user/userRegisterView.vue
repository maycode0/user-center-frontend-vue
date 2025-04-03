<template>
  <div id="userloginview">
    <h2 class="title">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      :model="formState"
      name="basic"
      :label-col="{ span: 4 }"
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
        <a-input-password
          v-model:value="formState.password"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="checkpassword"
        :rules="[
          {
            required: true,
            message: '请输入密码',
          },
          {
            min: 8,
            message: '确认密码不能小于8位',
          },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkpassword"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

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
// 引入用户全局状态store
// const loginUserStore = useLoginUserStore()

// 引用路由
const router = useRouter()
const onFinish = (values: unknown) => {
  const res = { code: 0, data: 'success' }

  if (formState.password != formState.checkpassword) {
    message.error('两次密码不一致！')
    return
  }
  if (res.code == 0 && res.data == 'success') {
    console.log('Success:', values)
    message.success('注册成功')
    router.push({
      path: '/user/login',
      replace: true,
    })
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
</style>
