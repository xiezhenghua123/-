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
          <u-form-item label="姓名" prop="name" borderBottom required>
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
          <u-form-item label="行业" prop="industry" borderBottom required>
            <u--input v-model="companyData.industry" border="none"></u--input>
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
        </u-form>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import { name, socialCode } from '@/data/rules.js'
export default {
  name: 'company',
  props: {
    companyShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    companyShow(val) {
      this.show = val
    },
  },
  data() {
    return {
      show: false,
      companyData: {
        name: '',
        number: '',
        industry: '',
        legalPerson: '',
      },
      companyFormRules: {
        name: name,
        number: socialCode,
        industry: {
          type: 'string',
          required: true,
          message: '请正确填写行业',
          trigger: 'blur',
        },
        legalPerson: {
          type: 'string',
          required: true,
          message: '请正确填写法定代表人',
          trigger: 'blur',
        },
      },
    }
  },
  methods: {
    ...mapActions('appState', ['setIdentity']),
    companyCancel() {
      this.show = false
      this.$emit('update:companyShow', this.show)
    },
    companyConfirm() {
      this.$refs.company.validate().then(data => {
        if (data) {
          this.show = false
          this.$emit('update:companyShow', this.show)
          this.$emit('statusUpdate', true)
          uni.showModal({
            title: '提交成功，管理员将在1-2天内进行审核',
            showCancel: false,
          })
          this.setIdentity({ name: '企业', key: 'company' })
        }
      })
    },
  },
  onReady() {
    this.$refs.company.setRules(this.companyFormRules)
  },
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
