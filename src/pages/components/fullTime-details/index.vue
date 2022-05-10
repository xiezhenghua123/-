<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 22:33:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-08 23:20:43
-->
<template>
  <view>
    <toast></toast>
    <view class="content-box size16">
      <view class="every">
        <view class="title">工作岗位：</view>
        <view class="content">{{ initData.content }}</view>
      </view>
      <view class="every">
        <view class="title">企业：</view>
        <view class="content name--color" @click="clickToCompany">{{
          initData.company_name || userInfo.name
        }}</view>
      </view>
      <view class="every">
        <view class="title">岗位类型：</view>
        <view class="content">全职</view>
      </view>
      <view class="every">
        <view class="title">工作地点：</view>
        <view class="content">{{ initData.place }}</view>
      </view>
      <view class="every">
        <view class="title">薪酬：</view>
        <view class="content">{{ initData.salary }}</view>
      </view>
      <view class="every">
        <view class="title">学历要求：</view>
        <view class="content">{{ initData.education }}</view>
      </view>
      <view class="every">
        <view class="title">招聘截止时间：</view>
        <view class="content">{{ initData.dateline }}</view>
      </view>
      <view class="every flex-column">
        <view>岗位要求：</view>
        <u--text :text="initData.description" wordWrap="anyWhere"></u--text>
      </view>
    </view>
    <view class="job-button size16 m-10" v-if="key === 'myFavorite'">
      <view class="apply">
        <u-button
          text="我要应聘"
          type="primary"
          size="large"
          @click="apply"
        ></u-button>
      </view>

      <view class="relation" @click="enterChat">
        <u-button text="联系企业" type="primary" size="large"></u-button>
      </view>
    </view>
    <view class="job-button size16 m-10" v-if="key === 'applyOrder'">
      <view class="tort" @click="clickToComplainant">
        <u-button
          text="被侵权？点击投诉"
          type="primary"
          size="large"
        ></u-button>
      </view>

      <view class="relation" @click="enterChat">
        <u-button text="联系企业" type="primary" size="large"></u-button>
      </view>
    </view>
  </view>
</template>
<script>
import { jobDetail } from '@/api/recruit.js'
import { mapState } from 'vuex'
import { addApplyJob } from '@/api/applyJob.js'
import { successToast } from '@/components/toast/index.js'

export default {
  data() {
    return {
      initData: {},
      key: '',
      id: ''
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad(options) {
    this.id = options.id
    jobDetail(this.id).then(({ data }) => {
      this.initData = {
        ...data,
        salary: `${JSON.parse(data.salary).min}k-${
          JSON.parse(data.salary).max
        }k`
      }
    })
    this.key = options.key
  },
  methods: {
    apply() {
      addApplyJob({
        work_order_id: this.initData.id,
        worker_id: this.userInfo.id,
        publisher: this.initData.company_name,
        publisher_id:
          this.initData.user_type == '1'
            ? this.initData.worker_id
            : this.initData.company_id,
        publisher_type: this.initData.user_type,
        recipient: this.userInfo.name
      }).then(() => {
        successToast('应聘成功！可到个人中心-订单管理查看')
      })
    },
    enterChat() {
      this.$methods.chat.enterChat({
        uuid: this.initData.openid + this.initData.company_id,
        name: this.initData.company_name,
        avatar: this.initData.company_avatar
      })
    },
    clickToCompany() {
      uni.navigateTo({
        url: `/pages/enterprise-information/index?id=${
          this.initData.company_id || this.userInfo.id
        }&type=${this.key}`
      })
    },
    clickToPerson() {},
    clickToComplainant() {
      uni.navigateTo({
        url: `/pages/complain-manage/complainant-upload/index?orderId=${this.initData.id}&companyId=${this.initData.company_id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
.job-button {
  display: flex;
  ::v-deep .tort .u-button__text {
    font-size: 14px;
  }
  ::v-deep .apply,
  .tort {
    width: 40%;
    .u-button__text {
      font-size: 16px !important;
    }
  }
  ::v-deep .relation {
    margin-left: 5%;
    width: 55%;
    .u-button__text {
      font-size: 16px !important;
    }
  }
}
</style>
