import { message } from 'ant-design-vue'
import router from '../router'
import { useLoginUserStore } from '../stores/useLoginUserStore'

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取登录用户信息
  console.log('路由守卫运行....')
  const loginUserStore = useLoginUserStore()
  loginUserStore.fetchLoginUser()
  const toUrl = to.fullPath

  const loginUser = loginUserStore.loginUser
  if (toUrl.startsWith('/user/home')) {
    if (loginUser.username === '未登录') {
      message.error('未登录')
      next('/user/login')
      return
    }
  }

  if (toUrl.startsWith('/admin/userManage')) {
    if (loginUser.username === '未登录') {
      message.error(loginUser.username)
      return next('/user/login')
    }
    if (loginUser.userRole != 0) {
      message.error('无权限访问')
      next(from.fullPath)
      return
    }
  }
  next()
})
