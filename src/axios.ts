import { AxiosInstance } from './types/index'
import Axios from './core/Axios'
import { extend } from './utils/common'

// 创建一个拥有一系列请求方法的函数
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
