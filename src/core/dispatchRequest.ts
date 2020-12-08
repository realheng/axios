import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../utils/url'
import { transformRequest, transformResponse } from '../utils/data'
import { processHeaders, flattenHeaders } from '../utils/headers'
import transform from './transform'

// dispatchRequest做一些参数处理和请求转发的工作
// 具体逻辑在xhr中完成,xhr主要就是完成请求的发送和接收
export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 判断请求是否已经被取消了,如果取消了
  throwIfCancellationRequested(config)
  // 处理config中的数据,将config整个传入
  processConfig(config)
  // 转发请求给xhr函数
  return xhr(config).then(res => transformResponseData(res))
}

function processConfig(config: AxiosRequestConfig) {
  // 处理url,将params拼接到url中
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  // 扁平化headers
  config.headers = flattenHeaders(config.headers, config.method)
}

function transformURL(config: AxiosRequestConfig) {
  // 从传入的config里面取出需要的值传入buildURL中
  const { url, params } = config
  return buildURL(url, params)
}

function transformResponseData(res: AxiosResponse) {
  res.data = transformResponse(res.data)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default dispatchRequest
