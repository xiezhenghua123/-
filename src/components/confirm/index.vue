<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 22:44:27
-->
<template>
  <view>
    <view class="confirm-button" :style="{ 'margin-top': marT + 'rpx' }">
      <u-button size="large" type="primary" @click="confirm">{{
        isLogin ? '点击认证' : '点击登录'
      }}</u-button>
    </view>
    <view>
      <u-popup :show="confirmShow" @close="close">
        <view>
          <u-button size="large" @click="studentShow = true">我是学生</u-button>
          <u-button size="large" @click="companyShow = true">我是企业</u-button>
        </view>
      </u-popup>
    </view>
    <!-- 学生认证 -->
    <student
      :studentShow.sync="studentShow"
      @statusUpdate="statusUpdate"
    ></student>
    <!-- 企业认证 -->
    <company
      :companyShow.sync="companyShow"
      @statusUpdate="statusUpdate"
    ></company>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import student from './student/index.vue'
import company from './company/index.vue'

export default {
  props: {
    marT: {
      type: Number,
      default: 300,
      validator: function (value) {
        return value > 0
      },
    },
  },
  name: 'confirm',
  components: {
    student: student,
    company: company,
  },
  data() {
    return {
      companyShow: false,
      confirmShow: false,
      studentShow: false,
    }
  },
  onReady() {},
  computed: {
    ...mapState('appState', ['isLogin']),
  },
  methods: {
    ...mapActions('appState', ['setLogin', 'setUserInfo']),
    statusUpdate(val) {
      this.confirmShow = !val
    },

    confirm() {
      const that = this
      wx.login({
        success(res) {
          if (res.code) {
          }
        },
      })
      wx.getUserProfile({
        desc: '获取头像',
        success(res) {
          that.setLogin(true)
          that.setUserInfo(res.userInfo)
        },
        fail(res) {
          console.log(res)
        },
      })
    },

    close() {
      this.confirmShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.confirm-button {
  font-size: $uni-font-size-lg;
  width: 200rpx;
  margin: 0 auto;
}
</style>
