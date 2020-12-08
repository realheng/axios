import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../utils/common'

const strats: any = {}

export default function mergeConfig(
  defaultConfig: AxiosRequestConfig,
  customConfig?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!customConfig) {
    customConfig = {}
  }

  const mergedConfig = Object.create(null)

  for (const key in customConfig) {
    if (customConfig.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  for (const key in defaultConfig) {
    if (!customConfig.hasOwnProperty(key)) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    mergedConfig[key] = strat(defaultConfig[key], customConfig[key])
  }

  return mergedConfig
}

// 默认合并方法,val2有值就用,妹值就用val1
function defaultStrat(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1
}

// 只接受自定义值的策略
// 保持接口一致方便统一处理,虽然val1不会使用
function fromVal2Strat(val: any, val2: any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// url params data我们无法设定默认值,只能每次从自定义的配置中读取
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// 复杂对象合并策略
function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== undefined) {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
