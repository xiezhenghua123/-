<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-29 12:15:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-11 17:22:06
-->
<template>
  <view class="mt-10">
    <u-toast ref="uToast"></u-toast>
    <view class="title"> 职位信息 </view>
    <view>
      <u-form
        ref="form"
        :model="data"
        :rules="rules"
        labelPosition="left"
        labelWidth="auto"
      >
        <u-form-item prop="content" label="工作内容:" required>
          <u-input v-model="data.content"></u-input>
        </u-form-item>
        <u-form-item prop="address" label="工作地点:" required>
          <u-input v-model="data.address"></u-input>
        </u-form-item>
        <u-form-item prop="payMent" label="工作薪酬(元):" required>
          <u--input v-model="data.payMent" type="number" />
        </u-form-item>
        <u-form-item
          prop="education"
          label="学历要求:"
          @click="educationShow = true"
        >
          <u-text :text="data.education"></u-text>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :actions="list"
            :show="educationShow"
            title="请选择学历"
            @close="educationShow = false"
            @select="selectEducation"
          ></u-action-sheet>
        </u-form-item>
        <u-form-item
          prop="deadLine"
          label="招聘截止时间:"
          @click="startShow = true"
          required
        >
          <u-text :text="data.deadLine"></u-text>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <custom-datetime-picker
            :pickShow.sync="startShow"
            title="请选择招聘截止时间"
            mode="date"
            :minDate="minDate"
            @confirm="timeConfirm($event)"
          ></custom-datetime-picker>
        </u-form-item>
        <view class="details-box">
          <u-form-item prop="details" label="工作说明：" required>
            <u--textarea
              v-model="data.details"
              count
              maxlength="1000"
            ></u--textarea>
          </u-form-item>
        </view>
      </u-form>
    </view>
    <view class="submit">
      <u-button type="primary" size="large" @click="submit"
        ><text class="size18">支付薪酬并发布职位</text></u-button
      >
    </view>
    <view>
      <u--text
        type="primary"
        text="注：发布职位平台将收取0.1%的服务费"
      ></u--text>
    </view>
  </view>
</template>
<script>
import { releaseJob } from '@/api/recruit.js'
import { mapState } from 'vuex'
export default {
  name: 'part-time',
  data() {
    return {
      minDate: this.$methods.timeChange.timestamp(),
      pay: 0,
      rules: {
        details: {
          required: true,
          message: '请输入工作说明',
          trigger: ['change', 'blur']
        },
        content: {
          required: true,
          message: '请输入工作内容',
          trigger: ['change', 'blur']
        },
        address: {
          required: true,
          message: '请输入工作地点',
          trigger: ['change', 'blur']
        },
        payMent: [
          {
            validator: (rule, value, callback) => {
              return value > 0
            },
            message: '工作薪酬必须大于0',
            trigger: ['change', 'blur']
          },
          {
            type: 'number',
            message: '工作薪酬必须为数字',
            trigger: ['change', 'blur']
          }
        ],
        deadLine: {
          required: true,
          message: '请选择招聘截止时间',
          validator: (rule, value, callback) => {
            return value !== '-'
          },
          trigger: ['change', 'blur']
        }
      },
      educationShow: false,
      startShow: false,
      data: {
        content: '',
        details: '',
        address: '',
        payMent: 0,
        education: '不限',
        deadLine: '-'
      },
      list: [
        { name: '不限' },
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' }
      ]
    }
  },
  mounted() {
    this.$refs.form.setRules(this.rules)
  },
  computed: {
    ...mapState('appState', ['userInfo', 'identity'])
  },
  methods: {
    selectEducation(data) {
      this.data.education = data.name
      this.educationShow = false
    },
    timeConfirm(e) {
      this.data.deadLine = e
    },
    submit() {
      this.$refs.form
        .validate()
        .then(data => {
          if (!data) {
            return false
          }
          if (this.userInfo.credit_score < 80) {
            this.$refs.uToast.show({
              message: '您的信用分低于80分，暂不能发布职位！',
              type: 'error'
            })
            return
          }
          this.pay = (this.data.payMent * (1 + 0.001)).toFixed(2)
          const service_charge = (this.data.payMent * 0.001).toFixed(2)
          releaseJob({
            openid: this.userInfo.openid.toString(),
            order_type: 'partTime',
            user_type: this.identity == 'student' ? '1' : '2',
            content: this.data.content,
            place: this.data.address,
            salary: Number(this.data.payMent),
            education: this.data.education,
            description: this.data.details,
            service_charge: Number(service_charge),
            dateline: this.data.deadLine,
            status: 0
          })
        })
        .then(() => {
          this.$refs.uToast.show({
            loading: true,
            message: '支付中',
            type: 'loading',
            complete: data => {
              this.$refs.uToast.show({
                message: `您已成功支付${this.pay}元`,
                type: 'success'
              })
            }
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
::v-deep .details-box {
  .u-form-item__body {
    flex-direction: column !important;
    .u-form-item__body__right {
      margin-top: 8px;
    }
  }
}
</style>
