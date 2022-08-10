// 定义统一通信事件，避免事件在页面中乱飞，找不到
import { getCurrentRoute, param2Obj } from '/src/utils/index'
import { onMounted, onUnmounted } from 'vue'

// const eventTest = 'event_test'
//
// export function emitTest(OBJECT) {
//   uni.$emit(eventTest, OBJECT)
// }
//
// // 推荐使用，相当于on和off的结合，仅触发一次，在第一次触发之后移除该监听器
// export function onceTest(callEvent) {
//   uni.$once(eventTest, function(data) {
//     callEvent(data)
//   })
// }
//
// export function onTest(callEvent) {
//   uni.$on(eventTest, function(data) {
//     callEvent(data)
//   })
// }
//
// export function offTest(callEvent) {
//   uni.$off(eventTest, function(data) {
//     callEvent(data)
//   })
// }

export function useEvent(eventName, callEvent) {
  onMounted(() => {
    uni.$on(eventName, function(data) {
      callEvent(data)
    })
  })

  onUnmounted(() => {
    uni.$off(eventName, function(data) {
      callEvent(data)
    })
  })
}

/**
 * ===================================================================================
 */

export function dealSocketEvent(res) {
  const resData = JSON.parse(res.data)
  if (typeof resData === 'object' && resData?.event) {
    uni.$emit(resData.event, resData)

    // 对话事件
    if (resData.event?.includes('listen_chat_')) {
      const url = getCurrentRoute()
      // 不在聊天记录界面
      if (!url.includes('/pages/notice')) {
        // 在聊天界面
        if (url.includes('/pages/user/notice/chat')) {
          const query = param2Obj(url)
          // 但不是和当事人
          if (query && query.receiver + '' !== resData.sender) {
            uni.$u.toast('您有一条新消息！')
            uni.$emit('show_wx_msg', '您有一条新消息！')
          }
        } else {
          // 在其他界面
          uni.$u.toast('您有一条新消息！')
          uni.$emit('show_wx_msg', '您有一条新消息！')
        }
      }
    }
  }
}

export default {
  dealSocketEvent,
  useEvent
}
