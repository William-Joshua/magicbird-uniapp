import Request from 'luch-request'
import appConfig from '/src/config'
import useUserStore from '/src/store/modules/user'

// 创建http实例
const http = new Request()

export function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    // #ifdef H5
    return appConfig.devApi
    // #endif
    // #ifndef H5
    // eslint-disable-next-line no-unreachable
    return appConfig.devHost
    // #endif
  } else {
    return appConfig.prodHost + appConfig.prodApi
  }
}

// 全局配置
http.setConfig((config) => {
  config.baseURL = getBaseUrl()
  // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
  config.timeout = 60000 // 默认值
  // #endif
  config.custom = {
    needAuth: false,
    showError: false
  } // 全局自定义参数默认值
  return config
})

// request拦截器
http.interceptors.request.use((config) => {
  // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
  config.data = config.data || {}

  const { getToken } = useUserStore()
  const vuex_token = getToken()
  if (vuex_token) {
    config.header[appConfig.tokenHeadName] = appConfig.tokenTypeName + vuex_token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // custom参数
  if (config.custom.needAuth && !vuex_token) { // 需要认证，但未登录，return Promise.reject(config) 会取消本次请求
    return Promise.reject(config)
  }

  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

// 响应拦截器
http.interceptors.response.use((response) => {
  const showError = response.config.custom.showError
  const { initUserStore } = useUserStore()

  // 未设置状态码则默认成功状态
  const code = response.data.code || 200
  if (code === 401) {
    uni.showToast({
      title: '您还未登录或登录已过期,请重新登录',
      icon: 'none',
      duration: 800
    })
    initUserStore()
  } else if (code === 404) {
    uni.switchTab({
      url: '/pages/index'
    })
    return Promise.reject(response)
  } else if (code === 500) {
    if (showError || process.env.NODE_ENV === 'development') {
      uni.showToast({
        title: '服务器错误，请稍后再试',
        icon: 'none',
        duration: 800
      })
      console.log(response)
    }
    return Promise.reject(response)
  } else if (code !== 200 && code !== 1) {
    uni.showToast({
      title: response.data.msg,
      icon: 'none',
      duration: 1500
    })
    return Promise.reject(response)
  } else {
    return response.data
  }

  return response.data
}, (response) => {
  const showError = response.config.custom.showError
  // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
  if (response.errMsg) {
    if (showError || process.env.NODE_ENV === 'development') {
      uni.showToast({
        title: '请求错误，请稍后再试',
        icon: 'none',
        duration: 800
      })
    }
  }
  return Promise.reject(response)
})

export default http
