<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 21:31:23
-->
<template>
  <view class="mb-10">
    <fixed-button
      type="primary"
      text="编辑"
      shape="circle"
      @click="clickEdit"
      v-show="show"
    ></fixed-button>
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
        <view class="every_content">{{ resumeData.basic.tel }}</view>
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
            <view class="top_time">{{
              item.start.time + '——' + item.end.time
            }}</view>
          </view>
          <view class="size14">
            <text>{{ item.rank.text }}</text>
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
            <view class="top_time">{{
              item.start.time + '——' + item.end.time
            }}</view>
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
            <view class="top_time">{{
              item.start.time + '——' + item.end.time
            }}</view>
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
// import resumeData from './data.js'
import mixins from '../minix/index.js'
import { getMyResume } from '@/api/resume.js'
import { mapState } from 'vuex'
export default {
  mixins: [mixins],
  data() {
    return {
      // show: true,
      resumeData: {}
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  onLoad() {
    getMyResume(this.userInfo.openid).then(({ data }) => {
      if (data) {
        this.resumeData = {
          basic: {
            headPhoto: data.avatar,
            name: data.name,
            sex: data.sex,
            age: data.age,
            tel: data.phone,
            maxEducation: data.education
          },
          jobExpectations: {
            job: data.position,
            salary: data.salary,
            position: data.city
          },
          selfEvaluation: data.self_assessment,
          educations: JSON.parse(data.education_experience),
          internshipExperiences: JSON.parse(data.internship_experience),
          projectExperiences: JSON.parse(data.project_experience)
        }
      }
    })
  },
  methods: {
    clickEdit() {
      uni.navigateTo({
        url: '/pages/my-resume/resume-edit/index'
      })
    }
  }
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
