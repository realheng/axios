import { isDate, isPlainObject } from './common'

function encode(val: string) {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 将params中的key和value根据一些规则拼接到url中
export function buildURL(url: string, params?: any) {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val == null) {
      // 忽略空值
      return
    }
    // 因为如果val是数组的话
    // 例如foo:['bar','baz'] 这种情况
    // 就需要转换为?foo[]='bar'&foo[]='baz'
    // 所以为了兼容这种情况,所有的普通参数都需要转换为数组
    let values: string[]

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        // 如果值是日期的话就toString()
        val = val.toString()
      }
      if (isPlainObject(val)) {
        // 如果值是一个普通对象的话就stringify
        val = JSON.stringify(val)
      }
      // 支持特殊字符
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 去掉hash,因为服务端是不会接受hash的
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 保留原始的参数
    url += url.indexOf('?') === -1 ? '?' : '&' + serializedParams
  }

  return url
}
