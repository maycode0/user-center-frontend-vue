<template>
  <div id="userloginview">
    <div class="loginCard">
      <h2 class="title">用户登录</h2>
      <a-form
        style="max-width: 480px"
        label-align="left"
        :model="formState"
        name="basic"
        :label-col="{ span: 6 }"
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

        <a-form-item :wrapper-col="{ offset: 10, span: 20 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { userLogin } from '@/api/user'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

// 表单需要数据接口
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

// 点击登录按钮action
const onFinish = async (data: FormState) => {
  const res = await userLogin(data)
  if (res.data.code === 201) {
    message.error(res.data.message)
    return
  }
  if (res.data.code === 1) {
    message.error('用户未注册')
    return
  } else if (res.data.code === 2) {
    message.error('密码错误')
    return
  } else {
    console.log(res)
    message.success('登录成功!')
    await loginUserStore.fetchLoginUser()
    router.push({
      path: '/user/home',
      replace: true,
    })
    return
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log(errorInfo)
}
</script>

<style scoped>
#userloginview .title {
  margin-bottom: 40px;
  margin-top: 30px;
}
.loginCard {
  background-color: white;
  margin: 0 auto;
  max-width: 500px;
  min-height: 300px;
  padding: 20px;
  /* border: 1px solid black; */
  border-radius: 10px;
  box-shadow: 0 0 10px white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
