<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-13 14:01:58
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 21:35:01
-->
<template>
  <!-- <view></view> -->
  <view class="edit">
    <u-button
      :type="type"
      :text="text"
      :shape="shape"
      @click="click"
    ></u-button>
  </view>
</template>
<script>
export default {
  name: 'fixed-button',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    text: {
      type: String,
      default: ''
    },
    shape: {
      type: String,
      default: 'circle'
    }
  },

  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.edit {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
