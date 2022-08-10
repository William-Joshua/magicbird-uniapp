<template>
  <view v-if="vuex_token" class="content">
    <image class="logo" src="/static/images/logo.png" />
    <view class="text-area">
      <text class="title">
        您好 - {{ vuex_user?.nickName }}
      </text>
    </view>
    <view class="button-demo">
      <button class="cu-btn text-gray margin-tb-sm lg ground" style="font-size: 28rpx" @click="logout()">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'
import useUserStore from '/src/store/modules/user'

/**
 * ==================================================== props/emits ====================================================
 */

/**
 * ==================================================== data ====================================================
 */
const { vuex_token, vuex_user, autoLogin, initUserStore } = useUserStore()

/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const logout = () => {
  initUserStore()

  uni.$dy_tool.dyback()
}

/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
autoLogin()

</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40rpx;
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
    font-size: 28rpx;
    color: #606266;
  }

  .button-demo {
    margin-top: 80rpx;
  }
</style>
