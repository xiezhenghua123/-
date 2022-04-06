/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 14:50:36
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 19:43:50
 */
import { mapState } from 'vuex'
export default {
  data() {
    return {
      timer: null,
      show: true,
    }
  },
  computed: {
    ...mapState('appState', ['identity', 'isLogin']),
  },
  onShow() {
    if (this.isLogin && this.identity) {
      uni.showLoading()
      //监听会话列表变化
      let self = this
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, content => {
        self.renderConversations(content)
      })
      //加载会话列表
      this.goEasy.im.latestConversations({
        onSuccess: function (result) {
          let content = result.content
          self.renderConversations(content)
          uni.hideLoading()
        },
        onFailed: function (error) {
          //获取失败
          uni.hideLoading()
          console.log(
            '失败获取最新会话列表, code:' +
              error.code +
              ' content:' +
              error.content
          )
        },
      })
    }
  },
  onPageScroll(res) {
    clearTimeout(this.timer)
    this.show = false
    this.timer = setTimeout(() => {
      this.show = true
    }, 300)
  },
  methods: {
    renderConversations(content) {
      this.conversations = content.conversations || []
      let unreadTotal = content.unreadTotal
      this.setUnreadAmount(unreadTotal)
    },
    setUnreadAmount(unreadTotal) {
      if (unreadTotal > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: unreadTotal.toString(),
        })
      } else {
        uni.removeTabBarBadge({
          index: 3,
        })
      }
    },
  },
}
