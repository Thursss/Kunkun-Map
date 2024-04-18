import axios from 'axios'

export const request = axios.create({
  baseURL: '', // 基础服务地址，这个值会被添加到实际请求 URL 的前面
  timeout: 5 * 1000, // 超时时间 单位是毫秒
  headers: {
    // 请求头设置 可以设置全局或特定的headers
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截
request.interceptors.request.use((config) => {
  return config
})

// 响应拦截
request.interceptors.response.use(
  ({ status, data }) => {
    switch (status) {
      case 200:
        return data
      case 404:
        return data

      default:
        break
    }
  },
  (error) => {
    //   ElMessage({ type: 'error', message, duration:1000 })
    console.error(error)
  }
)
