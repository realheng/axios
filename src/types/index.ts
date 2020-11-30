export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  // 这个是将来要拼到query string中的
  params?: any
  headers?: any
}

// 定义一些可能出现的方法
// type可以定义一些联合类型,而interface不可以
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
