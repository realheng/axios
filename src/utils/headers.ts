import { isPlainObject, deepMerge } from './common'
import { Method } from '../types'

// 将不符合规范的header name修改为标准的header name
function normalizeHeaderName(headers: any, normalizedName: string) {
  if (headers == null) {
    return
  }

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理请求的headers
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    // 如果data是一个普通对象且headers的content-type并没有设置,那么就需要设置一个默认值
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf8'
    }
  }

  return headers
}

export function parseHeaders(headers: string) {
  const parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(header => {
    let [key, value] = header.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
