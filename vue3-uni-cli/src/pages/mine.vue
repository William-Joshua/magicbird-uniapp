<template>
  <view class="u-flex-col mainHeight u-m-l-20 u-m-r-20">
    <view class="u-flex index-radius u-p-l-30 u-p-r-20 u-p-b-30 u-m-t-30 u-p-t-30">
      <view class="u-m-r-20">
        <navigator url="/pages/user/center">
          <image
            class="user-box"
            style="width: 70px; height: 70px;"
            :src="pic"
          />
        </navigator>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">{{ vuex_user?.nickName }}</view>
        <navigator url="/pages/user/center">
          <view class="u-font-14 text-gray">微信号: uni_colorUI</view>
        </navigator>
      </view>
      <view class="u-m-l-10 u-p-10">
        <text class="cuIcon-scan text-gray" />
      </view>
      <view class="u-m-l-10 u-p-10">
        <navigator url="/pages/user/center">
          <text class="cuIcon-right text-gray" />
        </navigator>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-moneybag text-black" />
            <text class="text-black u-font-md">支付</text>
          </view>
        </view>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-favor text-black" />
            <text class="text-black u-font-md">收藏</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-pic text-black" />
            <text class="text-black u-font-md">相册</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-pay text-black" />
            <text class="text-black u-font-md">卡券</text>
          </view>
        </view>
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-like text-black" />
            <text class="text-black u-font-md">关注</text>
          </view>
        </view>
      </view>
    </view>

    <view class="u-m-t-20 index-radius">
      <view class="cu-list menu">
        <view class="cu-item arrow">
          <view class="content">
            <text class="cuIcon-settings text-black" />
            <text class="text-black u-font-md">设置</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch, getCurrentInstance } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh } from '@dcloudio/uni-app'
import useUserStore from '/src/store/modules/user'
import { openURL, formatNumToKw, toLogin } from '/src/utils'
import { hideAllNonBaseMenuItem } from '/src/utils/jwx'
import { iniTicket } from '/src/api/service/socialLogin'

/**
 * ==================================================== props/emits ====================================================
 */

/**
 * ==================================================== data ====================================================
 */
const { vuex_token, vuex_user } = useUserStore()
const pic = ref('https://img-cdn-tc.dcloud.net.cn/uploads/avatar/000/15/95/31_avatar_max.jpg')

/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const needLogin = () => {
  // 登陆后返回当前页
  toLogin(vuex_token.value)
  console.log('do something need login, you should toLogin before.')
}
/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
onShow(() => {
  const jsApiList = ['hideAllNonBaseMenuItem']
  iniTicket(jsApiList).then(() => {
    hideAllNonBaseMenuItem()
  })
})

</script>

<style lang="scss">

.user-box {
  background-color: #fff;
}

.mainHeight {
  min-height: calc(100vh - 50px);
}

.index-radius {
  background: #FFFFFF;
  border-radius: 20rpx;
  overflow: hidden;
}

.grid-text {
  font-size: 26rpx;
  margin-top: 20rpx;
  color: #606266;
}
</style>
