/**
 * 参数配置文件
 */
export default {
  /**
   * 应用名
   */
  name: 'vue3-uni-cli',

  /**
   * 版本
   */
  version: '2022.2.1',

  /**
   * 开发环境host
   */
  devHost: 'http://localhost:8080',

  /**
   * 开发环境转发规则
   */
  devApi: '/dev-api',

  /**
   * 开发环境websocket ws:// 或 wss://
   */
  devSocket: '',

  /**
   * 生产环境host
   */
  prodHost: 'https://www.baidu.com',

  /**
   * 生产环境转发规则
   */
  prodApi: '/prod-api',

  /**
   * 生产环境websocket ws:// 或 wss://
   */
  prodSocket: '',

  /**
   * H5主站地址
   */
  webUrl: '',

  /**
   * 请求头名称
   */
  tokenHeadName: 'yun-web-auth',

  /**
   * 请求头类型
   */
  tokenTypeName: 'Bearer ',

  /**
   * 是否开启前端oss直传
   */
  ossEnable: false,

  /**
   * 微信公众号appid,填写即代表开启公众号登录
   */
  wxH5AppId: '',

  /**
   * 微信公众号授权方式snsapi_base或snsapi_userinfo
   */
  wxH5scope: 'snsapi_base'
}
