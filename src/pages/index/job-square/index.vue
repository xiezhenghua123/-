<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-30 16:08:34
-->
<template>
  <view>
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="list"
        :scrollable="false"
        :current="current"
        :activeStyle="activeStyle"
        @click="click"
      ></u-tabs>
    </u-sticky>
    <full-time v-if="current === 1"></full-time>
    <part-time v-else></part-time>
  </view>
</template>

<script>
import fullTime from './fullTime/index.vue'
import partTime from './partTime/index.vue'
export default {
  components: {
    fullTime,
    partTime,
  },
  data() {
    return {
      current: '0',
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133',
      },
      list: [
        {
          name: '兼职',
        },
        {
          name: '全职',
        },
      ],
    }
  },
  onLoad() {},
  methods: {
    click(data) {
      this.current = data.index
    },
  },
}
</script>

<style></style>
