<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 16:06:41
-->
<template>
  <view>
    <toast></toast>
    <view class="confirm-button" :style="{ 'margin-top': marT + 'rpx' }">
      <u-button size="large" type="primary" @click="confirm">点击登录</u-button>
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
    <u-modal
      :show="promptShow"
      title="身份认证"
      @confirm="prompt"
      confirmText="前往认证"
    >
      <view> 您暂未进行身份认证，请认证 </view>
    </u-modal>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import student from './student/index.vue'
import company from './company/index.vue'
import renderConversations from '@/pages/minix/renderConversations'
import { checkConfirm, authenticate } from '@/api/user.js'
import { successToast, errorToast } from '@/components/toast/index.js'

export default {
  props: {
    marT: {
      type: Number,
      default: 300,
      validator: function (value) {
        return value > 0
      }
    }
  },
  mixins: [renderConversations],
  name: 'confirm',
  components: {
    student: student,
    company: company
  },
  data() {
    return {
      companyShow: false,
      confirmShow: false,
      studentShow: false,
      userInfoData: {},
      promptShow: false
    }
  },
  onReady() {},
  computed: {
    ...mapState('appState', ['isLogin', 'identity', 'userInfo'])
  },
  methods: {
    ...mapActions('appState', ['setLogin', 'setUserInfo', 'setIdentity']),
    // 提示模态框
    prompt() {
      this.promptShow = false
      this.confirmShow = true
    },
    statusUpdate({ confirmData, type }) {
      let data = {}
      if (type == 1) {
        data = {
          type: type,
          openid: this.userInfoData.openid,
          avatar: this.userInfoData.avatar,
          name: confirmData.name,
          phone: confirmData.tel,
          major: confirmData.major,
          college: confirmData.college,
          uid: confirmData.number
        }
      } else {
        data = {
          type: type,
          openid: this.userInfoData.openid,
          avatar: this.userInfoData.avatar,
          name: confirmData.name,
          phone: confirmData.tel,
          industry: confirmData.industry,
          legal_person: confirmData.legalPerson,
          code: confirmData.number
        }
      }
      authenticate(data).then(data => {
        this.confirmShow = false
        successToast('提交成功，管理员将在1-2天内进行审核')
      })
    },
    remember(userInfo) {
      this.setLogin(true)
      // uni.setStorageSync('currentUser', restApi.findUser('Mattie', '123'))
      this.setUserInfo(userInfo)
      this.$emit('isLogin', true)
      this.$methods.chat.connect(this, userInfo)
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, content => {
        this.renderConversations(content)
      })
      this.$emit('isLogin', true)
    },
    confirm() {
      const that = this
      wx.getUserProfile({
        desc: '获取头像',
        success({ userInfo }) {
          that.$set(that.userInfoData, 'avatar', userInfo.avatarUrl)
          wx.login({
            success(res) {
              if (res.code) {
                let type = uni.getStorageSync('identity') || 0
                checkConfirm({ js_code: res.code, type: type }).then(data => {
                  if (data.code != 0) {
                    that.promptShow = true
                    that.$set(that.userInfoData, 'openid', data.data)
                  } else {
                    if (data.data.user.status == 2) {
                      errorToast('身份信息正在审核中！')
                    } else if (data.data.user.status == 3) {
                      errorToast(
                        `您的${
                          data.data.type == 1 ? '学生' : '企业'
                        }身份认证已被取消！请重新认证`
                      )
                      that.$methods.sleep(2000).then(() => {
                        data.data.type == 1
                          ? (that.studentShow = true)
                          : (that.companyShow = true)
                      })
                    } else {
                      successToast('登录成功！')
                      uni.setStorageSync('identity', data.data.type)
                      that.setIdentity({ key: data.data.type })
                      that.$set(that.userInfoData, 'name', data.data.user.name)
                      that.$set(
                        that.userInfoData,
                        'avatar',
                        data.data.user.avatar
                      )
                      that.$set(
                        that.userInfoData,
                        'openid',
                        data.data.user.openid
                      )
                      that.$set(that.userInfoData, 'uuid', data.data.user.id)
                      that.$set(
                        that.userInfoData,
                        'phone',
                        data.data.user.phone
                      )
                      that.remember(that.userInfoData)
                    }
                  }
                })
              }
            }
          })
        },
        fail(res) {
          console.log(res)
        }
      })
    },

    close() {
      this.confirmShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-button {
  font-size: $uni-font-size-lg;
  width: 250rpx;
  margin: 0 auto;
}
</style>
