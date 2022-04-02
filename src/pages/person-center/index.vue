<template>
  <view class="container">
    <u-toast ref="uToast"></u-toast>
    <view class="top">
      <view class="message">
        <u-avatar :src="userInfo.avatarUrl" size="60"></u-avatar>
        <view class="m_right" v-if="isLogin">
          <view class="message_name">{{ userInfo.nickName }}</view>
          <view class="message_identity">{{ getIdentity() }}</view>
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
    <view class="divider" :class="{ 'm-10': identity === 'company' }">
      <u-divider></u-divider>
    </view>
    <view class="content" v-if="identity && isLogin">
      <view class="profit-loss p-10 mb-10" v-if="identity === 'student'">
        <view class="all mb-10">盈亏：xx（元） </view>
        <view class="flex">
          <view class="income">收入：xx（元）</view>
          <view class="disbursement">支出：xx（元）</view>
        </view>
      </view>
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
          <view>
            <u-line margin="10rpx 0 10rpx 5%" length="94%"></u-line>
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
    <company :companyShow.sync="companyShow"></company>
    <student :studentShow.sync="studentShow"></student>
  </view>
</template>

<script>
import feature_data from '../../data/feature.js'
import confirm from '@/components/confirm/index.vue'
import company from '@/components/confirm/company/index.vue'
import student from '@/components/confirm/student/index.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    confirm: confirm,
    student: student,
    company: company,
  },
  data() {
    return {
      companyShow: false,
      studentShow: false,
      confirmAnother: false,
      src: '/static/logo.png',
      name: '黄汉雄',
      feature_data: [],
    }
  },
  watch: {
    identity: {
      handler(val) {
        if (this.identity === 'company') {
          this.feature_data = feature_data.company
        } else {
          this.feature_data = feature_data.student
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState('appState', [
      'isLogin',
      'identity',
      'identityArray',
      'userInfo',
    ]),
  },
  onLoad() {},
  methods: {
    ...mapActions('appState', ['changeIdentity']),
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
        return this.identityArray.filter(item => {
          return item.key === this.identity
        })[0].name
      }
    },
    change() {
      if (!this.isLogin) {
        this.$refs.uToast.show({
          message: '请先登录',
          type: 'error',
        })
        return false
      }
      if (!this.identityArray.length) {
        this.$refs.uToast.show({
          message: '请先认证身份',
          type: 'error',
        })
      } else if (this.identityArray.length < 2) {
        this.confirmAnother = true
      } else {
        this.changeIdentity().then(() => {
          this.$refs.uToast.show({
            message: '切换成功',
            type: 'success',
          })
        })
      }
    },
    clickFeature(key) {
      uni.navigateTo({
        url: `/pages/${key}/index`,
      })
    },
  },
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
