/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 14:50:36
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 23:40:15
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
      //监听会话列表变化
      let self = this
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, content => {
        self.renderConversations(content)
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
