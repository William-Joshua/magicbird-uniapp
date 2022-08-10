## 初始化项目

vue3版本，请保证HBuilderX为最新版本
```
npm install
```

H5转uni-app开发参考：[https://ask.dcloud.net.cn/article/36174](https://ask.dcloud.net.cn/article/36174)

演示地址(vue3版本)：[http://uview.rbzshop.com/](http://uview.rbzshop.com/ "http://uview.rbzshop.com/")

只做了简单的集成：包括
- [存储](https://vueuse.org/useStorage "存储")
- [统一请求](https://www.quanzhan.co/luch-request "统一请求")
- [H5开发跨域](https://juejin.cn/post/6844904063855755271 "H5开发跨域")
- [H5微信公众号登录](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html "H5微信公众号登录")
- [H5微信公众号jweixin](https://ask.dcloud.net.cn/article/35380 "H5微信公众号jweixin")


### 相关链接
- tmui官网：[https://jx2d.cn/](https://jx2d.cn/)
- UNI-UI: [https://uniapp.dcloud.io/component/README?id=uniui](https://uniapp.dcloud.io/component/README?id=uniui)
- ColorUI: [https://gitee.com/weilanwl/ColorUI](https://gitee.com/weilanwl/ColorUI)
- mica （Spring Cloud核心开发包）：[https://gitee.com/596392912/mica](https://gitee.com/596392912/mica)
- SpringBlade （企业级开发平台）：[https://gitee.com/smallc/SpringBlade](https://gitee.com/smallc/SpringBlade)
- 配套vite + mica后端： [https://gitee.com/mymx2/RuoYi-Vue](https://gitee.com/mymx2/RuoYi-Vue)

### 用户登录及接口请求

1. 页面强制登录
   - 完全需要登录才能访问的页面，需要做页面强制登录，做页面整体显示隐藏判断，并在加载时判断是否跳转到登录页。
2. 按钮点击登录
   - 需要登录的接口在按钮点击后跳转到登录页面。
3. 请求不登录不发送
   - 有的页面部分接口需要登录，部分不需要登录，为防止开发未作登录判断请求了需要登录的接口，需要api防护。

做法优先级 3 > 2 > 1。
