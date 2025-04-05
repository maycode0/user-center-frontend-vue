// 配置全局环境
const env = import.meta.env.MODE || 'development'
const EnvConfig = {
  development: {
    apiBaseUrl: 'http://localhost:3000',
  },
  production: {
    apiBaseUrl: '',
  },
}

export default EnvConfig[env as 'development' | 'production']
