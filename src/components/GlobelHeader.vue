<template>
  <div id="globelheader">
    <a-row :wrap="false">
      <a-col flex="150px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.png" alt="logo" />
          <div class="title">用户中心</div>
        </div></a-col
      >
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
      /></a-col>
      <a-col flex="150px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            {{ loginUserStore.loginUser.username }}
            <a-button
              type="primary"
              danger
              @click="doQuit"
              style="margin-left: 10px"
              >退出</a-button
            >
          </div>
          <div v-else>
            <a-button type="primary" @click="doLogin">登录</a-button>
          </div>
        </div></a-col
      >
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { CrownOutlined, HomeOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { userLogout } from '@/api/user'
const loginUserStore = useLoginUserStore()
const router = useRouter()
const doLogin = () => {
  router.push({
    path: '/user/login',
  })
}
const doQuit = () => {
  userLogout()
  loginUserStore.loginUser = {
    username: '未登录',
    id: null,
  }
  router.push({
    path: '/user/login',
  })
}
// 点击菜单实现路由跳转
const doMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key })
}
router.afterEach((to) => {
  current.value = [to.path]
})
const current = ref<string[]>(['home'])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/user/login',
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '/user/register',
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '/admin/userManage',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: 'others',
    label: h(
      'a',
      {
        href: 'https://www.codefather.cn',
        target: '_blank',
      },
      '编程导航'
    ),
    title: '编程导航',
  },
])
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
:deep(.user-login-status) {
  display: flex;
  flex-grow: 1;
}
</style>
