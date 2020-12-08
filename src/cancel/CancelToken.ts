import { CancelExecutor, CancelTokenSource, Canceler } from './../types/index'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  static source(): CancelTokenSource {
    let cancel: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel,
      token
    }
  }

  constructor(executor: CancelExecutor) {
    // 传入的executor是一个函数,executor接受一个函数fn作为参数
    // fn的作用就是resolve promise的状态
    // executor的作用感觉就是将fn 赋值给其他变量,然后执行fn使cancelToken的promise状态变更,执行then注册的回调
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
}
