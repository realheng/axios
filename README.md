## 功能要点和原因
1. 拼接url的时候需要去掉hash,一是为了正常拼接,而是因为服务器也不支持hash
2. express的bodyparser和urlencoded都是通过req.headers的content-type来判断是否要处理数据,处理好的数据放到req.body上面
3. xhr.send(data),data要么是null,如果是普通对象就要我们手动序列化并且设置content-type:application/json;charset=utf8.其他的数据格式就让浏览器自己解决
4. 异步的事件用promise包裹之后更好处理逻辑,所以xhr需要返回一个promise
5. 如果xhr的responseType设置为了json,浏览器接受到数据之后会自动将字符串转换为json
6. axios函数重载更便于使用
7. 响应数据泛型可以让ts推断出数据类型,可以让我们更加方便的得知数据的类型然后做处理
8. 添加拦截器可以让用户在请求发送前和接收到响应之后对config和response做一些逻辑操作,拦截器有点类似express和koa里面的中间件
9. 拦截器的顺序是request拦截器先进后出,response拦截器先进先出
   1.  拦截器本质上就是拥有resolved和rejected方法对的对象,类似于promise的then方法注册的两个回调函数
   2.  拦截器管理器用来管理若干拦截器,它可以注册 删除 遍历拦截器对象
   3.  axios实例上面有一个interceptors属性,它是由request和response组成的对象,request是一个拦截器管理器,用来管理请求拦截器.response用来管理响应拦截器
   4.  dispatchRequest也是一个拦截器
10. 合并配置
    1.  添加默认配置用来和传入的配置进行合并
    2.  
   

