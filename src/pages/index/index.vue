<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 15:58:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 18:16:01
-->
<template>
  <view>
    <toast></toast>
    <view v-if="identity && isLogin">
      <job-square
        v-if="identity === 'student'"
        :initData="jobData"
      ></job-square>
      <talent-market v-else :initData="resumeData"></talent-market>
      <u-loadmore :status="status" @loadmore="getMore" v-if="loadmoreShow" />
    </view>
    <confirm v-else @isLogin="loginConfirm"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
import jobSquare from './job-square/index.vue'
import talentMarket from './talent-market/index.vue'
import minix from '../minix/index'
import { allJob } from '@/api/recruit.js'
import { getResumeList } from '@/api/resume.js'
export default {
  components: {
    confirm,
    jobSquare,
    talentMarket
  },
  mixins: [minix],
  data() {
    return {
      status: 'loadmore',
      showItem: true,
      // scrollTop: 0,
      jobPage: 1,
      jobData: [],
      resumeData: [],
      resumePage: 1
    }
  },

  computed: {
    ...mapState('appState', ['identity', 'isLogin', 'userInfo']),
    loadmoreShow() {
      if (this.userInfo.identity == 'student') {
        return this.jobData.length
      } else {
        return this.resumeData.length
      }
    }
  },
  onReachBottom() {
    this.getMore()
  },

  onPullDownRefresh() {
    this.init()
    uni.stopPullDownRefresh()
    this.status = 'loadmore'
  },
  // onPageScroll: uni.$u.debounce(function (e) {
  //   console.log(e)
  //   if (this.scrollTop > scrollTop) {
  //     uni.$emit('scrollTop', true)
  //   } else {
  //     uni.$emit('scrollTop', false)
  //   }
  //   this.scrollTop = scrollTop
  // }, 500),
  // onPageScroll({ scrollTop }) {
  //   console.log(scrollTop)
  //   if (this.scrollTop > scrollTop) {
  //     uni.$emit('scrollTop', true)
  //   } else {
  //     uni.$emit('scrollTop', false)
  //   }
  //   this.scrollTop = scrollTop
  // },
  onReady() {},
  onShow() {
    this.setTitle()
  },
  onLoad() {
    if (this.isLogin) {
      this.init()
    }
  },
  methods: {
    setTitle() {
      uni.setNavigationBarTitle({
        title: this.identity === 'company' ? '牛人广场' : '职位广场'
      })
    },
    getMore() {
      this.status = 'loading'
      if (this.identity == 'student') {
        this.getJobData().then(data => {
          if (data.length) {
            this.jobData.push(...data)
            this.status = 'loadmore'
          } else {
            this.status = 'nomore'
          }
        })
      } else {
        this.getResumeData().then(data => {
          if (data.length) {
            this.resumeData.push(...data)
            this.status = 'loadmore'
          } else {
            this.status = 'nomore'
          }
        })
      }
    },
    async init() {
      this.jobData = await this.getJobData(true)
      this.resumeData = await this.getResumeData(true)
    },
    getResumeData(firstType = false) {
      return new Promise(async (res, rej) => {
        try {
          let data = (
            await getResumeList(
              firstType ? 1 : ++this.resumePage,
              this.userInfo.id
            )
          ).data.resumeList
          res(data)
        } catch (e) {
          rej(e)
        }
      })
    },
    getJobData(firstType = false) {
      return new Promise(async (res, rej) => {
        try {
          let data = (
            await allJob(firstType ? 1 : ++this.jobPage, this.userInfo.id)
          ).data.workOrderList
          res(data)
        } catch (e) {
          rej(e)
        }
      })
    },
    loginConfirm(status) {
      if (status) {
        this.init()
        this.setTitle()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
