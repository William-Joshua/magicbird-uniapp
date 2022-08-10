import { isWxBrowser } from './jwx'

/**
 * 微信支付：
 * 前端：
 * 	浏览器自带非v3: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
 * 	浏览器自带v3: https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml
 * 	js自带chooseWXPay: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#58
 * 后端：https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter1_1_1.shtml
 */
export function chooseWXPay(data, success, fail, cancel) {
  // #ifdef APP-PLUS
  // APP支付
  uni.requestPayment({
    provider: 'wxpay',
    orderInfo: {
      'appid': data.appId, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
      'noncestr': data.nonceStr, // 随机字符串
      'package': data.package, // 固定值
      'partnerid': data.partnerid, // 微信支付商户号
      'prepayid': data.prepayid, // 统一下单订单号
      'timestamp': data.timeStamp, // 时间戳（单位：秒）
      'sign': data.sign // 签名，这里用的 MD5 签名
    }, // 微信订单数据为Object 类型 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
    success: function(res) {
      success && success(res)
    },
    fail: function(err) {
      fail && fail(err)
    }
  })
  // #endif
  // #ifdef MP-WEIXIN
  // 微信小程序支付
  uni.requestPayment({
    provider: 'wxpay',
    timeStamp: data.timeStamp,
    nonceStr: data.nonceStr,
    package: data.package,
    signType: data.signType,
    paySign: data.paySign,
    success: function(res) {
      success && success(res)
    },
    fail: function(err) {
      fail && fail(err)
    }
  })
  // #endif
  if (isWxBrowser()) {
    // eslint-disable-next-line no-undef
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
      'appId': data.appId, // 公众号ID，由商户传入
      'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': data.nonceStr, // 随机串
      'package': data.package,
      'signType': data.signType, // 微信签名方式：
      'paySign': data.paySign // 微信签名
    },
    function(res) {
      console.log(res)
      if (res.err_msg === 'get_brand_wcpay_request:ok') {
        success && success(res)
        // 使用以上方式判断前端返回,微信团队郑重提示：
        // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      }
      if (res.err_msg === 'get_brand_wcpay_request:cancel') {
        cancel && cancel(res)
      }
      if (res.err_msg === 'get_brand_wcpay_request:fail') {
        fail && fail(res)
      }
    })
    // window.wx.chooseWXPay({
    // 	appId: data.appId,
    // 	timestamp: data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    // 	nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
    // 	package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    // 	signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    // 	paySign: data.paySign, // 支付签名
    // 	success: function(res) {
    // 		// 支付成功后的回调函数
    // 		success(res)
    // 	},
    // 	// 支付取消回调函数
    // 	cencel: function (res) {
    // 		cancel(res)
    // 	},
    // 	// 支付失败回调函数
    // 	fail: function (res) {
    // 		fail(res)
    // 	}
    // })
  }
}
