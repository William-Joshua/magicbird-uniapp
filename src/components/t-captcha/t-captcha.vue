<!--plugin link https://gitee.com/ibaleine-open-source/itriton-uniapp/blob/master/itriton-ui/components/t-captcha/t-captcha.vue -->
<template>
  <view v-if="isShow" class="t-captcha">
    <view class="t-captcha-wrap">
      <view class="t-captcha__content">
        <view class="t-captcha__content-image" :style="_computedSizeStyle" />
        <image class="t-captcha__content-jigsaw" :src="jigsaw" mode="heightFix" :style="[_computedJigsawStyle]" />
        <view class="t-captcha__content-status">
          <view v-if="isSuccess" class="t-captcha__content-status--success" :style="{ backgroundColor: successColor }">{{ successText }}</view>
          <view v-if="isError" class="t-captcha__content-status--error" :style="{ backgroundColor: errorColor }">{{ errorText }}</view>
        </view>
        <t-spin ref="captchaSpin" is-fix :theme-color="themeColor" />
      </view>
      <view class="t-captcha__footer" :style="_computedFooterStyle" @touchend="handleTouchend" @mouseup="handleTouchend">
        <view class="t-captcha__footer-bg" :style="{ width: `${width}px` }">{{ placeholder }}</view>
        <movable-area class="t-captcha__footer-movable-area" :style="{ width: `${width}px` }" :animation="true">
          <movable-view
            class="t-captcha__footer-icon"
            direction="horizontal"
            inertia
            :x="x"
            :disabled="loading"
            :style="{ backgroundColor: _computedThemeColor }"
            @change="changeMovableArea"
          />
        </movable-area>
      </view>
    </view>
    <view v-if="!isHideFooter" class="t-captcha__extra" :style="{ width: `${width + 20}px` }">
      <slot name="footer" />
      <view v-if="!$slots.footer" class="t-captcha__extra-content">
        <view class="t-captcha__extra-left">
          <image class="t-captcha__extra-icon" src="./icon/del.png" @click="hide()" />
          <image class="t-captcha__extra-icon" src="./icon/refresh.png" @click="reset(true)" />
          <image class="t-captcha__extra-icon" src="./icon/info.png" @click="info()" />
        </view>
        <view class="t-captcha__extra-right">{{ copyright }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import tSpin from '../t-spin/t-spin.vue'
export default {
  name: 'TCaptcha',
  components: { tSpin },
  props: {
    // ?????????
    themeColor: {
      type: String,
      default: ''
    },
    // ????????????
    width: {
      type: Number,
      default: 270
    },
    // ????????????
    height: {
      type: Number,
      default: 144
    },
    // ??????
    jigsaw: {
      type: String,
      default: ''
    },
    // ????????????
    backgroundImage: {
      type: String,
      default: ''
    },
    // ????????????
    successColor: {
      type: String,
      default: '#00aa00'
    },
    // ????????????
    successText: {
      type: String,
      default: '????????????'
    },
    // ????????????
    errorColor: {
      type: String,
      default: '#de715b'
    },
    // ????????????
    errorText: {
      type: String,
      default: '?????????????????????'
    },
    // ??????????????????
    placeholder: {
      type: String,
      default: '????????????????????????'
    },
    // ????????????
    copyright: {
      type: String,
      default: '???itriton??????????????????'
    },
    // ????????????
    isHideFooter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      x: 1,
      moveX: 1,
      timeoutStatus: null,
      timeoutReset: null,
      isShow: false,
      isSuccess: false,
      isError: false,
      loading: false
    }
  },
  computed: {
    _computedSizeStyle() {
      const _style = []
      _style.push(`height: ${this.height}px`)
      _style.push(`width: ${this.width}px`)
      _style.push(`background-image: url(${this.backgroundImage})`)
      return _style.join(';')
    },
    _computedJigsawStyle() {
      const left = this.moveX > 1 ? `${this.moveX}px` : '1px'
      return {
        height: `${this.height}px`,
        maxWidth: `${this.width}px`,
        left: left
      }
    },
    _computedFooterStyle() {
      const _style = []
      _style.push(`height: 50px`)
      _style.push(`width: ${this.width}px`)
      return _style.join(';')
    },
    _computedThemeColor() {
      return this.themeColor || '#2979ff'
    }
  },
  unmounted() {
    // ???????????????????????????????????????????????????movex
    // if (this.timeoutStatus) clearTimeout(this.timeoutStatus)
    // if (this.timeoutReset) clearTimeout(this.timeoutReset)
  },
  methods: {
    show() {
      this.loading = true
      this.isShow = true
    },
    hide() {
      this.loading = false
      this.isShow = false
    },
    success() {
      this.isSuccess = true
      this.isError = false
    },
    error() {
      this.isSuccess = false
      this.isError = true
    },
    showLoading() {
      this.$nextTick(() => {
        this.loading = true
        this.$refs.captchaSpin && this.$refs.captchaSpin.show()
      })
    },
    hideLoading() {
      this.$nextTick(() => {
        this.loading = false
        this.$refs.captchaSpin && this.$refs.captchaSpin.hide()
      })
    },
    changeMovableArea(e) {
      this.moveX = e.detail.x
    },
    reset(immediately) {
      if (immediately) {
        this.showLoading()
        this.$emit('reset')
      } else {
        this.timeoutStatus = setTimeout(() => {
          this.isSuccess = false
          this.isError = false
          if (this.moveX > 1) {
            // ?????????x?????????????????????????????????x??????
            this.x = this.moveX
            this.$nextTick(() => {
              this.timeoutReset = setTimeout(() => {
                this.moveX = 1
                this.x = 1
              }, 300)
            })
          }
          this.showLoading()
          this.$emit('reset')
        }, 1000)
      }
    },
    info() {
      this.$emit('info')
    },
    handleTouchend() {
      if (!this.loading) {
        this.$emit('end', { x: this.moveX })
      }
    }
  }
}
</script>

