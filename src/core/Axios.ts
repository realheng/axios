import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from './../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'

export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

// Axios是一个代理,扩展了一些好用的方法,但实际上还是调用的dispatchRequest,即之前的axios
export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig
  constructor(initialConfig: AxiosRequestConfig) {
    this.defaults = initialConfig
    // 初始化的时候生成拦截器对
    // 一个是request,一个是response
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  // 无论是用函数的形式还是面向对象的形式发起请求,最终请求的config都会经过request方法处理
  request(url: any, config?: AxiosRequestConfig) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: PromiseChain[] = [
      {
        // 使用拦截器之后所有config都会经过拦截器的处理,而不是像之前那样直接return dispatch(config)
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      // 请求拦截器是先进后出
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    const promise = Promise.resolve(config)

    return chain.reduce((result, interceptor) => {
      return result.then(interceptor.resolved, interceptor.rejected)
    }, promise)
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
