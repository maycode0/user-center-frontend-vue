<template>
  <div id="userloginview">
    <h2 class="title">用户登录</h2>
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
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
// import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { userLogin } from '@/api/user'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface FormState {
  username: string
  password: string
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

// 引入用户全局状态store
const loginUserStore = useLoginUserStore()

// 引用路由
const router = useRouter()
const onFinish = async () => {
  const res = await userLogin(formState)
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser()
    console.log(loginUserStore.loginUser)
    message.success('登录成功')
    router.push({
      path: '/',
      replace: true,
    })
  } else if (res.data.code === 1) {
    message.error('未注册用户')
  } else {
    message.error('密码错误')
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
