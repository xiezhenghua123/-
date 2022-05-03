<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 22:33:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 15:42:17
-->
<template>
  <view>
    <view class="content-box size16">
      <view class="every">
        <view class="title">工作内容：</view>
        <view class="content">{{ initData.content }}</view>
      </view>
      <view class="every">
        <view class="title">雇主：</view>
        <view class="content name--color" @click="clickToDetails">{{
          (initData.user_type == 1
            ? initData.worker_name
            : initData.company_name) || userInfo.name
        }}</view>
      </view>
      <view class="every">
        <view class="title">岗位类型：</view>
        <view class="content">兼职</view>
      </view>
      <view class="every">
        <view class="title">学历要求：</view>
        <view class="content">{{ initData.education }}</view>
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
        <view class="title">招聘截止时间：</view>
        <view class="content">{{ initData.dateline }}</view>
      </view>
      <view class="every flex-column">
        <view>工作说明：</view>
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
        <u-button text="联系雇主" type="primary" size="large"></u-button>
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
        <u-button text="联系雇主" type="primary" size="large"></u-button>
      </view>
    </view>
  </view>
</template>
<script>
import { jobDetail } from '@/api/recruit.js'
import { mapState } from 'vuex'
import { addApplyJob } from '@/api/applyJob.js'
export default {
  data() {
    return {
      initData: {},
      key: '',
      id: ''
    }
  },
  onLoad(options) {
    this.id = options.id
    jobDetail(this.id).then(({ data }) => {
      this.initData = data
    })
    this.key = options.key
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  methods: {
    apply() {
      addApplyJob({
        work_order_id: this.initData.id,
        worker_id: this.userInfo.id,
        publisher:
          this.initData.user_type == '1'
            ? this.initData.worker_name
            : this.initData.company_name,
        recipient: this.userInfo.name
      }).then(() => {
        this.$refs.uToast.show({
          message: '应聘成功！可到个人中心-订单管理查看',
          type: 'success'
        })
      })
    },
    enterChat() {
      this.$methods.chat.enterChat({
        uuid:
          this.initData.user_type == 1
            ? this.initData.openid + this.initData.worker_id
            : this.initData.openid + this.initData.company_id,
        name:
          this.initData.user_type == 1
            ? this.initData.worker_name
            : this.initData.company_name,
        avatar:
          this.initData.user_type == 1
            ? this.initData.worker_avatar
            : this.initData.company_avatar
      })
    },
    clickToPerson() {},
    clickToComplainant() {
      uni.navigateTo({
        url: `/pages/complain-manage/complainant-upload/index?orderId=${
          this.initData.id
        }&companyId=${
          this.user_type == 1
            ? this.initData.worker_id
            : this.initData.company_id
        }`
      })
    },
    clickToDetails() {
      if (this.initData.user_type == '1') {
        uni.navigateTo({
          url: `/pages/components/confirm-page/index?id=${
            this.initData.worker_id || this.userInfo.id
          }`
        })
      } else {
        uni.navigateTo({
          url: `/pages/enterprise-information/index?id=${
            this.initData.company_id || this.userInfo.id
          }&type=${this.key}`
        })
      }
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
