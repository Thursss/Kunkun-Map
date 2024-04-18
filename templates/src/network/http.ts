import { AxiosRequestConfig } from 'axios'
import { request } from './'
type HttpConfig = { isCrypto?: boolean } & AxiosRequestConfig

export const http = (() => {
  let history: (string | undefined)[] = []

  return function <T>({ isCrypto = false, ...config }: HttpConfig) {
    const { url } = config

    if (history.includes(url)) {
      console.error('请求已提交')
      return
    }
    history.push(url)
    // TODO 加密
    // if (customOpt.isCrypto) {
    //   config.data = { data: encrypt(JSON.stringify(config.data)) }
    // }

    return <Promise<T>>request({
      ...config
    }).finally(() => {
      const idx = history.indexOf(url)
      history.splice(idx, 1)
    })
  }
})()

export const get = <T>(config: Omit<HttpConfig, 'method'>) => {
  return http<T>({ method: 'GET', ...config })
}

export const post = <T>(config: Omit<HttpConfig, 'method'>) => {
  return http<T>({ method: 'POST', ...config })
}
