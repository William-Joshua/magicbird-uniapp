import { onHide, onUnload } from '@dcloudio/uni-app'
import { isWxBrowser } from './jwx'

export function jssdkShare(data, callback) {
  updateAppMessageShareData(data, callback)
  updateTimelineShareData(data, callback)
}

export function updateAppMessageShareData(data, callback) {
  if (isWxBrowser() && data.title) {
    window.wx.updateAppMessageShareData({ // 分享给朋友： https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#10
      title: data.title, // 分享标题
      desc: data.desc, // 分享描述
      link: data.link || document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      success: function() {
        callback && callback()
      }
    })
  }
  onHide(() => {
    isWxBrowser() && window.wx.updateAppMessageShareData({})
  })
  onUnload(() => {
    isWxBrowser() && window.wx.updateAppMessageShareData({})
  })
}

export function updateTimelineShareData(data, callback) {
  if (isWxBrowser() && data.title) {
    window.wx.updateTimelineShareData({ // 分享到朋友圈
      title: data.title, // 分享标题
      link: data.link || document.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      success: function() {
        callback && callback()
      }
    })
  }
  onHide(() => {
    isWxBrowser() && window.wx.updateAppMessageShareData({})
  })
  onUnload(() => {
    isWxBrowser() && window.wx.updateAppMessageShareData({})
  })
}