<style lang="scss">
$t-captcha-padding: 10px;
$t-captcha-footer-height: 32px;
$t-captcha-footer-radius: 20px;

.t-captcha {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: show 1s 1;

  &-wrap {
    padding: $t-captcha-padding;
    background-color: #ffffff;
  }

  &__content {
    border-radius: 2px;
    position: relative;

    &-image {
      position: fixed;
    }

    &-jigsaw {
      position: relative;
    }

    &-status {
      position: relative;
      display: block;
      width: 100%;
      height: 30px;
      margin-top: -30px;
      font-size: 15px;
      color: #ffffff;

      &--success {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        animation: show 1s 1;
      }

      &--error {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        animation: show 1s 1;
      }
    }
  }

  &__footer {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: $t-captcha-padding;
    height: $t-captcha-footer-height + 2;

    &-bg {
      position: absolute;
      background-color: #dfe1e2;
      color: #88949d;
      display: flex;
      justify-content: center;
      align-items: center;
      height: $t-captcha-footer-height + 2;
      border-radius: $t-captcha-footer-radius;
      font-size: 15px;
    }

    &-movable-area {
      height: $t-captcha-footer-height + 2;
    }

    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $t-captcha-footer-height + 2;
      height: $t-captcha-footer-height + 2;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      background-image: url(./icon/captcha.png);
    }
  }

  &__extra {
    border-top: 1rpx solid #eeeeee;
    background-color: #ffffff;
    padding: $t-captcha-padding;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    &-left {
      display: flex;
      align-items: center;
    }

    &-right {
      display: flex;
      align-items: center;
      color: #cacaca;
      font-size: 12px;
    }

    &-icon {
      height: 20px;
      width: 20px;
      margin-right: 10px;
    }
  }
}

image {
  vertical-align: middle;
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
