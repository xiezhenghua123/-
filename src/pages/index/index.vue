<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 21:08:24
-->
<template>
  <view>
    <toast></toast>
    <view v-if="identity && isLogin">
      <job-square v-if="identity === 'student'"></job-square>
      <talent-market v-else></talent-market>
    </view>
    <confirm v-else @isLogin="loginConfirm"></confirm>
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
    talentMarket
  },
  mixins: [minix],
  data() {
    return {
      // scrollTop: 0,
    }
  },

  computed: {
    ...mapState('appState', ['identity', 'isLogin', 'userInfo'])
  },
  onReachBottom() {
    uni.$emit('reachBottom', true)
  },
  onPullDownRefresh() {
    uni.$emit('pullDownRefresh', true)
    uni.stopPullDownRefresh()
  },
  // onPageScroll: uni.$u.debounce(function (e) {
  //   console.log(e)
  //   if (this.scrollTop > scrollTop) {
  //     uni.$emit('scrollTop', true)
  //   } else {
  //     uni.$emit('scrollTop', false)
  //   }
  //   this.scrollTop = scrollTop
  // }, 500),
  // onPageScroll({ scrollTop }) {
  //   console.log(scrollTop)
  //   if (this.scrollTop > scrollTop) {
  //     uni.$emit('scrollTop', true)
  //   } else {
  //     uni.$emit('scrollTop', false)
  //   }
  //   this.scrollTop = scrollTop
  // },
  onReady() {},
  onShow() {
    this.setTitle()
  },
  onLoad() {},
  methods: {
    setTitle() {
      uni.setNavigationBarTitle({
        title: this.identity === 'company' ? '牛人广场' : '职位广场'
      })
    },

    loginConfirm(status) {
      if (status) {
        this.setTitle()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
