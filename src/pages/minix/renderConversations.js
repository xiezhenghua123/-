/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-07 23:11:54
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 23:22:25
 */
export default {
  methods: {
    renderConversations(content) {
      // this.conversations = content.conversations || []
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
