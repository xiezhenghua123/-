<!--
 * @Descripttion: 
 * @version: 
 * @Author: ZhenghuaXie
 * @Date: 2022-03-13 18:51:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-14 21:28:30
-->
<template>
  <view>
    <fixed-button text="确认" @click="clickConfirm"></fixed-button>
    <view class="content-box size16">
      <view class="headline">基本信息</view>
      <u--form
        :model="basic"
        ref="basicRef"
        :rules="basicRules"
        labelWidth="auto"
      >
        <u-form-item prop="headPhoto" label="头像：" required>
          <u-upload
            maxCount="1"
            :fileList="basic.headPhoto"
            name="avatar"
            @delete="deletePic"
            @afterRead="afterRead"
          ></u-upload>
        </u-form-item>
        <u-form-item prop="name" label="姓名：" borderBottom required>
          <u--input v-model="basic.name" border="none"></u--input>
        </u-form-item>
        <u-form-item
          prop="sex"
          label="性别："
          borderBottom
          required
          @click="sexShow = true"
        >
          <u--input
            v-model="basic.sex"
            disabled
            placeholder="请选择性别"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :show="sexShow"
            :actions="sexArray"
            title="请选择性别"
            @close="sexShow = false"
            @select="sexSelect"
            closeOnClickOverlay
          >
          </u-action-sheet>
        </u-form-item>
        <u-form-item prop="age" label="年龄：" borderBottom required>
          <u--input v-model="basic.age" border="none"></u--input>
        </u-form-item>
        <u-form-item prop="tel" label="联系电话：" borderBottom required>
          <u--input v-model="basic.tel" border="none"></u--input>
        </u-form-item>
        <u-form-item
          prop="maxEducation"
          label="最高学历："
          borderBottom
          required
          @click="maxEducationShow = true"
        >
          <u--input
            v-model="basic.maxEducation"
            disabled
            placeholder="请选择最高学历"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
          <u-action-sheet
            :show="maxEducationShow"
            :actions="maxEducationArray"
            title="请选择最高学历"
            @close="maxEducationShow = false"
            @select="maxEducationSelect"
            closeOnClickOverlay
          >
          </u-action-sheet>
        </u-form-item>
      </u--form>
    </view>
  </view>
</template>
<script>
import { name, tel } from '@/data/rules.js'
import data from '../data.js'
export default {
  data() {
    return {
      basic: {},

      basicRules: {
        headPhoto: {
          required: true,
          message: '请上传头像',
          validator: (rule, value, callback) => {
            return !!value.length
          },
        },
        name: name,
        sex: {
          required: true,
          max: 1,
          message: '请选择性别',
          trigger: ['blur', 'change'],
        },
        age: {
          required: true,
          message: '请输入年龄',
          trigger: ['blur', 'change'],
        },
        tel: tel,
        maxEducation: {
          required: true,
          message: '请选择最高学历',
          trigger: ['blur', 'change'],
        },
      },
      sexArray: [{ name: '男' }, { name: '女' }],
      sexShow: false,
      maxEducationArray: [
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' },
      ],
      maxEducationShow: false,
      jobExpectations: {},
      educations: [],
      internshipExperience: [],
      projectExperience: [],
      selfEvaluation: '',
    }
  },
  onLoad() {
    const { basic } = data
    let obj = {}
    basic.forEach(item => {
      if (item.key === 'headPhoto') {
        this.$set(obj, item.key, [{ url: item.content }])
      } else {
        this.$set(obj, item.key, item.content)
      }
    })
    this.basic = obj
  },
  onReady() {
    this.$refs.basicRef.setRules(this.basicRules)
  },
  methods: {
    clickConfirm() {},
    //选择器默认值函数
    sexSelect(index) {
      // this[`${value}`] = false
      this.basic.sex = index.name
      this.sexShow = false
    },
    maxEducationSelect(index) {
      this.basic.maxEducation = index.name
      this.maxEducationShow = false
    },
    deletePic() {
      this.basic.headPhoto = []
      this.$refs.basicRef.validateField('headPhoto')
    },
    afterRead(event) {
      this.basic.headPhoto = [{ url: event.file.url }]
      this.$refs.basicRef.validateField('headPhoto')
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'style/form.scss';
::v-deep.content-box {
  .u-upload__wrap__preview__image {
    border-radius: 50%;
  }
  .u-form {
    margin: auto 10px;
  }
}
</style>
