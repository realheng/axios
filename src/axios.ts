import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types/index'
import Axios from './core/Axios'
import { extend } from './utils/common'
import defaults from './defaults'

// 创建一个拥有一系列请求方法的函数
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(config)
}

export default axios
