<template>
  <view>
    <t-captcha
      ref="tCaptchaRef"
      copyright="由dddy提供技术支持"
      :width="330"
      :height="155"
      :background-image="originalImageBase64"
      :jigsaw="jigsawImageBase64"
      @reset="handleReset"
      @end="handleEnd"
    />
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'

import { getBaseUrl } from '/src/utils/request'
/**
 * ==================================================== props/emits ====================================================
 */
const emit = defineEmits(['success'])
/**
 * ==================================================== data ====================================================
 */
const tCaptchaRef = ref()
const token = ref('')
const originalImageBase64 = ref('')
const jigsawImageBase64 = ref('')

/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const myRequest = (option = {}) => {
  return new Promise((reslove, reject) => {
    uni.request({
      url: getBaseUrl() + option.url,
      data: option.data,
      method: option.method || 'GET',
      success: (result) => {
        reslove(result)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

// 请求背景图片和验证图片
function handleReset() {
  const data = {
    captchaType: 'blockPuzzle',
    clientUid: null,
    ts: Date.now() // 现在的时间戳
  }
  myRequest({
    url: '/captcha/get', // 仅为示例，并非真实接口地址。
    data,
    method: 'POST'
  }).then((result) => {
    const res = result.data
    if (res.repCode?.toString() === '0000') {
      originalImageBase64.value = 'data:image/png;base64,' + res.repData.originalImageBase64
      jigsawImageBase64.value = 'data:image/png;base64,' + res.repData.jigsawImageBase64
      token.value = res.repData.token
      tCaptchaRef.value.hideLoading()
    }
  })
}

function handleCheck(moveLeftDistance) {
  const pointJson = JSON.stringify({
    x: moveLeftDistance,
    y: 5.0
  })
  const checkData = {
    captchaType: 'blockPuzzle',
    'pointJson': pointJson,
    'token': token.value
  }
  myRequest({
    url: `/captcha/check`,
    data: checkData,
    method: 'POST'
  }).then((result) => {
    const res = result.data
    if (res.repCode?.toString() === '0000') {
      tCaptchaRef.value.success()
      // 成功隐藏并发出事件
      emit('success', { captchaVerification: `${token.value}---${pointJson}` })
      tCaptchaRef.value.hide()
      tCaptchaRef.value.reset()
    } else {
      tCaptchaRef.value.error()
      // reset后会自动获取
      tCaptchaRef.value.reset()
    }
  })
}

function show() {
  tCaptchaRef.value.show()
  handleReset()
}

function handleEnd(e) {
  handleCheck(e.x)
}
/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */

defineExpose({
  show
})
</script>

<style lang="scss" scoped>

</style>
