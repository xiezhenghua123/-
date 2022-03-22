<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-21 18:35:48
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-22 22:38:58
-->
<template>
  <view>
    <block v-for="(item, index) in initData" :key="index">
      <view class="box" @click="clickToDetails(item)">
        <view class="box-left">
          <text class="name">{{ item.complainant }}</text>
          <text class="status" :class="[getColor(item.status)]">{{
            getStatus(item.status)
          }}</text>
          <view class="content"
            >岗位（工作内容）：<text class="detail">{{
              item.content
            }}</text></view
          >
        </view>
        <view class="box-right">
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </block>
  </view>
</template>
<script>
import minix from '../minix/index.js'
export default {
  name: 'beComplainant',
  mixins: [minix],
  data() {
    return {
      initData: [
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '琴湖拿快递到南苑',
          status: 'resolve',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00',
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '琴湖拿快递到南苑',
          status: 'resolve',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00',
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: 'java工程师',
          status: 'resolve',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00',
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '前端工程师',
          status: 'resolve',
          reason:
            'xxxxxxxxxx\n        xxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00',
        },
      ],
    }
  },

  methods: {},
}
</script>
<style lang="scss" scoped>
@import '../style.scss';
</style>
