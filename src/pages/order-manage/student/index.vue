<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-26 15:36:54
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-26 18:52:36
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
    <release-order v-else></release-order>
  </view>
</template>
<script>
import applyOrder from './apply-order/index.vue'
import releaseOrder from './release-order/index.vue'
export default {
  data() {
    return {
      current: 0,
      list: [{ name: '发布职位订单' }, { name: '应聘职位订单' }],
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133',
      },
    }
  },
  components: {
    applyOrder,
    releaseOrder,
  },
  methods: {
    click(data) {
      this.current = data.index
    },
  },
}
</script>
<style></style>
