<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-17 15:53:24
-->
<template>
  <view class="mb-10">
    <fixed-button
      type="primary"
      text="编辑"
      shape="circle"
      @click="clickEdit"
    ></fixed-button>
    <view class="content-box size16">
      <view class="headline">基本信息</view>
      <template v-for="item in resumeData.basic">
        <view class="every" v-if="item.key === 'headPhoto'" :key="item.key">
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
    <view class="content-box size16">
      <view class="headline">教育经历</view>
      <template v-for="item in resumeData.educations">
        <view class="mq border-b" :key="item.key">
          <view class="top">
            <view class="top_name">{{ item.schoolName }}</view>
            <view class="top_time">{{ item.start + '-' + item.end }}</view>
          </view>
          <view class="size14">
            <text>{{ item.rank }}</text>
            <text class="ml-10">{{ item.major }}</text>
          </view>
          <text space="nbsp">{{ item.details }}</text>
        </view>
      </template>
    </view>
    <view class="content-box size16">
      <view class="headline">实习经历</view>
      <template v-for="item in resumeData.internshipExperiences">
        <view class="mq border-b" :key="item.key">
          <view class="top">
            <view class="top_name">{{ item.companyName }}</view>
            <view class="top_time">{{ item.start + '-' + item.end }}</view>
          </view>
          <view class="size14">
            <text>{{ item.job }}</text>
          </view>
          <text space="nbsp">{{ item.details }}</text>
        </view>
      </template>
    </view>
    <view class="content-box size16">
      <view class="headline">项目经历</view>
      <template v-for="item in resumeData.projectExperiences">
        <view class="mq border-b" :key="item.key">
          <view class="top">
            <view class="top_name">{{ item.projectName }}</view>
            <view class="top_time">{{ item.start + '-' + item.end }}</view>
          </view>
          <view class="size14">
            <text>{{ item.job }}</text>
          </view>
          <text space="nbsp">{{ item.details }}</text>
        </view>
      </template>
    </view>
    <view class="content-box size16">
      <view class="headline">自我评价</view>
      <view class="every size14">
        <text space="nbsp">{{ resumeData.selfEvaluation }}</text>
      </view>
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
  methods: {
    clickEdit() {
      uni.navigateTo({
        url: '/pages/my-resume/resume-edit/index',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'style/form.scss';

.mq {
  padding: 8px;
  margin: 0 15px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  &_name {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
