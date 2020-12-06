import { AxiosRequestConfig, AxiosPromise, Method } from './../types/index'
import dispatchRequest from './dispatchRequest'

// Axios是一个代理,扩展了一些好用的方法,但实际上还是调用的dispatchRequest,即之前的axios
export default class Axios {
  request(url: any, config?: AxiosRequestConfig) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    // 无论request的参数个数是几个,使用的时候都是用一个config
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig) {
    this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig) {
    this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url }))
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, { method, url, data }))
  }
}
