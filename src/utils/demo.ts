// src/utils/request.ts
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type Canceler,
} from 'axios'

// 定义接口返回数据的统一格式
interface ResponseData<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

// 定义扩展的请求配置
interface RequestConfig extends AxiosRequestConfig {
  // 是否显示全局loading
  loading?: boolean
  // 是否显示错误提示
  showError?: boolean
  // 是否取消重复请求
  cancelDuplicate?: boolean
  // 请求标识
  requestId?: string
}

// 取消请求的Map
const cancelRequestMap = new Map<string, Canceler>()

class Request {
  private instance: AxiosInstance
  private readonly options: RequestConfig

  constructor(options: RequestConfig = {}) {
    this.options = options
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000, // 默认10秒超时
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      ...options,
    })

    this.setupInterceptors()
  }

  // 设置拦截器
  private setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 处理取消请求
        if (config.cancelDuplicate) {
          const requestId =
            config.requestId || `${config.url}_${JSON.stringify(config.data)}`
          if (cancelRequestMap.has(requestId)) {
            const cancel = cancelRequestMap.get(requestId)
            cancel?.()
            cancelRequestMap.delete(requestId)
          }
          config.cancelToken = new axios.CancelToken((cancel) => {
            cancelRequestMap.set(requestId, cancel)
          })
        }

        // 添加token
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 显示loading
        if (config.loading) {
          // 这里可以调用全局loading显示方法
          console.log('show loading')
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseData>) => {
        const { config, data } = response

        // 处理取消请求
        if (config.cancelDuplicate) {
          const requestId =
            config.requestId || `${config.url}_${JSON.stringify(config.data)}`
          cancelRequestMap.delete(requestId)
        }

        // 隐藏loading
        if (config.loading) {
          // 这里可以调用全局loading隐藏方法
          console.log('hide loading')
        }

        // 业务逻辑处理
        if (data.code === 200) {
          return data.data
        } else {
          // 业务错误处理
          if (config.showError !== false) {
            this.handleBusinessError(data.code, data.message)
          }
          return Promise.reject(data)
        }
      },
      (error) => {
        // 隐藏loading
        if (error.config?.loading) {
          console.log('hide loading')
        }

        // 处理取消请求
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message)
          return Promise.reject(error)
        }

        // HTTP错误处理
        if (error.response) {
          this.handleHttpError(error.response.status)
        } else if (error.request) {
          // 请求已发出但没有收到响应
          this.handleNetworkError()
        } else {
          // 请求未发出
          console.error('Request Error:', error.message)
        }

        return Promise.reject(error)
      }
    )
  }

  // 业务错误处理
  private handleBusinessError(code: number, message: string) {
    switch (code) {
      case 401:
        // token过期处理
        console.error('登录过期，请重新登录')
        // 跳转到登录页
        break
      case 403:
        console.error('没有权限访问')
        break
      default:
        console.error(message || `业务错误: ${code}`)
    }
  }

  // HTTP错误处理
  private handleHttpError(status: number) {
    let message = ''
    switch (status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
        break
      case 403:
        message = '拒绝访问(403)'
        break
      case 404:
        message = '请求出错(404)'
        break
      case 408:
        message = '请求超时(408)'
        break
      case 500:
        message = '服务器错误(500)'
        break
      case 501:
        message = '服务未实现(501)'
        break
      case 502:
        message = '网络错误(502)'
        break
      case 503:
        message = '服务不可用(503)'
        break
      case 504:
        message = '网络超时(504)'
        break
      case 505:
        message = 'HTTP版本不受支持(505)'
        break
      default:
        message = `连接出错(${status})!`
    }
    console.error(message)
  }

  // 网络错误处理
  private handleNetworkError() {
    console.error('网络异常，请检查网络是否正常连接')
  }

  // 通用请求方法
  public request<T = any>(config: RequestConfig): Promise<T> {
    return this.instance.request(config)
  }

  // GET请求
  public get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  // POST请求
  public post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  // PUT请求
  public put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  // DELETE请求
  public delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  // 取消所有请求
  public cancelAllRequests() {
    cancelRequestMap.forEach((cancel) => {
      cancel()
    })
    cancelRequestMap.clear()
  }

  // 取消指定请求
  public cancelRequest(requestId: string) {
    if (cancelRequestMap.has(requestId)) {
      const cancel = cancelRequestMap.get(requestId)
      cancel?.()
      cancelRequestMap.delete(requestId)
    }
  }
}

// 创建请求实例
const request = new Request({
  // 全局默认配置
  showError: true, // 默认显示错误提示
  cancelDuplicate: true, // 默认取消重复请求
})

export default request
