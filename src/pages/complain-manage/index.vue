<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-21 18:35:48
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 13:28:51
-->
<template>
  <view>
    <view
      v-for="(item, index) in initData"
      :key="index"
      class="container m-10"
      @click="clickToDetails(item)"
      ><u-swipe-action>
        <u-swipe-action-item :options="options">
          <view class="box">
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
        </u-swipe-action-item> </u-swipe-action
    ></view>
  </view>
</template>
<script>
import minix from './minix/index.js'
export default {
  name: 'complainant',
  mixins: [minix],
  data() {
    return {
      options: [
        {
          text: '撤销',
          style: {
            backgroundColor: '#dd524d'
          }
        }
      ],
      initData: [
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '琴湖拿快递到南苑',
          status: 'pending',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00'
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '琴湖拿快递到南苑',
          status: 'pending',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00'
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: 'java工程师',
          status: 'resolve',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00'
        },
        {
          complainant: '王五',
          beComplainant: '上海合合科技',
          content: '前端工程师',
          status: 'error',
          reason: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxx',
          measure: 'xxxxxxxxxxxxxxxxxxxxxxxxx\nxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          time: '2022-2-14-16:00'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
