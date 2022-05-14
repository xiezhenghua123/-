<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-22 16:59:01
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 17:39:35
-->
<template>
  <view class="content-box size16">
    <view class="every">
      <text>投诉方：</text>
      <text class="font600">{{ initData.fromName }}</text>
    </view>
    <view class="every">
      <text>被投诉方：</text>
      <text class="font600">{{ initData.toName }}</text>
    </view>
    <view class="every">
      <text>涉及岗位（工作内容）：</text>
      <text class="font600">{{ initData.work }}</text>
    </view>
    <view class="every flex-column">
      <text>投诉原因：</text>
      <u--text
        :text="initData.content"
        wordWrap="anyWhere"
        margin="5"
      ></u--text>
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
      <text>{{ timeFormat(initData.created_at) }}</text>
    </view>
  </view>
</template>
<script>
import minix from '../minix/index.js'
import { getDetailById } from '@/api/complain.js'
export default {
  mixins: [minix],

  data() {
    return {
      initData: {}
    }
  },
  onLoad({ id }) {
    getDetailById(id).then(({ data }) => {
      this.initData = data
    })
  },
  methods: {
    timeFormat(time) {
      return time.replace(/T/g, ' ').replace(/\.[\d]{6}Z/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
@import '../style.scss';
</style>
