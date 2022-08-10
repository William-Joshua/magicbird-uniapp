import request from '/src/utils/request'
import { isWxBrowser } from '/src/utils/jwx'
import { chooseWXPay } from '/src/utils/payment'

/**
 * 获取微信公众号JS-TICKET
 */
export function getWxJsTicket(url) {
  const data = {
    url: url || document.location.href
  }
  return request.post('/wx/public/support/jsapi', data)
}

/**
 * 获取微信小程序分享二维码
 */
export function getMaQrCode() {
  const page = uni.$dy_tool.getCurrentRoute()
  const split = page.split('?')
  const data = {
    page: split[0],
    scene: split[1]
  }
  return request.post('/wx/public/support/qrcode', data)
}

/**
 * ================================小程序/app/公众号的微信登录================================
 */
/**
 * 微信小程序
 */
export function loginCode2session(params) {
  return request.get('/login/code2session', { params })
}

/**
 * APP微信登录
 */
export function loginCode2oauth2(params) {
  return request.get('/login/code2oauth2', { params })
}

/**
 * 微信公众号静默授权和手动授权
 * @param scope 授权方式 snsapi_base或snsapi_userinfo
 */
export function loginSnsapi(scope, params) {
  return request.get('/login/' + scope, { params })
}

/**
 * ================================小程序/app/公众号的微信支付================================
 */
/**
 * 微信支付
 * @param sn 订单号
 */
export function payByWx(sn, success, fail, cancel) {
  let platform = ''
  // #ifdef H5
  if (isWxBrowser()) {
    platform = 'H5'
  }
  // #endif
  // #ifdef MP-WEIXIN
  platform = 'MP-WEIXIN'
  // #endif
  // #ifdef APP-PLUS
  platform = 'APP'
  // #endif
  if (!platform) {
    // 不支持除微信浏览器外发起jsapi支付
    uni.showToast({
      title: '请在微信浏览器打开当前链接完成支付！',
      icon: 'none',
      duration: 800
    })
    return
  }
  const params = {
    sn: sn,
    platform: platform
  }
  request.get('pay/wxpay/transactions', { params }).then(res => {
    if (res.data) {
      chooseWXPay(res.data, success, fail, cancel)
    }
  }).catch(err => {
    uni.showToast({
      title: err,
      icon: 'none',
      duration: 800
    })
  })
}

export function payByUnion(params) {
  request.get('pay/umspay/h5ums', { params }).then(res => {
    uni.$dy_tool.openURL(res.data)
  })
}
