<template>
  <view>
    <u-modal
      :show="show"
      title="企业认证"
      showCancelButton
      @cancel="companyCancel"
      @confirm="companyConfirm"
    >
      <view class="flex-dir form-data">
        <u-form
          labelWidth="auto"
          labelPosition="top"
          :model="companyData"
          :rules="companyFormRules"
          ref="company"
        >
          <u-form-item label="企业名称" prop="name" borderBottom required>
            <u--input v-model="companyData.name" border="none"></u--input>
          </u-form-item>
          <u-form-item
            label="统一社会信用代码"
            prop="number"
            borderBottom
            required
          >
            <u--input v-model="companyData.number" border="none"></u--input>
          </u-form-item>
          <u-form-item
            label="行业"
            prop="industry"
            borderBottom
            required
            @click="industryShow = true"
          >
            <u--input
              v-model="companyData.industry"
              border="none"
              disabled
              placeholder="请选择行业"
            ></u--input>
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
            label="法定代表人"
            prop="legalPerson"
            borderBottom
            required
          >
            <u--input
              v-model="companyData.legalPerson"
              border="none"
            ></u--input>
          </u-form-item>
          <u-form-item label="联系电话" prop="tel" borderBottom required>
            <u--input
              v-model="companyData.tel"
              border="none"
              type="number"
            ></u--input>
          </u-form-item>
        </u-form>
      </view>
    </u-modal>
  </view>
</template>

<script>
// import { mapActions } from 'vuex'
import { industrySort } from '@/data/industry.js'
import { name, socialCode, tel } from '@/data/rules.js'
export default {
  name: 'company',
  props: {
    companyShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    companyShow(val) {
      this.show = val
    }
  },
  data() {
    return {
      industry: [industrySort],
      industryShow: false,
      show: false,
      companyData: {
        name: '',
        number: '',
        industry: '',
        legalPerson: '',
        tel: ''
      },
      companyFormRules: {
        tel: tel,
        legalPerson: name,
        number: socialCode,
        industry: {
          type: 'string',
          required: true,
          message: '请选择行业',
          trigger: 'blur'
        },
        name: {
          type: 'string',
          required: true,
          message: '请正确填写法定代表人',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // ...mapActions('appState', ['setIdentity']),
    industryConfirm({ value }) {
      this.companyData.industry = value.toString()
      this.industryShow = false
    },
    companyCancel() {
      this.show = false
      this.$emit('update:companyShow', this.show)
    },
    companyConfirm() {
      this.$refs.company.validate().then(data => {
        if (data) {
          this.show = false
          this.$emit('update:companyShow', this.show)
          this.$emit('statusUpdate', { confirmData: this.companyData, type: 2 })
          // uni.showModal({
          //   title: '提交成功，管理员将在1-2天内进行审核',
          //   showCancel: false,
          // })
          // this.setIdentity({ name: '企业', key: 'company' })
        }
      })
    }
  },
  onReady() {
    this.$refs.company.setRules(this.companyFormRules)
  }
}
</script>

<style lang="scss" scoped>
.flex-dir {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.flex {
  display: flex;
  align-items: center;
}

.form-data {
  // margin-bottom: 10rpx;
  font-size: $uni-font-size-lg;
}
</style>
