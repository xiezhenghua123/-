<template>
  <view class="container" @click="toolTip = false" style="height: 100%">
    <u-toast ref="uToast"></u-toast>
    <view class="top">
      <view class="message">
        <u-avatar :src="userInfo.avatar" size="60"></u-avatar>
        <view class="m_right" v-if="isLogin">
          <view class="message_name">{{ userInfo.name }}</view>
          <view class="flex">
            <view class="message_identity">{{ getIdentity() }}</view>
            <view class="credit-points-box flex ml-10" v-if="identity">
              信用分：<span>{{ userInfo.credit_score }}分</span
              ><i
                class="iconfont icon-help"
                @click.stop="toolTip = !toolTip"
              ></i>
              <span v-if="toolTip" class="toolTip">{{ toolText }}</span>
            </view>
          </view>
        </view>
        <view v-else class="m_right">
          <view class="message_name">请登录</view>
        </view>
      </view>
      <view class="change-identity" @click="change">
        <i class="iconfont icon-jiantou_zuoyouqiehuan"></i>
        <text class="text">切换身份</text>
      </view>
    </view>
    <view class="divider">
      <u-divider></u-divider>
    </view>
    <view class="content" v-if="identity && isLogin">
      <!-- <view class="profit-loss p-10" v-if="identity === 'student'">
        <view class="all mb-10">盈亏：xx（元） </view>
        <view class="flex">
          <view class="income">收入：xx（元）</view>
          <view class="disbursement">支出：xx（元）</view>
        </view>
      </view> -->
      <block v-for="item in feature_data" :key="item.key">
        <view @click="clickFeature(item.key)" class="content_every">
          <view class="feature">
            <view class="left">
              <i
                class="iconfont"
                :style="{ color: item.iconColor, 'font-style': 'normal' }"
                :class="[item.icon, 'feature_logo']"
              ></i>
              <text class="feature_name">{{ item.name }}</text>
            </view>
            <view class="right">
              <u-icon name="arrow-right"></u-icon>
            </view>
          </view>
          <view class="line">
            <u-line margin="10rpx 0 10rpx 0"></u-line>
          </view>
        </view>
      </block>
    </view>
    <confirm v-else></confirm>
    <!-- 身份切换 -->
    <u-modal
      :show="confirmAnother"
      showCancelButton
      @cancel="confirmAnotherCancel"
      @confirm="confirmAnotherConfirm"
    >
      <view>
        您暂未进行<text class="f-bold">{{ getAnotherName() }}</text
        >认证，是否进行认证？
      </view>
    </u-modal>
    <company
      :companyShow.sync="companyShow"
      @statusUpdate="getConfirmData"
    ></company>
    <student
      :studentShow.sync="studentShow"
      @statusUpdate="getConfirmData"
    ></student>
  </view>
</template>

<script>
import { checkConfirm, authenticate } from '@/api/user.js'
import feature_data from '../../data/feature.js'
import confirm from '@/components/confirm/index.vue'
import company from '@/components/confirm/company/index.vue'
import student from '@/components/confirm/student/index.vue'
import { mapState, mapActions } from 'vuex'
import renderConversations from '@/pages/minix/renderConversations'

export default {
  components: {
    confirm: confirm,
    student: student,
    company: company
  },
  mixins: [renderConversations],
  data() {
    return {
      companyShow: false,
      studentShow: false,
      confirmAnother: false,
      src: '/static/logo.png',
      name: '黄汉雄',
      feature_data: [],
      toolTip: false,
      toolText: '信用分满分100分，低于80分将无法进行职位应聘和发布'
    }
  },
  watch: {
    identity: {
      handler(val) {
        if (this.identity === 'company') {
          this.feature_data = feature_data.company
          this.toolText = '信用分满分:100分，低于80分将无法进行职位发布'
        } else {
          this.feature_data = feature_data.student
          this.toolText = '信用分满分:100分，低于80分将无法进行职位应聘和发布'
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('appState', ['isLogin', 'identity', 'userInfo'])
  },
  onLoad() {},
  methods: {
    ...mapActions('appState', ['setIdentity', 'setUserInfo']),
    getConfirmData({ confirmData, type }) {
      let data = {}
      if (type == 1) {
        data = {
          type: type,
          openid: this.userInfo.openid,
          avatar: this.userInfo.avatar,
          name: confirmData.name,
          phone: confirmData.tel,
          major: confirmData.major,
          college: confirmData.college,
          uid: confirmData.number
        }
      } else {
        data = {
          type: type,
          openid: this.userInfo.openid,
          avatar: this.userInfo.avatar,
          name: confirmData.name,
          phone: confirmData.tel,
          industry: confirmData.industry,
          legal_person: confirmData.legalPerson,
          code: confirmData.number
        }
      }
      authenticate(data).then(data => {
        this.confirmShow = false
        this.$refs.uToast.show({
          message: '提交成功，管理员将在1-2天内进行审核',
          type: 'success'
        })
      })
    },
    confirmAnotherCancel() {
      this.confirmAnother = false
    },
    confirmAnotherConfirm() {
      this.confirmAnother = false
      if (this.identity === 'student') {
        this.companyShow = true
      } else {
        this.studentShow = true
      }
    },
    getAnotherName() {
      if (this.identity === 'student') {
        return '企业'
      } else if (this.identity === 'company') {
        return '学生'
      }
    },
    getIdentity() {
      if (!this.identity) {
        return '请认证'
      } else {
        return this.identity == 'student' ? '学生' : '企业'
      }
    },
    change() {
      if (!this.isLogin) {
        this.$refs.uToast.show({
          message: '请先登录',
          type: 'error'
        })
        return false
      }

      if (this.identity == 'student') {
        this.check(2)
      } else {
        this.check(1)
      }
    },
    // 检查身份
    check(type) {
      const that = this
      wx.login({
        success({ code }) {
          checkConfirm({ js_code: code, type: type }).then(async data => {
            if (data.code != 0) {
              that.confirmAnother = true
            } else if (data.data.user.status == 3) {
              that.$refs.uToast.show({
                message: `您的${
                  type == 1 ? '学生' : '企业'
                }身份已被取消，请重新重新认证`,
                type: 'error'
              })
              await that.$methods.sleep(3000)
              type == 1 ? (that.studentShow = true) : (that.companyShow = true)
            } else {
              uni.setStorageSync('identity', data.data.type)
              that.setIdentity({ key: data.data.type })
              that.setUserInfo({
                openid: data.data.user.openid,
                uuid: data.data.user.openid + data.data.user.id,
                id: data.data.user.id,
                avatar: data.data.user.avatar,
                name: data.data.user.name,
                phone: data.data.user.phone,
                credit_score: data.data.user.credit_score
              })
              that.$methods.chat.connect(that, that.userInfo, true)
              that.goEasy.im.on(
                that.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED,
                content => {
                  that.renderConversations(content)
                }
              )
              that.$refs.uToast.show({
                message: '切换成功',
                type: 'success'
              })
            }
          })
        }
      })
    },
    clickFeature(key) {
      if (key == 'enterprise-information') {
        uni.navigateTo({
          url: `/pages/${key}/index?type=releaseOrder&id=${this.userInfo.id}`
        })
      } else {
        uni.navigateTo({
          url: `/pages/${key}/index`
        })
      }
    }
  }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
