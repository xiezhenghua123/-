<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-29 12:15:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-29 19:29:26
-->
<template>
  <view class="mt-10">
    <u-toast ref="uToast"></u-toast>
    <view class="title"> 职位信息 </view>
    <view>
      <u-form
        :model="data"
        ref="form"
        :rules="rules"
        labelWidth="auto"
        labelPosition="left"
      >
        <u-form-item label="工作岗位:" prop="content" required>
          <u-input v-model="data.content"></u-input>
        </u-form-item>
        <u-form-item label="工作地点:" prop="address" required>
          <u-input v-model="data.address"></u-input>
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
        <u-form-item prop="payMent" label="薪酬范围(千元):" required>
          <view class="payMent">
            <u-input
              v-model="data.payMent.min"
              type="number"
              @change="change"
            ></u-input>
            ——
            <u-input v-model="data.payMent.max" type="number"></u-input>
          </view>
        </u-form-item>
        <u-form-item label="押金费用(元):" prop="cash">
          <u-input v-model="data.cash" disabled></u-input>
        </u-form-item>
        <view class="details-box">
          <u-form-item prop="details" label="工作说明：">
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
        ><text class="size18">支付押金并发布职位</text></u-button
      >
    </view>
    <view>
      <u--text
        type="primary"
        text="注：押金费用按照最低薪酬的1%收取，岗位招聘完成后将返还。\n发布职位平台将收取0.1%的服务费(押金费用为基数)"
        wordWrap="anywhere"
      ></u--text>
    </view>
  </view>
</template>
<script>
export default {
  name: 'full-time',
  data() {
    return {
      rules: {
        content: {
          required: true,
          message: '请输入工作岗位',
          trigger: ['change', 'blur'],
        },
        address: {
          required: true,
          message: '请输入工作地点',
          trigger: ['change', 'blur'],
        },
        payMent: [
          {
            validator: (rule, value, callback) => {
              return value.min > 0 || value.max > 0
            },
            message: '薪酬必须大于0',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              return !!value.min
            },
            message: '请输入最低薪酬',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              return !!value.max
            },
            message: '请输入最高薪酬',
            trigger: ['change', 'blur'],
          },
          {
            validator: (rule, value, callback) => {
              return value.max > value.min
            },
            message: '最高薪酬不能低于最低薪酬',
            trigger: ['change', 'blur'],
          },
        ],
      },
      educationShow: false,
      list: [
        { name: '不限' },
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' },
      ],
      data: {
        content: '',
        address: '',
        details: '',
        education: '不限',
        payMent: {
          min: 0,
          max: 0,
        },
        cash: 0,
      },
      pay: 0,
    }
  },
  mounted() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    selectEducation(data) {
      this.data.education = data.name
      this.educationShow = false
    },
    change(value) {
      this.data.cash = value * 0.01 * 1000
    },
    submit() {
      this.$refs.form.validate().then(data => {
        if (!data) {
          return false
        }
        this.pay = (this.data.cash * (1 + 0.001)).toFixed(2)
        this.$refs.uToast.show({
          loading: true,
          message: '支付中',
          type: 'loading',
          complete: data => {
            this.$refs.uToast.show({
              message: `您已成功支付${this.pay}元`,
              type: 'success',
            })
          },
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}
.payMent {
  display: flex;
  align-items: center;
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
