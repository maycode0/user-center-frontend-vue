import myAxios from '@/utils/request'

/**
 * 用户注册
 * @param params
 */
export const userRegister = async (params: unknown) => {
  return myAxios.request({
    url: '/api/user/register',
    method: 'POST',
    data: params,
  })
}

/**
 * 用户登录
 * @param params
 */
export const userLogin = async (params: unknown) => {
  return myAxios.request({
    url: 'http://localhost:3000/api/user/login',
    method: 'POST',
    data: params,
  })
}

/**
 * 用户注销
 * @param params
 */
export const userLogout = async () => {
  return myAxios.request({
    url: '/api/user/logout',
    method: 'POST',
    // data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

/**
 * 获取当前用户
 */
export const getCurrentUser = async () => {
  return myAxios.request({
    url: 'http://localhost:3000/api/user/current',
    method: 'GET',
  })
}

/**
 * 获取用户列表
 * @param username
 */
export const searchUsers = async (username: unknown) => {
  return myAxios.request({
    url: '/api/user/search',
    method: 'GET',
    params: {
      username,
    },
  })
}

/**
 * 删除用户
 * @param id
 */
export const deleteUser = async (id: string) => {
  return myAxios.request({
    url: '/api/user/delete',
    method: 'POST',
    data: id,
    // 关键点：要传递 JSON 格式的值
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
