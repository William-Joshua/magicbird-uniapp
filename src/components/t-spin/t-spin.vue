<template>
  <view v-if="isShow" class="t-spin" :class="computedClass" :style="computedStyle">
    <view class="t-spin-main">
      <view class="t-spin-dot" :style="[{backgroundColor: defaultColor}]" />
      <view class="t-spin-text">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TSpin',
  props: {
    // 大小，可选值为 large、small、default
    size: {
      type: String,
      default: 'default'
    },
    // 是否固定，需要父级有 relative 或 absolute
    isFix: {
      type: Boolean,
      default: false
    },
    // 是否全屏
    isFullscreen: {
      type: Boolean,
      default: false
    },
    // 是否自定义
    isCustom: {
      type: Boolean,
      default: false
    },
    // 主题色
    themeColor: {
      type: String,
      default: ''
    },
    // 背景透明度
    opacity: {
      type: Number,
      default: 0.9
    }
  },
  data() {
    return {
      defaultColor: '',
      isShow: true
    }
  },
  computed: {
    computedClass() {
      const _class = [`c-spin-${this.size}`]
      if (this.isFix) { _class.push('t-spin-fix') }
      if (this.isCustom) { _class.push('t-spin-show-text') }
      if (this.isFullscreen) { _class.push('t-spin-fullscreen') }
      return _class
    },
    computedStyle() {
      return [{ 'backgroundColor': `rgba(255,255,255,${this.opacity})` }]
    }
  },
  mounted() {
    this.defaultColor = this.themeColor || '#2979ff'
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss">
.t-spin {
  color: #2979ff;
  vertical-align: middle;
  text-align: center;

  &-dot {
    position: relative;
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ani-spin-bounce 1s 0s ease-in-out infinite;
  }

  &-large &-dot {
    width: 32px;
    height: 32px;
  }

  &-small &-dot {
    width: 12px;
    height: 12px;
  }

  &-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.9);
  }

  &-fullscreen {
    z-index: 2010;
  }

  &-fullscreen-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &-fix &-main {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  &-fix &-dot {
    display: inline-block;
  }

  &-show-text &-dot,
  &-text {
    display: none;
  }

  &-show-text &-text {
    display: block;
    font-size: 14px;
  }
}

@keyframes ani-spin-bounce {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
