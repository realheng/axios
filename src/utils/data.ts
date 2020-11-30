import { isPlainObject } from './common'

export function transformRequest(data: any) {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
