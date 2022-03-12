<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-12 16:19:07
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: 'Hello',
    }
  },
  // watch: {
  //   identity: {
  //     handler(val) {
  //       uni.setNavigationBarTitle({
  //         title: val === 'company' ? '牛人广场' : '职位广场',
  //       })
  //     },
  //     immediate: true,
  //   },
  // },
  computed: {
    ...mapState('appState', ['identity']),
  },
  onReady() {
    uni.setNavigationBarTitle({
      title: this.identity === 'company' ? '牛人广场' : '职位广场',
    })
  },
  onShow() {
    uni.setNavigationBarTitle({
      title: this.identity === 'company' ? '牛人广场' : '职位广场',
    })
  },
  onLoad() {},
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
