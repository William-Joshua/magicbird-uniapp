<template>
  <!-- 内容区 -->
  <view v-show="vuex_token" style="display:flex; flex-direction:column; height: 100vh;">
    <!-- tab区 -->
    <view v-if="tabList.length > 1" style="background-color: inherit;">
      <!-- 只能有一个根元素 -->
      <u-tabs-swiper
        ref="todoMainTabs"
        height="80"
        class="u-flex u-row-between"
        active-color="#e3011f"
        :list="tabList"
        :current="tabCurrent"
        :is-scroll="false"
        swiper-width="750"
        @change="tabChange"
      />
    </view>

    <!-- 主区域 -->
    <swiper
      class="u-flex-1"
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <!--swiper-item,宽高自动设置为100%。宽高100%是相对于其父组件，不是相对于子组件，不能被子组件自动撑开。-->
      <swiper-item v-for="(tabItem, tabIndex) in tabList" :key="tabIndex">
        <scroll-view
          style="height: calc(100vh - 80rpx)"
          :scroll-y="true"
          lower-threshold="500"
          :scroll-top="tabItem.scrollTop"
          @scroll="tabSwiperScroll"
          @scrolltolower="reachBottom"
        >
          <!-- 空状态 -->
          <view v-if="tabItem.status === 'nodata'" class="u-flex-col u-row-center" style="height: 800rpx">
            <u-empty text="暂无数据,先逛逛其他吧!" mode="list" />
          </view>
          <view v-else>
            {{ tabItem.data }}
            <!-- 加载状态 -->
            <u-loadmore margin-top="24" margin-bottom="24" class="u-p-b-24" :status="tabItem.status" />
          </view>
        </scroll-view>

        <!-- 返回顶部,滑动超过2屏 -->
        <view v-show="tabItem.oldScrollTop > 1600" style="position: fixed;bottom: 86rpx;right: 32rpx;">
          <u-button
            :hair-line="false"
            :custom-style="{width: '84rpx',height: '84rpx',borderRadius: '50%',backgroundColor: '#f1f1f1'}"
            @click="goTop"
          >
            <u-icon size="40rpx" name="arrow-upward" />
          </u-button>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { onMounted, ref, computed, watch, reactive, nextTick } from 'vue'
import { onShow, onReady, onHide, onUnload, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import useUserStore from '/src/store/modules/user'

/**
 * ==================================================== props/emits ====================================================
 */

/**
 * ==================================================== data ====================================================
 */
const { vuex_token, vuex_user, autoLogin } = useUserStore()

const todoMainTabs = ref()
const tabCurrent = ref(0) // tabs组件的current值，表示当前活动的tab选项
const swiperCurrent = ref(0) // swiper组件的current值，表示当前那个swiper-item是活动的
const pageSize = ref(10)

const tabList = reactive([{
  name: 'TODO1',
  status: 'loadmore', // 共4种状态nodata、nomore、loading、loadmore
  scrollTop: 0,
  oldScrollTop: 0,
  pageNum: 1,
  count: 0,
  queryObj: {
    descs: 'id'
  },
  data: []
}, {
  name: 'TODO2',
  status: 'loadmore', // 共4种状态nodata、nomore、loading、loadmore
  scrollTop: 0,
  oldScrollTop: 0,
  pageNum: 1,
  count: 0,
  queryObj: {
    descs: 'id'
  },
  data: []
}])
/**
 * ==================================================== computed ====================================================
 */

/**
 * ==================================================== methods ====================================================
 */
// tabs通知swiper切换
const tabChange = (index) => {
  // 当前tab再次点击刷新
  if (swiperCurrent.value === index) {
    tabList[index].status = 'loadmore'
    tabList[index].pageNum = 1
    tabList[index].oldScrollTop = 0
    tabList[index].scrollTop = 0
    tabList[index].data = []
    getDataList(index)
  }
  swiperCurrent.value = index
}

// scroll-view到底部加载更多
const reachBottom = () => {
  getDataList()
}

// swiper-item左右移动，通知tabs的滑块跟随移动
const transition = (e) => {
  const dx = e.detail.dx
  todoMainTabs.value.setDx(dx)
}

// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
// swiper滑动结束，分别设置tabs和swiper的状态
const animationfinish = (e) => {
  const current = e.detail.current
  todoMainTabs.value.setFinishCurrent(current)
  swiperCurrent.value = current
  tabCurrent.value = current
}

const tabSwiperScroll = (e) => {
  const tabIndex = swiperCurrent.value
  tabList[tabIndex].oldScrollTop = e.detail.scrollTop
}

const goTop = () => {
  const tabIndex = swiperCurrent.value
  // 将要滚动的位置同步并重置为0
  tabList[tabIndex].scrollTop = tabList[tabIndex].oldScrollTop
  nextTick(function() {
    tabList[tabIndex].oldScrollTop = 0
    tabList[tabIndex].scrollTop = 0
  })
}

const getDataList = (curIndex) => {
  // 当前选项卡及当前选项卡页数
  const tabIndex = curIndex == null ? swiperCurrent.value : curIndex
  const tabPageNum = tabList[tabIndex].pageNum // 当前页
  const tabQueryObj = tabList[tabIndex].queryObj // 当前查询参数

  // 有更多数据
  if (tabList[tabIndex].status === 'loadmore') {
    tabList[tabIndex].status = 'loading' // 加载中
    const queryData = uni.$u.deepMerge(tabQueryObj, {
      pageNum: tabPageNum,
      pageSize: pageSize.value
    })
    todos(queryData).then(({ code, msg, data }) => {
      const resData = data.records == null ? [] : data.records
      if (tabPageNum === 1 && resData.length === 0) {
        tabList[tabIndex].status = 'nodata' // 没有数据
      } else if (resData.length < queryData.pageSize) {
        tabList[tabIndex].data = tabList[tabIndex].data.concat(resData)
        tabList[tabIndex].pageNum += 1
        tabList[tabIndex].status = 'nomore' // 没有更多
      } else {
        tabList[tabIndex].data = tabList[tabIndex].data.concat(resData)
        tabList[tabIndex].pageNum += 1
        tabList[tabIndex].status = 'loadmore' // 加载结束
      }
    }).catch(e => {
      tabList[tabIndex].status = 'loadmore' // 加载结束
    })
  } else {
    // console.log(tabIndex + '选项卡，第' + tabPageNum + '页，不能加载更多')
  }
}
/**
 * ==================================================== watch ====================================================
 */

/**
 * ==================================================== init ====================================================
 */
autoLogin()

if (vuex_token.value) {
  tabList.forEach((item, tabIndex) => {
    getDataList(tabIndex)
  })
}
</script>

<style lang="scss" scoped>

</style>
