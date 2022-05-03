<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 23:29:05
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-01 16:45:53
-->
<template>
  <view>
    <view class="content-box size16">
      <view class="every">
        <view class="every_title"> 头像:</view>
        <view class="every_content" @click="clickToPreview(initData.avatar)">
          <u-avatar :src="initData.avatar"></u-avatar>
        </view>
      </view>
      <view class="every">
        <view class="every_title"> 姓名：</view>
        <view class="every_content">{{ initData.name }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 学院：</view>
        <view class="every_content">{{ initData.college }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 专业：</view>
        <view class="every_content">{{ initData.major }}</view>
      </view>
      <view class="every">
        <view class="every_title"> 联系电话：</view>
        <view class="every_content">{{ initData.phone }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { getStudentConfirmData } from '@/api/user.js'
export default {
  data() {
    return {
      initData: {}
    }
  },
  onLoad({ id }) {
    getStudentConfirmData(id).then(({ data }) => {
      this.initData = data
    })
  },
  methods: {
    clickToPreview(url) {
      uni.previewImage({
        urls: url
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
</style>
