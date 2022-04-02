<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 22:33:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-31 16:17:32
-->
<template>
  <view>
    <view class="content-box size16">
      <view class="every">
        <view class="title">工作岗位：</view>
        <view class="content">{{ initData.content }}</view>
      </view>
      <view class="every">
        <view class="title">企业：</view>
        <view class="content name--color" @click="clickToCompany">{{
          initData.employer
        }}</view>
      </view>
      <view class="every" v-if="initData.candidate">
        <view class="title">应聘者：</view>
        <view class="content name--color" @click="clickToPerson">{{
          initData.candidate
        }}</view>
      </view>
      <view class="every">
        <view class="title">岗位类型：</view>
        <view class="content">{{ initData.type }}</view>
      </view>
      <view class="every">
        <view class="title">工作地点：</view>
        <view class="content">{{ initData.position }}</view>
      </view>
      <view class="every">
        <view class="title">薪酬：</view>
        <view class="content">{{ initData.payMent }}</view>
      </view>
      <view class="every">
        <view class="title">学历要求：</view>
        <view class="content">{{ initData.education }}</view>
      </view>
      <view class="every">
        <view class="title">企业规模：</view>
        <view class="content">{{ initData.scale }}</view>
      </view>
      <view class="every flex-column">
        <view>岗位要求：</view>
        <u--text :text="initData.details" wordWrap="anyWhere"></u--text>
      </view>
      <view class="every" v-if="key === 'myRealease'">
        <view class="title">押金金额：</view>
        <view class="content">{{ initData.cash }}</view>
      </view>
      <view class="every" v-if="key === 'myRealease'">
        <view class="title">押金退还：</view>
        <view class="content">{{ initData.isReturnCash ? '是' : '否' }}</view>
      </view>

      <view class="every">
        <view class="title">岗位状态：</view>
        <view class="content">{{ initData.status }}</view>
      </view>
    </view>
    <view class="job-button size16 m-10" v-if="key === 'myFavorite'">
      <view class="apply">
        <u-button text="我要应聘" type="primary" size="large"></u-button>
      </view>

      <view class="relation">
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

      <view class="relation">
        <u-button text="联系企业" type="primary" size="large"></u-button>
      </view>
    </view>
    <view class="job-button size16 m-10" v-if="key === 'releaseOrder'">
      <view class="tort" @click="clickToComplainant">
        <u-button
          text="被侵权？点击投诉"
          type="primary"
          size="large"
        ></u-button>
      </view>

      <view class="relation">
        <u-button text="联系应聘者" type="primary" size="large"></u-button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      initData: {},
      key: '',
    }
  },
  onLoad(options) {
    this.initData = JSON.parse(options.data)
    this.key = options.key
  },
  methods: {
    clickToCompany() {
      uni.navigateTo({
        url: '/pages/components/company-details/index',
      })
    },
    clickToPerson() {},
    clickToComplainant() {
      uni.navigateTo({
        url: '/pages/complain-manage/complainant-upload/index',
      })
    },
  },
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
