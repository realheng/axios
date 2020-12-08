import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get', {
    cancelToken: source.token,
    data: {
      a: 2
    }
  })
  .catch(function catch1 (e) {
    console.log(Date.now(), '~~~~1')
    if (axios.isCancel(e)) {
      console.log('11111111111Request canceled', e.message)
    }
  })

setTimeout(() => {
  // cancel执行过后 cancelToken.promise状态被决议
  // 不过需要等待微任务执行阶段才能执行回调
  // this.promise.resolve
  // reject(reason)
  //

  Promise.resolve('hhh').then(() => {
    console.log('1 tick')
  })

  Promise.resolve('hhh')
    .then()
    .then(() => {
      console.log('2 tick')
    })

  source.cancel('Operation canceled by the user.')
  // cancel 之后执行resolvePromise(this.reason) 1 tick
  // 随后继续执行 reject(reason) 2 tick

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function catch2 (e) {
    console.log(Date.now(), '~~~~2')
    if (axios.isCancel(e)) {
      console.log('22222222', e.message)
    }
  })
  // promise.then(dispatcher) 一个tick
  //

  Promise.resolve('hhh')
    .then()
    .then()
    .then(() => {
      console.log('3 tick')
    })

  Promise.resolve('hhh')
    .then()
    .then()
    .then()
    .then(() => {
      console.log('4 tick')
    })

  Promise.resolve('hhh')
    .then()
    .then()
    .then()
    .then()
    .then(() => {
      console.log('5 tick')
    })

  console.log('sync')
}, 100)

// 2222 Operation canceled by the user.
// Request canceled1111 Operation canceled by the user.
// 333Request canceled

// 为什么222 在111前面呢?
// 我们知道promise.then()注册的回调函数是等到promise的状态被决议的时候才执行的,而且决议完之后还需要等待微任务的执行才会被执行
//
