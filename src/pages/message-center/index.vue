<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-07 23:53:17
-->
<template>
  <view class="content">
    <view v-if="isLogin && identity">
      <conversations v-if="showItem"></conversations>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import conversations from './conversations/conversations.vue'
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
import minix from '../minix/index.js'
// import renderConversations from '../minix/renderConversations'

export default {
  components: {
    conversations,
    confirm,
  },
  mixins: [minix],
  data() {
    return {
      showItem: true,
    }
  },
  onShow() {
    // const self = this
    // this.goEasy.im.latestConversations({
    //   onSuccess: function (result) {
    //     let content = result.content
    //     self.renderConversations(content)
    //   },
    //   onFailed: function (error) {
    //     //获取失败
    //     console.log(
    //       '失败获取最新会话列表, code:' +
    //         error.code +
    //         ' content:' +
    //         error.content
    //     )
    //   },
    // })
  },
  computed: {
    ...mapState('appState', ['identity', 'isLogin']),
  },
  onLoad() {},
  onPullDownRefresh() {
    this.showItem = false
    this.$nextTick(() => {
      this.showItem = true
      uni.stopPullDownRefresh()
    })
  },
  methods: {},
}
</script>

<style></style>
