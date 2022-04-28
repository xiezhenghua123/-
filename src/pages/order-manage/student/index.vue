<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-26 15:36:54
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 12:46:16
-->
<template>
  <view>
    <u-sticky bgColor="#fff">
      <view class="tabs">
        <u-tabs
          :list="list"
          :current="current"
          @click="click"
          :activeStyle="activeStyle"
          lineWidth="70"
          :scrollable="false"
        ></u-tabs>
      </view>
    </u-sticky>
    <apply-order v-if="current === 1"></apply-order>
    <release-order v-else-if="current === 0"></release-order>
    <view v-else>已完成</view>
  </view>
</template>
<script>
import applyOrder from './apply-order/index.vue'
import releaseOrder from './release-order/index.vue'
export default {
  data() {
    return {
      current: 0,
      list: [{ name: '我的发布' }, { name: '我的应聘' }, { name: '已完成' }],
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      }
    }
  },
  components: {
    applyOrder,
    releaseOrder
  },
  methods: {
    click(data) {
      this.current = data.index
    }
  }
}
</script>
<style></style>
