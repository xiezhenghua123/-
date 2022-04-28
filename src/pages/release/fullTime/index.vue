<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-29 12:15:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 16:08:21
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
            <u-input v-model="data.payMent.min" type="number"></u-input>
            ——
            <u-input v-model="data.payMent.max" type="number"></u-input>
          </view>
        </u-form-item>
        <!-- <u-form-item label="押金费用(元):" prop="cash">
          <u-input v-model="data.cash" disabled></u-input>
        </u-form-item> -->
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
        <view class="details-box" required>
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
        ><text class="size18">发布职位</text></u-button
      >
    </view>
    <view>
      <u--text
        type="primary"
        text="注：发布职位平台将收取0.01元的服务费"
        wordWrap="anywhere"
      ></u--text>
    </view>
  </view>
</template>
<script>
import { releaseJob } from '@/api/recruit.js'
import { mapState } from 'vuex'
export default {
  name: 'full-time',
  data() {
    return {
      startShow: false,
      minDate: this.$methods.timeChange.timestamp(),
      rules: {
        details: {
          required: true,
          message: '请输入岗位说明',
          trigger: ['change', 'blur']
        },
        content: {
          required: true,
          message: '请输入工作岗位',
          trigger: ['change', 'blur']
        },
        address: {
          required: true,
          message: '请输入工作地点',
          trigger: ['change', 'blur']
        },
        deadLine: {
          required: true,
          message: '请选择招聘截止时间',
          validator: (rule, value, callback) => {
            return value !== '-'
          },
          trigger: ['change', 'blur']
        },
        payMent: [
          {
            validator: (rule, value, callback) => {
              return value.min > 0 || value.max > 0
            },
            message: '薪酬必须大于0',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return !!value.min
            },
            message: '请输入最低薪酬',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return !!value.max
            },
            message: '请输入最高薪酬',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return value.max > value.min
            },
            message: '最高薪酬不能低于最低薪酬',
            trigger: ['change', 'blur']
          }
        ]
      },
      educationShow: false,
      list: [
        { name: '不限' },
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' }
      ],
      data: {
        content: '',
        address: '',
        details: '',
        education: '不限',
        payMent: {
          min: 0,
          max: 0
        },
        deadLine: '-'
        // cash: 0,
      },
      pay: 0
    }
  },
  computed: {
    ...mapState('appState', ['userInfo'])
  },
  mounted() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    timeConfirm(e) {
      this.data.deadLine = e
    },
    selectEducation(data) {
      this.data.education = data.name
      this.educationShow = false
    },
    // change(value) {
    //   this.data.cash = value * 0.01 * 1000
    // },
    submit() {
      this.$refs.form.validate().then(data => {
        if (!data) {
          return false
        }
        const service_charge = 0.01
        releaseJob({
          company_id: this.userInfo.uuid.toString(),
          type: 'fullTime',
          content: this.data.content,
          place: this.data.address,
          salary: JSON.stringify(this.data.payMent),
          education: this.data.education,
          description: this.data.details,
          service_charge: service_charge.toString(),
          dateline: this.data.deadLine
        }).then(() => {
          this.$refs.uToast.show({
            loading: true,
            message: '支付中',
            type: 'loading',
            complete: data => {
              this.$refs.uToast.show({
                message: `您已成功支付${service_charge}元`,
                type: 'success'
              })
            }
          })
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
