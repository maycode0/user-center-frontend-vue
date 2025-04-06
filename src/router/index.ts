import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/home',
      name: 'home',
      component: import('@/views/common/HomeView.vue'),
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: import('@/views/user/userLoginView.vue'),
    },
    {
      path: '/user/register',
      name: 'userRegiste',
      component: import('@/views/user/userRegisterView.vue'),
    },
    {
      path: '/admin/userManage',
      name: 'adminUserManag',
      component: import('@/views/admin/userManageView.vue'),
    },
  ],
})

export default router
