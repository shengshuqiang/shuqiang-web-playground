# shuqiang-web-playground
书强 Web 练兵场

# H5ServerDemo

[从手写到 ADB 配合 Whistle 捣鼓前后端极度舒适的调试环境](https://juejin.cn/post/7172575173961334797) 文章 Demo 演示代码

# pddwyb

直接从网页复制下来的本地拼多多 H5 代码

# iconfontDemo

从0到1设计一套“书强”体甲骨文实践

# 常用Whistle Rules命令

```
#过滤美团 http://local.whistlejs.com:8899/#network?url=/mall.meituan.com/
#过滤Owl上报 http://local.whistlejs.com:8899/#rules?url=/api/metric

# 后面规则覆盖前面规则

# 代理到本地 localhost
# https://www.baidu.com/ localhost:3000

# 代理到本地 html
# https://www.baidu.com/ file://${projectPath}/test/index.html

# 代理响应内容
# https://www.baidu.com/ resBody://{test.json}

# 代理
# https://www.baidu.com/ https://www.google.com.hk/

# 修改ua
# https://www.baidu.com/ ua://{ua}

# 自定义样式
# www.baidu.com style://color=@fff&fontStyle=italic&bgColor=red

# 代理资源
# https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman file://${projectPath}/test

# 跨域
# www.baidu.com resCors://*

# 移动端调试
# 注入 vConsole
# https://www.baidu.com/ jsPrepend://{vConsole.js}

# 打印日志
# https://www.baidu.com/  log://

# mock 接口返回

# 修改接口返回状态
# https://www.baidu.com/ statusCode://404

# 修改接口返回数据
# https://music.163.com/weapi/cloudsearch/get/web resBody://{netease.json}

# 模拟 5 秒超时
# www.baidu.com reqDelay://5000 enable://abort

# 模拟弱网
# www.baidu.com resSpeed://50
```