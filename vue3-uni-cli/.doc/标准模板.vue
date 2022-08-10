<template>
  <view v-show="vuex_token">
    <view></view>
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
const { vuex_token, vuex_user, autoLogin } = useUserStore()
/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */

/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
autoLogin()
</script>

<style lang="scss" scoped>

</style>