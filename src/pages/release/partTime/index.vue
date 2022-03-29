<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-29 12:15:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-29 19:28:25
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
          <u-input v-model="data.payMent" type="number"></u-input>
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
          prop="start"
          label="开始时间:"
          @click="startShow = true"
          required
        >
          <u-text :text="data.start"></u-text>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <custom-datetime-picker
            :pickShow.sync="startShow"
            title="请选择开始时间"
            mode="date"
            @confirm="timeConfirm($event, 'start')"
          ></custom-datetime-picker>
        </u-form-item>
        <u-form-item
          prop="end"
          label="结束时间:"
          @click="endShow = true"
          required
        >
          <u-text :text="data.end"></u-text>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <custom-datetime-picker
            :pickShow.sync="endShow"
            title="请选择结束时间"
            mode="date"
            @confirm="timeConfirm($event, 'end')"
          ></custom-datetime-picker>
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
export default {
  name: 'part-time',
  data() {
    return {
      pay: 0,
      rules: {
        content: {
          required: true,
          message: '请输入工作内容',
          trigger: ['change', 'blur'],
        },
        address: {
          required: true,
          message: '请输入工作地点',
          trigger: ['change', 'blur'],
        },
        payMent: {
          type: 'number',
          required: true,
          validator: (rule, value, callback) => {
            return value !== 0
          },
          message: '请输入工作薪酬',
          trigger: ['change', 'blur'],
        },
        start: {
          required: true,
          message: '请选择开始时间',
          validator: (rule, value, callback) => {
            return value !== '-'
          },
          trigger: ['change', 'blur'],
        },
        end: {
          required: true,
          message: '请选择结束时间',
          validator: (rule, value, callback) => {
            return value !== '-'
          },
          trigger: ['change', 'blur'],
        },
      },
      endShow: false,
      educationShow: false,
      startShow: false,
      data: {
        content: '',
        details: '',
        address: '',
        payMent: 0,
        education: '不限',
        start: '-',
        end: '-',
      },
      list: [
        { name: '不限' },
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' },
      ],
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
    timeConfirm(e, type) {
      if (
        this.$methods.timeChange.timestamp() >
        this.$methods.timeChange.timestamp(e)
      ) {
        this.$refs.uToast.show({
          message: '时间不能小于当前时间',
          type: 'error',
        })
        return false
      }
      if (type === 'end') {
        if (
          this.$methods.timeChange.timestamp(this.data['start']) >
          this.$methods.timeChange.timestamp(e)
        ) {
          this.$refs.uToast.show({
            message: '结束时间不能小于开始时间',
            type: 'error',
          })

          return false
        }
      } else {
        if (
          this.$methods.timeChange.timestamp(this.data['end']) <
          this.$methods.timeChange.timestamp(e)
        ) {
          this.$refs.uToast.show({
            message: '开始时间不能大于结束时间',
            type: 'error',
          })
          return false
        }
      }
      this.data[type] = e
    },
    submit() {
      this.$refs.form.validate().then(data => {
        if (!data) {
          return false
        }
        this.pay = (this.data.payMent * (1 + 0.001)).toFixed(2)
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
::v-deep .details-box {
  .u-form-item__body {
    flex-direction: column !important;
    .u-form-item__body__right {
      margin-top: 8px;
    }
  }
}
</style>
