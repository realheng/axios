const objectProto = Object.prototype

const toString = objectProto.toString

export function isObject(val: any): val is Object {
  return typeof val === 'object' && val
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  // 只能进行纯对象的拷贝,像其他的数组 函数啥的就不行
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // 如果是对象的话需要进行深度拷贝
        if (isPlainObject(val)) {
          // 如果result[key]为普通对象的话要和val进行深度合并
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
