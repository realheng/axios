# 写代码时的一些要点
1. 拼接url的时候需要去掉hash,一是为了正常拼接,而是因为服务器也不支持hash
2. express的bodyparser和urlencoded都是通过req.headers的content-type来判断是否要处理数据,处理好的数据放到req.body上面
