<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-20 21:24:55
-->
<template>
  <view>
    <fixed-button
      text="编辑"
      type="primary"
      shape="circle"
      @click="clickEdit"
    ></fixed-button>
    <view class="content-box size16">
      <view class="every">
        <view class="every_title"> 企业名称：</view>
        <view class="every_content">{{ companyData.name }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 所属行业：</view>
        <view class="every_content">{{ companyData.industry }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 统一社会信用代码：</view>
        <view class="every_content">{{ companyData.code }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 法定代表人：</view>
        <view class="every_content">{{ companyData.legalPerson }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 公司地址：</view>
        <view class="every_content">{{ companyData.address }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 公司规模：</view>
        <view class="every_content">{{ companyData.scale }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 注册资本：</view>
        <view class="every_content">{{ companyData.registeredCapital }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 成立日期：</view>
        <view class="every_content">{{ companyData.establishedTime }}</view>
      </view>
      <view class="flex-column every">
        <view class="every_title"> 公司介绍：</view>
        <view
          class="every_content size14"
          style="text-indent: 2em; text-align: justify"
          >{{ companyData.introduction }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import companyData from './data.js'
export default {
  data() {
    return {
      companyData: {},
    }
  },
  onLoad() {
    this.companyData = companyData
  },
  methods: {
    clickEdit() {
      uni.navigateTo({
        url: '/pages/enterprise-information/edit/index',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'style/form.scss';
</style>
