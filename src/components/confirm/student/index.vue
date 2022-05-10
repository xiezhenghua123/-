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
          labelWidth="auto"
        >
          <u-form-item label="姓名" prop="name" borderBottom required>
            <u--input v-model="studentData.name" border="none"></u--input>
          </u-form-item>
          <u-form-item label="学号" prop="number" borderBottom required>
            <u--input v-model="studentData.number" border="none"></u--input>
          </u-form-item>
          <u-form-item label="联系电话" prop="tel" borderBottom required>
            <u--input v-model="studentData.tel" border="none"></u--input>
          </u-form-item>
          <u-form-item
            label="学院"
            prop="college"
            borderBottom
            required
            @click="collegeShow = true"
          >
            <u--input
              v-model="studentData.college"
              border="none"
              disabled
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-picker
              :show="collegeShow"
              :columns="college"
              @confirm="collegeConfirm"
              @cancel="collegeShow = false"
              title="选择学院"
            ></u-picker>
          </u-form-item>
          <u-form-item
            label="专业"
            prop="major"
            borderBottom
            required
            @click="majorShow = true"
          >
            <u--input
              v-model="studentData.major"
              border="none"
              disabled=""
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
            <u-picker
              :show="majorShow"
              :columns="major"
              @confirm="majorConfirm"
              @cancel="majorShow = false"
              title="选择专业"
            ></u-picker>
          </u-form-item>
        </u-form>
      </view>
    </u-modal>
  </view>
</template>

<script>
// import { mapActions } from 'vuex'
import { collegeData, majorData } from '@/data/schoolData.js'
import { name, schoolNumber, tel } from '@/data/rules.js'
export default {
  name: 'student',
  props: {
    studentShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    studentShow(val) {
      this.show = val
    }
  },
  data() {
    return {
      college: [collegeData],
      collegeShow: false,
      majorShow: false,
      major: [],
      show: false,
      studentData: {
        name: '',
        number: '',
        college: '',
        major: '',
        tel: ''
      },
      studentFormRules: {
        tel: tel,
        name: name,
        number: schoolNumber,
        college: {
          type: 'string',
          required: true,
          message: '请选择学院',
          trigger: 'blur'
        },
        major: {
          type: 'string',
          required: true,
          message: '请选择专业',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // ...mapActions('appState', ['setIdentity']),
    collegeConfirm({ value }) {
      this.studentData.college = value.toString()
      this.collegeShow = false
      this.major = [majorData[value.toString()]]
    },
    majorConfirm({ value }) {
      this.studentData.major = value.toString()
      this.majorShow = false
    },
    studentCancel() {
      this.show = false
      this.$emit('update:studentShow', this.show)
    },
    studentConfirm() {
      this.$refs.student.validate().then(data => {
        if (data) {
          this.show = false
          this.$emit('update:studentShow', this.show)
          this.$emit('statusUpdate', { confirmData: this.studentData, type: 1 })
          // uni.showModal({
          //   title: '提交成功，管理员将在1-2天内进行审核',
          //   showCancel: false,
          // })
          // this.setIdentity({ name: '学生', key: 'student' })
        }
      })
    }
  },
  mounted() {
    this.$refs.student.setRules(this.studentFormRules)
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
