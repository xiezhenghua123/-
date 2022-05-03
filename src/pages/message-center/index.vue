<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 16:51:10
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
    confirm
  },
  mixins: [minix],
  data() {
    return {
      showItem: true
    }
  },
  onShow() {
    this.refresh()
  },
  computed: {
    ...mapState('appState', ['identity', 'isLogin'])
  },
  onLoad() {},
  onPullDownRefresh() {
    this.refresh()
    uni.stopPullDownRefresh()
  },
  methods: {
    refresh() {
      this.showItem = false
      this.$nextTick(() => {
        this.showItem = true
      })
    }
  }
}
</script>

<style></style>
