<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-24 13:44:40
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-05 22:25:35
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-24 13:54:31
-->
<template>
  <view class="mb-10">
    <view class="content-box size16">
      <view class="headline">基本信息</view>

      <view class="every">
        <view class="every_title">头像 </view>
        <view class="every_content"
          ><u-avatar :src="resumeData.basic.headPhoto"></u-avatar
        ></view>
      </view>
      <view class="every">
        <view class="every_title">姓名 </view>
        <view class="every_content">{{ resumeData.basic.name }}</view>
      </view>
      <view class="every">
        <view class="every_title">性别 </view>
        <view class="every_content">{{ resumeData.basic.sex }}</view>
      </view>
      <view class="every">
        <view class="every_title">年龄 </view>
        <view class="every_content">{{ resumeData.basic.age }}</view>
      </view>
      <view class="every">
        <view class="every_title">联系电话 </view>
        <view class="every_content">{{ telHide(resumeData.basic.tel) }}</view>
      </view>
      <view class="every">
        <view class="every_title">最高学历 </view>
        <view class="every_content">{{ resumeData.basic.maxEducation }}</view>
      </view>
    </view>
    <view class="content-box size16">
      <view class="headline">求职期望</view>
      <view class="every">
        <view class="every_title">期望岗位 </view>
        <view class="every_content">{{ resumeData.jobExpectations.job }}</view>
      </view>
      <view class="every">
        <view class="every_title">期望薪资 </view>
        <view class="every_content">{{
          resumeData.jobExpectations.salary
        }}</view>
      </view>
      <view class="every">
        <view class="every_title">期望城市 </view>
        <view class="every_content">{{
          resumeData.jobExpectations.position
        }}</view>
      </view>
    </view>
    <view class="content-box size16">
      <view class="headline">教育经历</view>
      <template v-for="item in resumeData.educations">
        <view class="mq border-b" :key="item.key">
          <view class="top">
            <view class="top_name">{{ item.schoolName }}</view>
            <view class="top_time">{{ item.start + '——' + item.end }}</view>
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
            <view class="top_time">{{ item.start + '——' + item.end }}</view>
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
            <view class="top_time">{{ item.start + '——' + item.end }}</view>
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
    <view class="relation-bt m-10" @click="enterChat">
      <u-button text="联系求职者" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      resumeData: {},
    }
  },
  onLoad(options) {
    this.resumeData = JSON.parse(options.data)

    uni.setNavigationBarTitle({
      title: this.resumeData.basic.name,
    })
  },
  methods: {
    enterChat() {
      this.$methods.chat.enterChat('33c3693b-dbb0-4bc9-99c6-fa77b9eb763f')
    },
    telHide(tel) {
      return tel.replace(tel.slice(3, 7), '****')
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
::v-deep .relation-bt {
  .u-button__text {
    font-size: 16px !important;
  }
}
</style>
