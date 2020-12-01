import { AxiosRequestConfig, AxiosPromise } from './types/index'
import xhr from './xhr'
import { buildURL } from './utils/url'
import { isPlainObject } from './utils/common'
import { transformRequest } from './utils/data'
import { processHeaders } from './utils/headers'

// axios做一些参数处理和请求转发的工作
// 具体逻辑在xhr中完成,xhr主要就是完成请求的发送和接收
export function axios(config: AxiosRequestConfig): AxiosPromise {
  // 处理config中的数据,将config整个传入
  processConfig(config)
  // 转发请求给xhr函数
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  // 处理url,将params拼接到url中
  config.url = transformURL(config)
  // 因为headers依赖data,所以headers要在data的前面进行处理
  config.headers = transformHeaders(config)
  // 处理data,将普通对象序列化,其它对象保留
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig) {
  // 从传入的config里面取出需要的值传入buildURL中
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  // 给headers设置一个默认值,使其不为空
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
