import appConfig from '/src/config'
import { isWxBrowser, goWxOauthUrl, fuckWx, initJssdkConfig } from '/src/utils/jwx'
import {
  getWxJsTicket,
  loginCode2oauth2,
  loginCode2session,
  loginSnsapi
} from '/src/api/service/wxApi'
import useUserStore from '/src/store/modules/user'

/**
 * 微信统一登录：
 * @param option props原样传入
 * @param successFunc 登录成功：无返回值【已绑定平台用户】，有返回值【未绑定平台用户，该用户的openid】
 * @param failFunc 登录失败
 */
export function uniLogin(option, successFunc, failFunc) {
  // #ifndef H5
  uni.login({
    provider: 'weixin',
    // #ifdef APP-PLUS
    onlyAuthorize: true, // app仅请求授权认证登录
    // #endif
    success: function(loginRes) {
      console.log('uniLogin:', loginRes)
      // 获取用户信息
      // uni.getUserInfo({
      //   provider: 'weixin',
      //   success: function(infoRes) {
      //     console.log('uniUserInfo:', infoRes)
      //   }
      // })
      // #ifdef MP-WEIXIN
      if (loginRes.code) { // 小程序登录
        jscode2session({
          code: loginRes.code
        }, successFunc, failFunc)
      }
      // #endif
      // #ifdef APP-PLUS
      if (loginRes.code) { // app登录：直接运行的会是HBuilder基座的设置，使manifest的oauth生效需使用自定义基座包
        // https://ask.dcloud.net.cn/article/192
        appCode2oauth2({
          code: loginRes.code
        }, successFunc, failFunc)
      }
      // #endif
    },
    fail: function(e) {
      console.log('uniLogin fail:', e)
    }
  })
  // #endif
  // #ifdef H5
  wxH5Login(option, successFunc, failFunc)
  // #endif
}

/**
 * 微信小程序登录
 */
function jscode2session(query, successFunc, failFunc) {
  loginCode2session(query).then(res => {
    // 如果已经绑定平台用户直接返回，否则执行登录逻辑
    if (res.data.token) {
      const { lifeData } = useUserStore()
      lifeData.value.token = res.data.token
      lifeData.value.user = res.data.loginUser
      uni.navigateBack()
    } else if (res.data.openid) {
      // 未绑定用户
      successFunc(res.data.openid)
    } else {
      // 执行无法登录的逻辑
      failFunc(res)
    }
  }).catch((e) => {
    failFunc(e)
  })
}

/**
 * 微信APP登录
 */
function appCode2oauth2(query, successFunc, failFunc) {
  loginCode2oauth2(query).then(res => {
    // 如果已经绑定平台用户直接返回，否则执行登录逻辑
    if (res.data.token) {
      const { lifeData } = useUserStore()
      lifeData.value.token = res.data.token
      lifeData.value.user = res.data.loginUser
      uni.navigateBack()
    } else if (res.data.openid) {
      // 未绑定用户
      successFunc(res.data.openid)
    } else {
      // 执行无法登录的逻辑
      failFunc(res)
    }
  }).catch((e) => {
    failFunc(e)
  })
}

// 第三方登录，标准：不影响主平台登录逻辑
export function wxH5Login(option, successFunc, failFunc) {
  // #ifdef H5
  const appid = appConfig.wxH5AppId
  const scope = appConfig.wxH5scope

  if (appid !== '' && isWxBrowser()) {
    const openidKey = 'vuex_openid'
    const openid = sessionStorage.getItem(openidKey) // 表示已经授权过
    if (openid) {
      sessionStorage.removeItem(openidKey) // 清除授权信息
      successFunc(openid) // 已经自动登陆过，但该微信用户未绑定平台用户
      return
    }

    uni.showLoading({
      title: '微信授权中...',
      mask: true
    })
    setTimeout(() => {
      uni.hideLoading()
    }, 800)

    if (option.code != null) {
      // 这里采用scope作为区分登录方式的字段，可根据实际情况修改
      loginSnsapi(scope, {
        code: option.code
      }).then(res => {
        // 如果已经绑定平台用户直接返回，否则执行登录逻辑
        if (res.data.token) {
          const { lifeData } = useUserStore()
          lifeData.value.token = res.data.token
          lifeData.value.user = res.data.loginUser

          fuckWx(true, 1) // 这里的1指的是从登录页返回上一页。如果是当前页面的调用不需要额外返回一层
        } else if (res.data.openid) {
          // 采用sessionStorage记录openid，执行到该步表示该微信用户未绑定平台用户
          sessionStorage.setItem(openidKey, res.data.openid)
          fuckWx(true) // 微信授权后，返回到登录页执行登录逻辑
        } else {
          // 执行无法登录的逻辑
          fuckWx(true, 1)
        }
      }).catch(() => {
        fuckWx(true, 1)
      })
    } else {
      // snsapi_base现象为刚看到登录页面就跳转返回了。所以采用这种方法的，适合放在公众号入口，用户无感知。
      // snsapi_userinfo现象为看到登录页就需要授权登录。
      goWxOauthUrl(appid, scope)
    }
  }
  // #endif
}

// 自动调用后台请求
export function iniTicket(jsApiList) {
  if (isWxBrowser()) {
    return getWxJsTicket().then(res => {
      const config = res.data
      config.jsApiList = jsApiList
      initJssdkConfig(config)
    })
  } else {
    return Promise.resolve()
  }
}
