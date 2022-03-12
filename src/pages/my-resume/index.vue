<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-12 15:00:46
-->
<template>
  <view>
    <view class="content-box size16">
      <view class="headline">基本信息</view>
      <template v-for="item in resumeData.basic">
        <view class="every" v-if="item.key === 'headPhoto'">
          <view class="every_title">{{ item.title }} </view>
          <view class="every_content"
            ><u-avatar :src="item.content"></u-avatar
          ></view>
        </view>
        <view class="every" v-else :key="item.key">
          <view class="every_title">{{ item.title }} </view>
          <view class="every_content">{{ item.content }}</view>
        </view>
      </template>
    </view>
    <view class="content-box size16">
      <view class="headline">求职期望</view>
      <template v-for="item in resumeData.jobExpectations">
        <view class="every" :key="item.key">
          <view class="every_title">{{ item.title }} </view>
          <view class="every_content">{{ item.content }}</view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import resumeData from './data.js'
export default {
  data() {
    return {
      resumeData: resumeData,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'style/form.scss';
</style>
