<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-15 10:31:52
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
    <view class="relation-bt m-10" @click="enterChat">
      <u-button text="联系求职者" type="primary" size="large"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      resumeData: {
        basic: {
          name: '',
          tel: '',
          age: '',
          headPhoto: '',
          maxEducation: '',
          sex: '',
          jobExpectations: {
            job: '',
            salary: '',
            position: ''
          },
          educations: {},
          internshipExperiences: {},
          projectExperiences: {},
          selfEvaluation: {}
        }
      }
    }
  },
  onLoad(options) {
    let data
    if (options.data == 'null' || options.data == 'undefined') {
      data = JSON.parse(options.init)
      this.resumeData = {
        basic: {
          uuid: data.uuid,
          name: data.name,
          headPhoto: data.avatar
        }
      }
    } else {
      data = JSON.parse(options.data)
      this.resumeData = {
        basic: {
          uuid: data.openid + data.worker_id,
          name: data.name,
          tel: data.phone,
          age: data.age,
          headPhoto: data.avatar,
          maxEducation: data.education,
          sex: data.sex
        },
        jobExpectations: {
          job: data.position,
          salary: data.salary,
          position: data.city
        },
        educations: JSON.parse(data.education_experience),
        internshipExperiences: JSON.parse(data.internship_experience),
        projectExperiences: JSON.parse(data.project_experience),
        selfEvaluation: data.self_assessment
      }
    }

    uni.setNavigationBarTitle({
      title: this.resumeData.basic.name
    })
  },
  methods: {
    formmat(item) {
      let data = JSON.parse(item)
      return `${data.start.time}——${data.end.time}`
    },
    enterChat() {
      this.$methods.chat.enterChat({
        uuid: this.resumeData.basic.uuid,
        name: this.resumeData.basic.name,
        avatar: this.resumeData.basic.headPhoto
      })
    },
    telHide(tel) {
      return tel.replace(tel.slice(3, 7), '****')
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
::v-deep .relation-bt {
  .u-button__text {
    font-size: 16px !important;
  }
}
</style>
