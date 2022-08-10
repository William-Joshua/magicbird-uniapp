// 应用启动页。控制应用启动页，用于套壳app，小程序webview
export const initUrl = ''

// webview
export const containerWebview = '/pages/container/webview'

// richText
export const richTextWebView = '/pages/container/richtext'

// 登录
export const pageLoginIndex = '/pages/login/index'

// 富文本
export const containerRichText = (richLabel, api) => {
  return `${richTextWebView}?richLabel=${richLabel}&api=${api}`
}

// 免登录页面白名单
export const whiteUrlList = [
  containerWebview,
  richTextWebView,
  pageLoginIndex
]

// 默认底栏列表
export const tabbarList = []
