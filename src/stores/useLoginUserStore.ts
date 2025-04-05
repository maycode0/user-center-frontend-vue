import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCurrentUser } from '@/api/user'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    username: '未登录',
    id: null,
  })

  async function fetchLoginUser() {
    const res = await getCurrentUser()
    console.log('-------------')
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data
    }
  }

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  return { loginUser, setLoginUser, fetchLoginUser }
})
