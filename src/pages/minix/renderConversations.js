/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-07 23:11:54
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 16:39:06
 */
import { getNotice } from '@/api/notice.js'

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('appState', ['userInfo', 'identity'])
  },
  methods: {
    async getComplainNoticeData() {
      const noticeData = await getNotice(this.userInfo.openid)
      const userType = this.identity == 'student' ? '1' : '2'
      const complainData = noticeData.data.filter(item => {
        const content = JSON.parse(item.content)
        return (
          content.type == 'complain' &&
          content.userType == userType &&
          item.status == 2
        )
      })
      return new Promise((res, rej) => {
        res(complainData)
      })
    },
    async renderConversations(content = {}) {
      // this.conversations = content.conversations || []
      const noticeData = await this.getComplainNoticeData()
      console.log(noticeData)
      let unreadTotal = content['unreadTotal'] || 0
      this.setUnreadAmount(unreadTotal, noticeData.length)
    },
    setUnreadAmount(unreadTotal, noticeTotal) {
      unreadTotal = unreadTotal + noticeTotal
      if (unreadTotal > 0) {
        uni.setTabBarBadge({
          index: 3,
          text: unreadTotal.toString()
        })
      } else {
        uni.removeTabBarBadge({
          index: 3
        })
      }
    }
  }
}
