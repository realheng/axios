import { ResolvedFn, RejectedFn } from './../types'

// 拦截器本质上是一个拥有一对onFulfilled和onRejected方法的对象
// 泛型T用来表明使用onFulfilled时的val类型
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器管理器用来管理拦截器,里面有一个拦截器数组用来存放注册的拦截器
// use方法用来注册拦截器并且返回拦截器的下标用于删除
// eject方法用来删除拦截器,使其遍历的时候跳过
// forEach用于遍历拦截器
export default class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[]

  constructor() {
    this.interceptors = []
  }

  // 注册拦截器
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn) {
    this.interceptors.push({
      resolved,
      rejected
    })
    // 返回拦截器的下标用于删除
    return this.interceptors.length - 1
  }

  // 遍历拦截器
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor != null) {
        fn(interceptor)
      }
    })
  }

  // 删除拦截器
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
