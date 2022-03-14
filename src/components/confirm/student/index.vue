<template>
  <view>
    <u-modal
      :show="show"
      title="学生认证"
      showCancelButton
      @cancel="studentCancel"
      @confirm="studentConfirm"
    >
      <view class="flex-dir form-data">
        <u-form
          labelPosition="top"
          :model="studentData"
          :rules="studentFormRules"
          ref="student"
        >
          <u-form-item label="姓名" prop="name" borderBottom required>
            <u--input v-model="studentData.name" border="none"></u--input>
          </u-form-item>
          <u-form-item label="学号" prop="number" borderBottom required>
            <u--input v-model="studentData.number" border="none"></u--input>
          </u-form-item>
          <u-form-item label="学院" prop="college" borderBottom required>
            <u--input v-model="studentData.college" border="none"></u--input>
          </u-form-item>
          <u-form-item label="专业" prop="major" borderBottom required>
            <u--input v-model="studentData.major" border="none"></u--input>
          </u-form-item>
        </u-form>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { mapActions } from 'vuex'
import { name, schoolNumber } from '@/data/rules.js'
export default {
  name: 'student',
  props: {
    studentShow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    studentShow(val) {
      this.show = val
    },
  },
  data() {
    return {
      show: false,
      studentData: {
        name: '',
        number: '',
        college: '',
        major: '',
      },
      studentFormRules: {
        name: [...name],
        number: [...schoolNumber],
        college: {
          type: 'string',
          required: true,
          message: '请正确填写学院',
          trigger: 'blur',
        },
        major: {
          type: 'string',
          required: true,
          message: '请正确填写专业',
          trigger: 'blur',
        },
      },
    }
  },
  methods: {
    ...mapActions('appState', ['setIdentity']),
    studentCancel() {
      this.show = false
      this.$emit('update:studentShow', this.show)
    },
    studentConfirm() {
      this.$refs.student.validate().then(data => {
        if (data) {
          this.show = false
          this.$emit('update:studentShow', this.show)
          this.$emit('statusUpdate', true)
          uni.showModal({
            title: '提交成功，管理员将在1-2天内进行审核',
            showCancel: false,
          })
          this.setIdentity({ name: '学生', key: 'student' })
        }
      })
    },
  },
  onReady() {
    this.$refs.student.setRules(this.studentFormRules)
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
