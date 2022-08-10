<!-- 小程序/APP的webview组件，请注意webview中的redirectTo将会使整个webview页面出栈 -->
<template>
  <view>
    <web-view :src="webviewUrl" :webview-styles="webviewStyles" @message="handleMessage" />
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})

const webviewUrl = decodeURIComponent(props.url)

const webviewStyles = ref({
  progress: {
    color: '#FF3333' // https://uniapp.dcloud.io/static/web-view.html
  }
})

const handleMessage = (evt) => {
  // 每次执行 postMessage 后，传递的消息会以数组的形式存放。因此，在 web-view 的 message 事件回调中，接收到的 event.detail.data 的值是一个数组。
  console.log('接收到的消息：' + JSON.stringify(evt))
  if (evt && evt.detail.data && evt.detail.data.length > 0) {
    evt.detail.data.forEach((item, index) => {
      if (item.action === 'someaction') {
        // 处理逻辑
      }
    })
  }
}

function closeAllWebView() {
  // #ifdef APP-PLUS
  // 关闭所有webview窗口
  const currentWebview = proxy.$scope.$getAppWebview()
  if (currentWebview) {
    const child = currentWebview.children()
    for (let i = 0; i < child.length; i++) {
      currentWebview.remove(child[i])
    }
  }
  // #endif
}

function initWebviewComp() {
  // subNvue 自1.9.10 起支持 ，仅支持 app 平台
  // #ifdef APP-PLUS
  // 通过 id 获取 nvue 子窗体
  const subNVue = uni.getSubNVueById('dy-webview-component')
  // 动态修改 subNVue 子窗体位置，大小
  const style = {
    position: 'absolute',
    width: '120upx',
    height: '120upx',
    bottom: '160upx',
    right: '80upx',
    background: 'transparent'
  }
  subNVue.setStyle(style)
  // 打开 nvue 子窗体
  subNVue.show('fade-in', 200, function() {
    // 打开后进行一些操作...
    console.log('init dindex')
  })
  // 关闭 nvue 子窗体
  subNVue.hide('fade-out', 200)
  // #endif
}
</script>

<style>

</style>
