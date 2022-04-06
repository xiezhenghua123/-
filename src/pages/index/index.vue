<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 20:22:23
-->
<template>
  <view>
    <view v-if="identity && isLogin">
      <view v-if="showItem">
        <job-square v-if="identity === 'student'"></job-square>
        <talent-market v-else></talent-market>
        <u-loadmore :status="status" />
      </view>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
import jobSquare from './job-square/index.vue'
import talentMarket from './talent-market/index.vue'
import minix from '../minix/index'

export default {
  components: {
    confirm,
    jobSquare,
    talentMarket,
  },
  mixins: [minix],
  data() {
    return {
      status: 'loadmore',
      showItem: true,
    }
  },

  computed: {
    ...mapState('appState', ['identity', 'isLogin']),
  },
  onReachBottom() {
    this.status = 'loading'
    setTimeout(() => {
      this.status = 'nomore'
    }, 2000)
  },
  onPullDownRefresh() {
    this.showItem = false
    this.$nextTick(() => {
      ;(this.showItem = true), uni.stopPullDownRefresh()
    })
  },
  onReady() {},
  onShow() {
    uni.setNavigationBarTitle({
      title: this.identity === 'company' ? '牛人广场' : '职位广场',
    })
  },
  onLoad() {
    this.$methods.chat.connect(this)
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
