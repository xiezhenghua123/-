<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 19:26:51
-->
<template>
  <view>
    <view v-if="isLogin && identity" class="box">
      <web-view src="https://xtu.jysd.com/teachin"></web-view>
      <!-- <view v-html="html"></view> -->
    </view>
    <confirm v-else></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
// import { getJobList } from '../../request/index.js'

export default {
  components: {
    confirm,
  },
  data() {
    return {
      title: 'Hello',
      html: '',
    }
  },
  onLoad() {
    // getJobList().then(res => {
    //   this.html = res.data
    // })
  },
  methods: {},
  computed: {
    ...mapState('appState', ['isLogin', 'identity']),
  },
}
</script>

<style lang="scss" scoped>
.box {
  ::v-deep .containers .searchbox {
    display: none;
  }
}
</style>
