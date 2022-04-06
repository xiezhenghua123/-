<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-23 22:33:52
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-06 22:55:22
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
        <view class="content name--color">{{ initData.employer }}</view>
      </view>
      <view class="every" v-if="initData.candidate">
        <view class="title">雇员：</view>
        <view class="content name--color" @click="clickToPerson">{{
          initData.candidate
        }}</view>
      </view>
      <view class="every">
        <view class="title">岗位类型：</view>
        <view class="content">{{ initData.type }}</view>
      </view>
      <view class="every">
        <view class="title">学历要求：</view>
        <view class="content">{{ initData.education }}</view>
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
        <view class="title">开始时间：</view>
        <view class="content">{{ initData.start }}</view>
      </view>
      <view class="every">
        <view class="title">结束时间：</view>
        <view class="content">{{ initData.end }}</view>
      </view>
      <view class="every flex-column">
        <view>工作说明：</view>
        <u--text :text="initData.details" wordWrap="anyWhere"></u--text>
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

      <view class="relation" @click="enterChat">
        <u-button text="联系雇主" type="primary" size="large"></u-button>
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

      <view class="relation" @click="enterChat">
        <u-button text="联系雇员" type="primary" size="large"></u-button>
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
    enterChat() {
      this.$methods.chat.enterChat('3bb179af-bcc5-4fe0-9dac-c05688484649')
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
