import * as apis from '@uni/apis'

import http from '/src/utils/request'
import * as dy_tool from '/src/utils'
import uView from 'vk-uview-ui'
import Vue2Verify from './dy-verify/dy-verify.vue'
// #ifdef H5
// import weixinJsSdk from 'https://cdn.skypack.dev/weixin-js-sdk'
import weixinJsSdk from '../static/cdn/weixin-js-sdk'
// #endif

export function registerGlobComp(app) {
  // 全局对象挂载
  uni.$apis = apis
  uni.$dy_tool = dy_tool
  app.config.globalProperties.$dy_tool = dy_tool
  uni.$dy_http = http
  app.config.globalProperties.$dy_http = http
  // #ifdef H5
  window.wx = weixinJsSdk
  // #endif
  // 全局组件挂载
  registerUview3(app)
}

function registerUview3(app) {
  app.use(uView)
  app.component('DyVerify', Vue2Verify)
}
