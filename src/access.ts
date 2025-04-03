import { message } from 'ant-design-vue'
import router from './router'
import { useLoginUserStore } from './stores/useLoginUserStore'
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取登录用户信息
  const loginUserStore = useLoginUserStore()
  const loginUser = loginUserStore.loginUser
  const toUrl = to.fullPath
  if (toUrl.startsWith('admin')) {
    if (!loginUser || loginUser.userRole != 1) {
      message.error('无权限访问')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  message.success('跳转成功')
  next()
})
