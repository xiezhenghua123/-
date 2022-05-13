<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 22:50:35
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
    <full-time
      v-if="current === 1"
      :initData="fullTimeData"
      @filter="filter"
    ></full-time>
    <part-time v-else :initData="partTimeData" @filter="filter"></part-time>
    <u-loadmore :status="status" @loadmore="getMore" v-if="loadmoreShow" />
  </view>
</template>

<script>
import fullTime from './fullTime/index.vue'
import partTime from './partTime/index.vue'
import { allJob } from '@/api/recruit.js'
import { mapState } from 'vuex'

export default {
  components: {
    fullTime,
    partTime
    // Toast
  },
  watch: {
    current() {
      this.init()
    }
  },
  data() {
    return {
      status: 'loadmore',
      current: uni.getStorageSync('current') || '0',
      fullTimePage: 1,
      partTimePage: 1,
      activeStyle: {
        'font-weight': 'bold',
        color: '#303133'
      },
      fullTimeInitData: [],
      fullTimeFilter: { education: '', salary: '' },
      partTimeInitData: [],
      partTimeFilter: { education: '', salary: '' },
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
    ...mapState('appState', ['userInfo']),
    loadmoreShow() {
      if (this.current == '0') {
        return this.partTimeData.length
      } else {
        return this.fullTimeData.length
      }
    },
    fullTimeData() {
      return this.fullTimeInitData
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
      return this.partTimeInitData.filter(item => {
        return item.order_type == 'partTime' && item.status == 2
      })
    }
  },
  mounted() {
    this.init()
    uni.$on('reachBottom', type => {
      if (type) {
        this.getMore()
      }
    })
    uni.$on('pullDownRefresh', type => {
      if (type) {
        this.init()
      }
    })
  },
  methods: {
    async init() {
      if (this.current == '0') {
        this.partTimePage = 1
        this.partTimeInitData = await this.getJobData(
          1,
          { education: '', salary: '' },
          'partTime'
        )
      } else {
        this.fullTimePage = 1
        this.fullTimeInitData = await this.getJobData(
          1,
          { education: '', salary: '' },
          'fullTime'
        )
      }
    },
    getMore() {
      this.status = 'loading'
      if (this.current == '0') {
        this.getJobData(
          ++this.partTimePage,
          this.partTimeFilter,
          'partTme'
        ).then(data => {
          if (data.length) {
            this.partTimeInitData.push(...data)
            this.status = 'loadmore'
          } else {
            this.status = 'nomore'
          }
        })
      } else {
        this.getJobData(
          ++this.fullTimePage,
          this.fullTimeFilter,
          'fullTime'
        ).then(data => {
          if (data.length) {
            this.fullTimeInitData.push(...data)
            this.status = 'loadmore'
          } else {
            this.status = 'nomore'
          }
        })
      }
    },
    async filter({ education, salary, type }) {
      if (!education.length || (education.length == 1 && education[0] == '')) {
        education = ''
      } else {
        if (education[0] == '') {
          education = [...education.slice(1, education.length)]
        } else {
          education = [...education]
        }
      }
      if (!salary.length && Array.isArray(salary)) {
        salary = ''
      }
      if (type == 'partTime') {
        this.partTimePage = 1
        this.partTimeFilter = { education: education, salary: salary }
        this.partTimeInitData = await this.getJobData(
          this.partTimePage,
          { education: education, salary: salary },
          type
        )
      } else {
        this.fullTimePage = 1
        this.fullTimeFilter = { education: education, salary: salary }
        this.fullTimeInitData = await this.getJobData(
          this.fullTimePage,
          { education: education, salary: salary },
          type
        )
      }
    },
    getJobData(page, filter, type) {
      return new Promise(async (res, rej) => {
        try {
          let data = (
            await allJob(page, {
              ...filter,
              type: type,
              workerId: this.userInfo.id
            })
          ).data.workOrderList
          res(data)
        } catch (e) {
          rej(e)
        }
      })
    },
    click(data) {
      this.current = data.index
      uni.setStorageSync('current', data.index)
    }
  }
}
</script>

<style></style>
