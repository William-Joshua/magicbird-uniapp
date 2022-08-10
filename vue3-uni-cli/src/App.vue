<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  onPageNotFound: function() {
    uni.switchTab({
      url: '/pages/index'
    })
    console.log('App Page Not Found')
  },
  onUnhandledRejection: function(e) {
    console.log(e)
  },
  onError: function(e) {
    console.log(e)
  }
}
</script>

<style lang="scss">
  @import "./static/styles/index.scss";
	/*每个页面公共css */
  page {
    font-family: -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #f7f7f7;
  }
</style>
