import { pageLoginIndex, containerWebview } from '/src/config/urls'

// 强制登录，onLoad时当前页面出栈，不返回当前页，适用于而页面全部功能需要登录的场景
export function forceLogin(vuex_token) {
  if (!vuex_token) {
    uni.redirectTo({
      url: pageLoginIndex
    })
  }
  return !vuex_token
}

// 校验登录，调用方法时当前页面不出栈，返回当前页，适用于页面部分功能需要登录的场景
export function toLogin(vuex_token) {
  if (!vuex_token) {
    uni.navigateTo({
      url: pageLoginIndex
    })
  }
  return !vuex_token
}

export function getCurrentRoute() {
  // #ifdef H5
  return window.location.pathname + window.location.search
  // #endif
  // #ifndef H5
  const routes = getCurrentPages() // 获取当前打开过的页面路由数组
  const curRoute = routes[routes.length - 1].route // 获取当前页面路由
  const curParam = routes[routes.length - 1].options // 获取路由参数
  // 拼接参数
  let param = ''
  for (const key in curParam) {
    param += '&' + key + '=' + curParam[key]
  }
  return '/' + curRoute + param.replace('&', '?')
  // #endif
}

export function getPlatform() {
  // #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE
  return 'APP'
  // #endif
  // #ifdef H5
  return 'H5'
  // #endif
  // #ifdef MP || MP-360 || MP-ALIPAY || MP-BAIDU || MP-KUAISHOU || MP-LARK || MP-QQ || MP-TOUTIAO || MP-WEIXIN
  return 'MP'
  // #endif
  // #ifdef QUICKAPP-WEBVIEW || QUICKAPP-WEBVIEW-HUAWEI || QUICKAPP-WEBVIEW-UNION
  return 'QUICKAPP'
  // #endif
  return ''
}

export function openURL(url) {
  // 非http请求直接跳转本地页面
  if (!/^https?/.test(url)) {
    uni.navigateTo({
      url: url,
      fail: (e) => {
        uni.switchTab({
          url: url
        })
      }
    })
    return
  }
  // #ifdef APP-PLUS || MP
  // Http请求用webview打开
  uni.navigateTo({
    url: containerWebview + '?url=' + encodeURI(url)
  })
  return
  // #endif
  // #ifdef APP-PLUS
  plus.runtime.openURL(url)
  // #endif
  // #ifdef H5
  window.open(url)
  // #endif
  // #ifdef MP
  uni.setClipboardData({
    data: url
  })
  uni.showModal({
    content: '已自动复制网址，请在手机浏览器里粘贴该网址',
    showCancel: false
  })
  // #endif
}

export function dyback() {
  // 返回上一页
  // #ifdef H5
  history.back()
  return
  // #endif
  // eslint-disable-next-line no-unreachable
  uni.navigateBack()
}

export function guid() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function formatNumToKw(num) {
  return num >= 1e3 && num < 1e4 ? (num / 1e3).toFixed(2) + 'k' : num >= 1e4 ? (num / 1e4).toFixed(2) + 'w' : num
}

export function getSuffix(filename) {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}

export function contactKefu(phoneNum) {
  if (!phoneNum) return
  if (phoneNum.includes('http')) {
    openURL(phoneNum)
  } else {
    // 联系电话
    uni.makePhoneCall({
      phoneNumber: phoneNum || '17688889999' // 仅为示例
    })
  }
}

export function useTODO(toast) {
  if (toast) {
    uni.showToast({
      title: '该功能还未开放',
      icon: 'none',
      duration: 250
    })
  }
  return false
}

/**
 * ================================================FETCH FUNC================================================
 */
/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 * @param {*} arrayFormat,数组格式化形式
 */
export function obj2Param(data = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) === -1) arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i])
          }
          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(_value => {
            _result.push(key + '=' + _value)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          // eslint-disable-next-line no-case-declarations
          let commaStr = ''
          value.forEach(_value => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(key + '=' + commaStr)
          break
        default:
          value.forEach(_value => {
            _result.push(key + '[]=' + _value)
          })
      }
    } else {
      _result.push(key + '=' + value)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  if (!url) {
    url = getCurrentRoute()
  }
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
