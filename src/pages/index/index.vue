<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-31 19:52:44
-->
<template>
  <view>
    <view v-if="identity && isLogin">
      <job-square v-if="identity === 'student'"></job-square>
      <talent-market v-else></talent-market>
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
import jobSquare from './job-square/index.vue'
import talentMarket from './talent-market/index.vue'

export default {
  components: {
    confirm,
    jobSquare,
    talentMarket,
  },
  data() {
    return {
      title: 'Hello',
    }
  },

  computed: {
    ...mapState('appState', ['identity', 'isLogin']),
  },
  onReady() {},
  onShow() {
    uni.setNavigationBarTitle({
      title: this.identity === 'company' ? '牛人广场' : '职位广场',
    })
  },
  onLoad() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
