import { message } from 'ant-design-vue'
import router from './router'
import { useLoginUserStore } from './stores/useLoginUserStore'
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 获取登录用户信息
  const loginUserStore = useLoginUserStore()
  const loginUser = loginUserStore.loginUser
  const toUrl = to.fullPath
  if (toUrl.startsWith('/user/login')) {
    console.log('尝试进入登录页')
    if (loginUser.username != '未登录') {
      message.success('已登录')
      next(from.fullPath)
      return
    }
  }
  if (toUrl.startsWith('/admin/userManage')) {
    console.log('尝试进入admin页面')
    console.log(loginUser)
    if (!loginUser || loginUser.userRole != 0) {
      message.error('无权限访问')
      // console.log(from.fullPath)
      next(from.fullPath)
      return
    }
  }
  // message.success('跳转成功')
  next()
})
