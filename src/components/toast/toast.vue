<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-20 21:01:41
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-15 18:25:39
-->
<template>
  <view>
    <u-toast ref="toast" />
  </view>
</template>
<script>
export default {
  name: 'toast',
  data() {
    return {}
  },
  methods: {},
  mounted() {
    getApp().globalData.toast = this.$refs.toast
  }
}
</script>
