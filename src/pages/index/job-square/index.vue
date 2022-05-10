<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-08 14:49:40
-->
<template>
  <view>
    <toast></toast>
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

// import { mapState } from 'vuex'
export default {
  props: {
    initData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    fullTime,
    partTime
    // Toast
  },
  data() {
    return {
      current: '0',
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      },
      // fullTimeData: [],
      // partTimeData: [],
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
  computed: {
    // ...mapState('appState', ['userInfo']),
    fullTimeData() {
      return this.initData
        .filter(item => {
          return item.order_type == 'fullTime' && item.status == 2
        })
        .map(item => {
          return {
            ...item,
            salary: `${JSON.parse(item.salary).min}k-${
              JSON.parse(item.salary).max
            }k`
          }
        })
    },
    partTimeData() {
      return this.initData.filter(item => {
        return item.order_type == 'partTime' && item.status == 2
      })
    }
  },
  mounted() {},
  methods: {
    click(data) {
      this.current = data.index
    }
  }
}
</script>

<style></style>
