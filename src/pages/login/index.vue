<template>
  <view v-show="!hidePage" class="content">
    <image class="logo" src="/static/images/logo.png" />
    <view class="text-area">
      <text class="title">
        您好 - {{ vuex_user?.nickName }}
      </text>
    </view>

    <form class="login-form u-m-40">
      <view class="cu-form-group u-p-t-28 u-p-b-28">
        <view class="title">用户名</view>
        <input v-model="model.phone" placeholder="请输入用户名" name="input">
        <text class="cuIcon-service" />
      </view>
      <view class="cu-form-group u-p-t-28 u-p-b-28">
        <view class="title">密码</view>
        <input v-model="model.code" placeholder="请输入用户名" name="input">
        <!--<button class="cu-btn bg-green sm shadow" @click="useVerify">获取验证码</button>-->
      </view>
    </form>

    <view class="box u-m-t-40">
      <view class="cu-bar btn-group">
        <button class="cu-btn bg-gradual-red shadow-blur round lg" @click="onClickLogin">提交</button>
      </view>
    </view>

  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'
import useUserStore from '/src/store/modules/user'
import { uniLogin } from '/src/api/service/socialLogin'
import { containerRichText } from '/src/config/urls'

/**
 * ==================================================== props/emits ====================================================
 */
const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})
/**
 * ==================================================== data ====================================================
 */
const { lifeData, vuex_token, vuex_user, initUserStore } = useUserStore()
const hidePage = ref(false)
const codeReady = ref(false)
const formReady = ref(false)
const model = ref({
  phone: '',
  code: ''
})

/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const useVerify = () => {
  if (!codeReady.value) {
    uni.showToast({
      icon: 'none',
      title: '请输用户名'
    })
    return
  }
  // 模拟向后端请求验证码
  uni.showLoading({
    title: '正在获取验证码',
    mask: true
  })
  setTimeout(() => {
    uni.hideLoading()
  }, 500)
  model.value.code = 1234
}

const onClickLogin = () => {
  // form验证
  if (!formReady.value) {
    uni.showToast({
      icon: 'none',
      title: '请输入用户名或密码'
    })
    return
  }
  lifeData.value.token = '102491955'
  lifeData.value.user = { nickName: '张三' }
  uni.$dy_tool.dyback()
}

function goAgreement() {
  uni.$dy_tool.openURL(containerRichText('answer', encodeURIComponent('xxx/detail?keyword=agreement')))
}

function goAccount() {
  uni.$dy_tool.openURL(containerRichText('answer', encodeURIComponent('xxx/detail?keyword=account')))
}
/**
 * ==================================================== watch ====================================================
 */
watch(() => model, (newVal, oldVal) => {
  codeReady.value = false
  formReady.value = false
  if (newVal.value.phone) {
    codeReady.value = true
    if (newVal.value.code) {
      formReady.value = true
    }
  }
}, {
  deep: true
})

/**
 * ==================================================== init ====================================================
 */
// 凡跳转登录页清空token，401跳转该页
initUserStore()

onShow(() => {
  // #ifdef H5 || MP-WEIXIN
  uniLogin(props, (openId) => {
    if (openId) {
      // 这里你可以做绑定操作了
      console.log('=====自动登录成功=====')
      console.log(openId)
      console.log('=====自动登录成功=====')
    }
  }, () => {
    console.log('uniLogin fail')
  })
  // #endif
})
</script>

<style lang="scss" scoped>
  page {
    background-color: #ffffff;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 100rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    min-width: 146rpx;
    font-size: 28rpx;
    color: #606266;
  }

  .login-form {
    .uni-input-placeholder {
      color: #aaaaaa;
    }
  }

  .box {
    width: 100%;
  }
</style>
