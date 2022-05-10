<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-20 21:23:45
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-09 20:29:02
-->
<template>
  <view class="mb-10">
    <fixed-button
      text="确认"
      @click="clickConfirm"
      v-show="show"
    ></fixed-button>
    <view class="content-box size16">
      <view class="ml-10">
        <u-form
          :model="initData"
          ref="companyDataRef"
          :rules="companyDataRules"
          labelWidth="auto"
        >
          <u-form-item label="企业名称：" prop="name" borderBottom required>
            <u-input v-model="initData.name" border="none"></u-input>
          </u-form-item>
          <u-form-item
            label="所属行业："
            prop="industry"
            borderBottom
            required
            @click="industryShow = true"
          >
            <u-input
              v-model="initData.industry"
              border="none"
              disabled
            ></u-input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-picker
              :show="industryShow"
              :columns="industry"
              @confirm="industryConfirm"
              @cancel="industryShow = false"
              title="选择行业"
            ></u-picker>
          </u-form-item>
          <u-form-item
            label="统一社会信用代码："
            prop="code"
            borderBottom
            required
          >
            <view class="disabled-input">
              {{ initData.code }}
            </view>
          </u-form-item>
          <u-form-item
            label="法定代表人："
            prop="legalPerson"
            borderBottom
            required
          >
            <view class="disabled-input">
              {{ initData.legalPerson }}
            </view>
          </u-form-item>
          <u-form-item label="联系方式：" prop="phone" borderBottom required>
            <u-input v-model="initData.phone" border="none"></u-input>
          </u-form-item>
          <u-form-item label="公司地址：" prop="address" borderBottom required>
            <u-input v-model="initData.address" border="none"></u-input>
          </u-form-item>
          <u-form-item
            label="公司规模："
            prop="scale"
            borderBottom
            required
            @click="scaleShow = true"
          >
            <u-text :text="initData.scale"></u-text>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-action-sheet
              :show="scaleShow"
              :actions="scaleArray"
              title="请选择公司规模"
              @close="scaleShow = false"
              @select="scaleSelect"
              closeOnClickOverlay
            >
            </u-action-sheet>
          </u-form-item>
          <u-form-item
            label="注册资本："
            prop="registeredCapital"
            borderBottom
            required
          >
            <u-input
              v-model="initData.registeredCapital"
              border="none"
            ></u-input>
          </u-form-item>
          <u-form-item
            prop="establishedTime"
            label="成立日期："
            @click="establishedTimeShow = true"
            required
            borderBottom
          >
            <u-text :text="initData.establishedTime"></u-text>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <custom-datetime-picker
              title="成立日期"
              :initTime="initData.establishedTime"
              :pickShow.sync="establishedTimeShow"
              @confirm="timeConfirm"
            ></custom-datetime-picker>
          </u-form-item>
          <view class="introduction">
            <u-form-item label="公司介绍：" required prop="introduction">
              <u--textarea
                v-model="initData.introduction"
                count
                height="100"
                maxlength="1000"
              ></u--textarea>
            </u-form-item>
          </view> </u-form
      ></view>
    </view>
  </view>
</template>

<script>
import minix from '../../minix/index.js'
import { editCompanyData, getCompanyConfirmData } from '@/api/user.js'
import { industrySort } from '@/data/industry.js'
import { tel } from '@/data/rules.js'

export default {
  mixins: [minix],
  data() {
    return {
      industryShow: false,
      industry: [industrySort],
      establishedTimeShow: false,
      initData: {
        name: '',
        industry: '',
        code: '',
        legalPerson: '',
        address: '',
        scale: '',
        phone: '',
        registeredCapital: '',
        establishedTime: '',
        introduction: ''
      },
      companyDataRules: {
        phone: tel,
        registeredCapital: {
          required: true,
          message: '请输入注册资本',
          trigger: ['blur', 'change']
        },
        introduction: {
          required: true,
          message: '请输入公司介绍',
          trigger: ['blur', 'change']
        },
        name: {
          required: true,
          message: '请输入企业名称',
          trigger: ['blur', 'change']
        },
        industry: {
          required: true,
          message: '请选择行业',
          trigger: ['blur', 'change']
        },
        address: {
          required: true,
          message: '请输入公司地址',
          trigger: ['blur', 'change']
        },
        scale: {
          required: true,
          message: '请选择公司规模',
          trigger: ['blur', 'change']
        },
        establishedTime: {
          required: true,
          message: '请选择公司成立日期',
          trigger: ['blur', 'change']
        }
      },
      scaleShow: false,
      scaleArray: [
        { name: '0-499人' },
        { name: '500-999人' },
        { name: '1000-9999人' },
        { name: '10000人以上' }
      ],
      id: ''
    }
  },
  onLoad({ id }) {
    this.id = id
    getCompanyConfirmData(id).then(({ data }) => {
      this.initData = {
        ...data,
        name: data.name,
        industry: data.industry,
        code: data.code,
        legalPerson: data.legal_person,
        address: data.address,
        scale: data.company_size,
        registeredCapital: data.registered_capital,
        establishedTime: data.incorporation,
        introduction: data.introduce
      }
    })
  },
  onReady() {
    this.$nextTick(() => {
      this.$refs.companyDataRef.setRules(this.companyDataRules)
    })
  },
  methods: {
    industryConfirm({ value }) {
      this.initData.industry = value.toString()
      this.industryShow = false
    },
    clickConfirm() {
      this.$refs.companyDataRef.validate().then(vaild => {
        if (vaild) {
          editCompanyData(this.initData.openid, {
            ...this.initData,
            type: 2,
            status: Number(this.initData.status),
            legal_person: this.initData.legalPerson,
            company_size: this.initData.scale,
            registered_capital: this.initData.registeredCapital,
            incorporation: this.initData.establishedTime,
            introduce: this.initData.introduction
          }).then(() => {
            uni.navigateTo({
              url: `/pages/enterprise-information/index?type=releaseOrder&id=${this.userInfo.id}`
            })
          })
        }
      })
    },

    scaleSelect(value) {
      this.initData.scale = value.name
      this.scaleShow = false
    },
    timeConfirm(value) {
      this.initData.establishedTime = value
      this.establishedTimeShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
::v-deep .introduction {
  .u-form-item__body {
    flex-direction: column !important;
  }
  .u-form-item__body__right {
    margin-top: 10px;
  }
}
</style>
