<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 18:16:45
-->
<template>
  <view>
    <u-toast ref="uToast"></u-toast>
    <view v-if="isLogin && identity" class="box">
      <u-swiper :list="list1"></u-swiper>
      <u-parse :content="html" :tagStyle="style" @linkTap="linkTap"></u-parse>
      <u-loadmore :status="status" />
    </view>
    <confirm v-else @isLogin="loginConfirm"></confirm>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import confirm from '@/components/confirm/index.vue'
import { getJobList } from '@/api/getJobList.js'
import { getBanList } from '@/api/commonApi.js'

export default {
  components: {
    confirm
  },
  data() {
    return {
      status: 'loading',
      html: '',
      style: {
        img: 'height: 55px;width: 55px;'
      },
      page: 1,
      list1: [
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png'
      ]
    }
  },
  onLoad() {
    if (this.isLogin) {
      this.init()
    }
  },
  onReachBottom() {
    this.status = 'loading'
    this.getList()
      .then(() => {
        this.status = 'loadmore'
      })
      .catch(rej => {
        this.status = 'nomore'
      })
  },
  onPullDownRefresh() {
    this.init()
    uni.stopPullDownRefresh()
  },
  methods: {
    init() {
      this.getList(true)
      getBanList(1)
        .then(({ data }) => {
          console.log(1)
          const array = data.bannerList.map(item => {
            return item.image
          })
          this.list1 = array
        })
        .catch(() => {
          this.$refs.uToast.show({
            type: 'error',
            message: '加载失败'
          })
        })
    },
    loginConfirm(status) {
      if (status) {
        this.init()
      }
    },
    linkTap(obj) {
      console.log(obj)
    },
    getList(first = false) {
      return new Promise((resolve, reject) => {
        getJobList({ page: first ? 1 : ++this.page })
          .then(res => {
            this.html = first ? res.data : this.html + res.data
            resolve()
          })
          .catch(rej => {
            reject(rej)
          })
      })
    }
  },
  computed: {
    ...mapState('appState', ['isLogin', 'identity'])
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
