<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 18:00:10
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
    <full-time v-if="current === 1" :initData="fullTimeData"></full-time>
    <part-time v-else :initData="partTimeData"></part-time>
  </view>
</template>

<script>
import fullTime from './fullTime/index.vue'
import partTime from './partTime/index.vue'
import { allJob } from '@/api/recruit.js'
export default {
  components: {
    fullTime,
    partTime
  },
  data() {
    return {
      current: '0',
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      },
      fullTimeData: [],
      partTimeData: [],
      list: [
        {
          name: '兼职'
        },
        {
          name: '全职'
        }
      ]
    }
  },
  mounted() {
    allJob(1).then(({ data }) => {
      this.fullTimeData = data.workOrderList
        .filter(item => {
          return item.type == 'fullTime'
        })
        .map(item => {
          return {
            ...item,
            salary: `${JSON.parse(item.salary).min}k-${
              JSON.parse(item.salary).min
            }k`
          }
        })
      this.partTimeData = data.workOrderList.filter(item => {
        return item.type == 'partTime'
      })
    })
  },
  methods: {
    click(data) {
      this.current = data.index
    }
  }
}
</script>

<style></style>
