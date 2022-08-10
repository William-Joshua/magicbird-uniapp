<template>
  <view v-show="vuex_token" class="u-p-20">
    <u-back-top :scroll-top="scrollTop" top="1600" :custom-style="{backgroundColor: '#f1f1f1' }" />
    <!-- 空状态 -->
    <view v-if="loadStatus === 'nodata'" class="u-flex-col u-row-center" style="height: 800rpx">
      <u-empty text="暂无数据,先逛逛其他吧!" mode="list" />
    </view>
    <!-- 有内容 -->
    <view v-else>
      <view v-for="(item, index) in dataList" :key="index" class="dy-radius u-p-20 u-m-b-30">
        {{ item }}
      </view>

      <!-- 加载状态 -->
      <u-loadmore margin-top="24" margin-bottom="24" :status="loadStatus" />
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useUserStore from '/src/store/modules/user'

/**
 * ==================================================== props/emits ====================================================
 */

/**
 * ==================================================== data ====================================================
 */
const { vuex_token, vuex_user, autoLogin } = useUserStore()

const pageNum = ref(1)
const pageSize = ref(10)
const loadStatus = ref('loadmore')
const scrollTop = ref(0)
const dataList = ref([])
/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
const getData = () => {
  todos({
    descs: 'id',
    pageNum: pageNum.value,
    pageSize: pageSize.value
  }).then(({ code, msg, data }) => {
    const resData = data.records == null ? [] : data.records
    if (pageNum.value === 1 && resData.length === 0) {
      loadStatus.value = 'nodata' // 没有数据
    } else if (resData.length < pageSize.value) {
      dataList.value = dataList.value.concat(resData)
      pageNum.value += 1
      loadStatus.value = 'nomore' // 没有更多
    } else {
      dataList.value = dataList.value.concat(resData)
      pageNum.value += 1
      loadStatus.value = 'loadmore' // 加载结束
    }
  }).catch(e => {
    loadStatus.value = 'loadmore' // 加载结束
  })
}
/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
autoLogin()

if (vuex_token.value) {
  getData()
}

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})

// 下拉刷新
onPullDownRefresh(() => {
  pageNum.value = 1
  scrollTop.value = 0
  dataList.value = []
  loadStatus.value = 'loadmore'
  getData()
  uni.stopPullDownRefresh()
})

onReachBottom(() => {
  getData()
})
</script>

<style lang="scss" scoped>

</style>
