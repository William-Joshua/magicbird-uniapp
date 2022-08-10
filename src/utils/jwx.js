// 开发文档 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

export function isWxBrowser() {
  // #ifdef H5
  if (!window.wx) {
    return false
  }
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    const system = {
      win: false,
      mac: false
    }
    // 检测平台
    const p = window.navigator.platform
    system.win = p.indexOf('Win') === 0
    system.mac = p.indexOf('Mac') === 0
    if (system.win || system.mac) {
      console.log('在微信PC端上打开内置浏览器')
    } else {
      console.log('非微信PC端上打开内置浏览器')
    }
    return true
  } else {
    return false
  }
  // #endif
  return false
}

/**
 * 微信授权结束后返回原页面必须调用该方法
 * 可alert(history.lenth)可查看整个授权过程，得出返回逻辑
 */
export function fuckWx(back, moreBack) {
  // #ifdef H5
  const urlKey = 'wxOauthHisLength'
  const currentLenth = history.length
  if (back) {
    const oldLenth = sessionStorage.getItem(urlKey)
    sessionStorage.removeItem(urlKey)
    if (moreBack) {
      history.go(oldLenth - currentLenth - moreBack)
    } else {
      history.go(oldLenth - currentLenth)
    }
  } else {
    sessionStorage.setItem(urlKey, currentLenth)
  }
  // #endif
}

/**
 * 微信公众号登录, 推荐除底栏等自定义跳转地址，不需要填写redirect_uri
 * 可用history.lenth查看当前页授权过程
 */
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
export function goWxOauthUrl(appid, scope, redirect_uri) {
  // #ifdef H5
  if (isWxBrowser()) {
    fuckWx()
    if (!redirect_uri) {
      redirect_uri = encodeURIComponent(document.location.href) // 微信浏览器本地调试请开启外网映射
    }
    const wxOauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
			redirect_uri +
			'&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect'

    // 重新跳转到该页
    document.location.replace(wxOauthUrl)
  }
  // #endif
}

// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#1
export function initJssdkConfig(wxConfig) {
  if (isWxBrowser()) {
    window.wx.config({
      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      debug: wxConfig.debug || false,
      appId: wxConfig.appId, // 必填，公众号的唯一标识
      timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
      nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
      signature: wxConfig.signature, // 必填，签名
      jsApiList: wxConfig.jsApiList || [
        'checkJsApi', // 判断当前客户端版本是否支持指定JS接口
        'updateAppMessageShareData', // 分享给朋友，需放在ready中
        'updateTimelineShareData', // 分享到朋友圈，需放在ready中
        'getLocation', // 获取位置
        'openLocation', // 打开位置
        'scanQRCode', // 扫一扫接口
        'chooseWXPay', // 微信支付
        'hideAllNonBaseMenuItem', // 隐藏所有非基础按钮接口: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#64
        'showAllNonBaseMenuItem',
        'hideMenuItems', // 只能隐藏“传播类”和“保护类”按钮
        'showMenuItems'
      ], // 必填，需要使用的JS接口列表
      openTagList: wxConfig.openTagList || [
        'wx-open-launch-weapp',
        'wx-open-launch-app',
        'wx-open-subscribe' // 服务号订阅通知 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html#23
      ] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
    })
  }
}

export function hideAllNonBaseMenuItem() { // 隐藏所有非基础按钮接口：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#47
  if (isWxBrowser()) {
    window.wx.ready(function() { // 需在用户可能点击分享按钮前就先调用
      window.wx.hideAllNonBaseMenuItem()
    })
  }
}

export function closeWindow() {
  if (isWxBrowser()) {
    window.wx.closeWindow()
  }
}
