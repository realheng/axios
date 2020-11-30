import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './utils/url'

// axios做一些参数处理和请求转发的工作
// 具体逻辑在xhr中完成,xhr主要就是完成请求的发送和接收
export function axios(config: AxiosRequestConfig) {
  // 处理config中的数据,将config整个传入
  processConfig(config)
  console.log('config: ', config)
  // 转发请求给xhr函数
  xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  // 现阶段只有处理url,后续会加入其它的数据处理
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig) {
  // 从传入的config里面取出需要的值传入buildURL中
  const { url, params } = config
  return buildURL(url, params)
}

export default axios
