<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 13:09:37
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
    <my-release v-if="current === 0"></my-release>
    <view v-else>已完成</view>
  </view>
</template>
<script>
import myRelease from '@/pages/my-release/index.vue'
export default {
  components: { myRelease },
  data() {
    return {
      current: 0,
      list: [{ name: '我的发布' }, { name: '已完成' }],
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      }
    }
  },
  methods: {
    click(data) {
      this.current = data.index
    }
  }
}
</script>
