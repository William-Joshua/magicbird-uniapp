import { ref } from 'vue'
import appConfig from '/src/config'
import useUserStore from '/src/store/modules/user'
import { dealSocketEvent } from './umsg'

const getSocketUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return appConfig.devSocket
  }
  return appConfig.prodSocket
}

const wsEnable = getSocketUrl()
const wsUrl = getSocketUrl() + '/web/sockect_connect'
const socketTask = ref(null)
const pingTimer = ref()
export const socketOpen = ref(false)

export function initSockect() {
  // 保持websocket连接
  if (wsEnable && !socketOpen.value) {
    socketTask.value = getConnect()

    uni.onSocketOpen(function(res) {
      // console.log('WebSocket连接已到达服务器！')
      socketOpen.value = true
      setSocketPing(15 * 1000)
    })

    uni.onSocketError(function(res) {
      // console.log('WebSocket连接未到达服务器，请检查！')
      setSocketPing(15 * 1000)
    })

    uni.onSocketClose(function(res) {
      // console.log('WebSocket 已关闭！')
      socketOpen.value = false
    })

    uni.onSocketMessage(function(res) {
      // console.log('收到服务器内容：' + res.data)
      dealSocketEvent(res)
      // 距离上次ping后隔10分钟再次ping
      setSocketPing(10 * 60 * 1000)
    })
  }
}

/**
 * 创建socket 定时任务
 */
function setSocketPing(timeout) {
  if (pingTimer.value) {
    clearInterval(pingTimer.value)
  }
  pingTimer.value = setInterval(() => {
    sendSocketPing()
  }, timeout)
}

/**
 * 发送socket ping
 */
export function sendSocketPing() {
  uni.sendSocketMessage({
    data: 'ping',
    fail: () => {
      getConnect()
    }
  })
}

/**
 * 获取socket 连接
 */
export function getConnect() {
  uni.closeSocket()

  const { getToken } = useUserStore()
  const vuex_token = getToken()
  const url = vuex_token ? wsUrl + `?token=${vuex_token}` : wsUrl
  return uni.connectSocket({
    url: url,
    success: (res) => {
      // console.log('WebSocket连接已发送给服务器！')
    },
    fail: (e) => {
      // console.log('WebSocket连接发送给服务器失败！')
    }
  })
}
