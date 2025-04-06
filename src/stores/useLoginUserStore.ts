import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCurrentUser } from '@/api/user'

// 配置用户返回信息接口
interface userInfo {
  username: string
  id?: number
  userRole?: number
}

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<userInfo>({
    username: '未登录',
  })

  async function fetchLoginUser() {
    console.log('fetchLoginUser')
    const res = await getCurrentUser()
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data
      console.log('登录后' + loginUser.value.username)
    }
  }

  // function setLoginUser(newLoginUser: any) {
  //   loginUser.value = newLoginUser
  // }

  return { loginUser, fetchLoginUser }
})
