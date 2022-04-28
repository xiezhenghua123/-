<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 17:31:39
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
      status: 'loadmore',
      showItem: true
      // scrollTop: 0
    }
  },

  computed: {
    ...mapState('appState', ['identity', 'isLogin'])
  },
  onReachBottom() {
    this.status = 'loading'
    setTimeout(() => {
      this.status = 'nomore'
    }, 2000)
  },
  onPullDownRefresh() {
    this.refresh()
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
    uni.setNavigationBarTitle({
      title: this.identity === 'company' ? '牛人广场' : '职位广场'
    })
  },

  methods: {
    loginConfirm(status) {
      if (status) {
        this.refresh()
      }
    },
    refresh() {
      this.showItem = false
      this.$nextTick(() => {
        this.showItem = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
