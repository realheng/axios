import { isPlainObject } from './common'

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
