import UserManageView from '@/views/admin/userManageView.vue'
import HomeView from '@/views/HomeView.vue'
import UserLoginView from '@/views/user/userLoginView.vue'
import UserRegisterView from '@/views/user/userRegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: 'userLogin',
      component: UserLoginView,
    },
    {
      path: '/user/register',
      name: 'userRegiste',
      component: UserRegisterView,
    },
    {
      path: '/admin/userManage',
      name: 'adminUserManag',
      component: UserManageView,
    },
  ],
})

export default router
