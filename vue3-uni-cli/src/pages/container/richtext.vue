<!-- 富文本组件 -->
<template>
  <view>
    <!-- #ifdef H5 -->
    <view v-html="richText" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <u-parse
      :html="richText"
      :selectable="true"
      :lazy-load="true"
      :show-with-animation="true"
      @linkpress="navigate"
    />
    <!-- #endif -->
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'
import { openURL } from '/src/utils'
import http from '/src/utils/request'

const richText = ref('')

const props = defineProps({
  api: {
    type: String,
    default: ''
  },
  richLabel: {
    type: String,
    default: ''
  }
})

onMounted(() => {
  // 适用于微信小程序及APP等需要容器的场景
  // 请注意请求api需用encodeURIComponent()进行编码，服务器返回字段需包含`richLabel`
  if (props.richLabel && props.api) {
    uni.showLoading({
      title: '加载中...'
    })
    http.get(decodeURIComponent(props.api)).then(res => {
      uni.hideLoading()
      if (res.data) {
        richText.value = res.data[props.richLabel]
      }
    })
  }
})

function navigate(e) {
  e && e.ignore() && openURL(e.href)
}
</script>

<style>

</style>
