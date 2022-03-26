<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-25 11:35:34
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-25 16:39:45
-->
<template>
  <view :class="{ bg: show }" @touchstart="show = true" @touchend="show = false"
    ><slot></slot
  ></view>
</template>
<script>
export default {
  name: 'touch-hover',
  data() {
    return {
      show: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: $uni-bg-color-hover;
}
</style>
