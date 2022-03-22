<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-22 16:59:01
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-22 22:31:06
-->
<template>
  <view class="content-box size16">
    <view class="every">
      <text>投诉方：</text>
      <text class="font600">{{ initData.complainant }}</text>
    </view>
    <view class="every">
      <text>被投诉方：</text>
      <text class="font600">{{ initData.beComplainant }}</text>
    </view>
    <view class="every">
      <text>涉及岗位（工作内容）：</text>
      <text class="font600">{{ initData.content }}</text>
    </view>
    <view class="every flex-column">
      <text>投诉原因：</text>
      <u--text :text="initData.reason" wordWrap="anyWhere"></u--text>
    </view>
    <view class="every flex-column">
      <text>惩罚措施：</text>
      <u--text :text="initData.measure" wordWrap="anyWhere"></u--text>
    </view>
    <view class="every">
      <text>投诉状态</text>
      <text class="font600" :class="[getColor(initData.status)]">{{
        getStatus(initData.status)
      }}</text>
    </view>
    <view class="every">
      <text>投诉时间：</text>
      <text>{{ initData.time }}</text>
    </view>
  </view>
</template>
<script>
import minix from '../minix/index.js'
export default {
  mixins: [minix],

  data() {
    return {
      initData: {},
    }
  },
  onLoad(options) {
    this.initData = JSON.parse(options.object)
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
@import '../style.scss';
</style>
