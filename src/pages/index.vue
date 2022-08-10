<template>
  <view class="u-flex-col u-col-center u-p-40">
    <!--<image class="logo" src="/static/images/logo.png" />-->
    <view class="u-flex u-row-center">
      <text class="u-font-md text-gray">
        天下渔场
      </text>
    </view>
    <view class="u-m-t-80">
      <button class="cu-btn line-gray round lg shadow" @click="clickButton">按钮组件跳转演示</button>
    </view>
    <view class="u-m-t-80">
      <uni-rate v-model="rateNum" :max="10" />
    </view>
    <view class="u-m-t-80">
      <uni-link color="#2979ff" href="http://demo.color-ui.com/">ColorUI示例：http://demo.color-ui.com/</uni-link>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'
import { openURL } from '/src/utils'

/**
 * ==================================================== props/emits ====================================================
 */

/**
 * ==================================================== data ====================================================
 */
const title = ref('Hello')
const rateNum = ref(5)
/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const clickButton = () => {
  openURL('http://vue3-hellouniapp.dcloud.net.cn/pages/tabBar/extUI/extUI')
}
/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
onShow(() => {
  console.log('index - onShow')
})
onReady(() => {
  console.log('index - onReady')
})
onMounted(() => {
  console.log('index - onMounted')
})
// onHide：跳转下一页，onUnload：返回上一页
onHide(() => {
  console.log('index - onHide')
})
</script>

<style lang="scss" scoped>

page {
  background-color: #ffffff;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
