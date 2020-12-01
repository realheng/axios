# 写代码时的一些要点
1. 拼接url的时候需要去掉hash,一是为了正常拼接,而是因为服务器也不支持hash
2. express的bodyparser和urlencoded都是通过req.headers的content-type来判断是否要处理数据,处理好的数据放到req.body上面
3. xhr.send(data),data要么是null,如果是普通对象就要我们手动序列化并且设置content-type:application/json;charset=utf8.其他的数据格式就让浏览器自己解决
4. 异步的事件用promise包裹之后更好处理逻辑,所以xhr需要返回一个promise
5. 
