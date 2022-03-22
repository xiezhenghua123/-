/*
 * @Descripttion:uniapp编译成微信小程序的话，template和js最好分开，不然响应式效果不好
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-17 15:24:44
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-21 14:55:50
 */
import { name, tel } from 'data/rules.js'
import data from '../data.js'
export default {
  data() {
    return {
      internshipExperience: {
        companyName: '',
        start: {
          show: false,
          time: '',
        },
        end: {
          show: false,
          time: '',
        },
        job: '',
        details: '',
      },
      projectExperience: {
        projectName: '',
        start: {
          show: false,
          time: '',
        },
        end: {
          show: false,
          time: '',
        },
        job: '',
        details: '',
      },
      education: {
        schoolName: '',
        start: {
          show: false,
          time: '',
        },
        end: {
          show: false,
          time: '',
        },
        rank: {
          show: false,
          text: '',
        },
        major: '',
        details: '',
      },
      educationsRules: {
        schoolName: {
          type: 'string',
          required: true,
          message: '请输入学校名称',
          trigger: ['change', 'blur'],
        },
        start: {
          message: '请选择入学时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur'],
        },
        end: {
          message: '请选择毕业时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur'],
        },
        rank: {
          message: '请选择毕业学历',
          validator: (rule, value, callback) => {
            return !!value.text
          },
          trigger: ['change', 'blur'],
        },
        major: {
          type: 'string',
          message: '请输入就读专业',
          required: true,
          trigger: ['change', 'blur'],
        },
      },
      internshipExperiencesRules: {
        companyName: {
          type: 'string',
          required: true,
          message: '请输入企业名称',
          trigger: ['change', 'blur'],
        },
        start: {
          message: '请选择开始时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur'],
        },
        end: {
          message: '请选择结束时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur'],
        },

        job: {
          type: 'string',
          message: '请输入实习岗位',
          required: true,
          trigger: ['change', 'blur'],
        },
      },
      basic: {},
      basicRules: {
        headPhoto: {
          required: true,
          message: '请上传头像',
          validator: (rule, value, callback) => {
            console.log(value)
            return !!value.length
          },
          trigger: ['blur', 'change'],
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
      internshipExperiences: [],
      projectExperiences: [],
      selfEvaluation: '',
    }
  },
  onLoad() {
    const {
      basic,
      jobExpectations,
      educations,
      internshipExperiences,
      projectExperiences,
      selfEvaluation,
    } = data
    basic.forEach(item => {
      if (item.key === 'headPhoto') {
        this.$set(this.basic, item.key, [{ url: item.content }])
      } else {
        this.$set(this.basic, item.key, item.content)
      }
    })
    jobExpectations.forEach(item => {
      this.$set(this.jobExpectations, item.key, item.content)
    })
    this.educations = educations.map(item => {
      return {
        ...item,
        start: { show: false, time: item.start },
        end: { show: false, time: item.end },
        rank: { show: false, text: item.rank },
      }
    })
    this.internshipExperiences = internshipExperiences.map(item => {
      return {
        ...item,
        start: { show: false, time: item.start },
        end: { show: false, time: item.end },
      }
    })
    this.projectExperiences = projectExperiences.map(item => {
      return {
        ...item,
        start: { show: false, time: item.start },
        end: { show: false, time: item.end },
      }
    })
    this.selfEvaluation = selfEvaluation
  },
  onReady() {
    this.$refs.basicRef.setRules(this.basicRules)

    this.educations.forEach((item, index) => {
      this.$refs[`educationRef${index}`][0].setRules(this.educationsRules)
    })
    this.internshipExperiences.forEach((item, index) => {
      this.$refs[`internshipExperienceRef${index}`][0].setRules(
        this.internshipExperiencesRules
      )
    })
    this.projectExperiences.forEach((item, index) => {
      this.$refs[`projectExperienceRef${index}`][0].setRules(
        this.internshipExperiencesRules
      )
    })
  },
  methods: {
    timeConfirm(e, type, item) {
      if (type === 'end') {
        if (
          this.$methods.timeChange.timestamp(item['start'].time) >=
          this.$methods.timeChange.timestamp(e)
        ) {
          uni.showToast({
            title: '结束时间不能小于开始时间',
            icon: 'error',
          })
          return false
        }
      } else {
        if (
          this.$methods.timeChange.timestamp(item['end'].time) <=
          this.$methods.timeChange.timestamp(e)
        ) {
          uni.showToast({
            title: '开始时间不能小于结束时间',
            icon: 'error',
          })
          return false
        }
      }
      item[type].time = e
    },
    clickConfirm() {
      console.log(
        this.$refs.basicRef,
        this.$refs.basicRef.validate().then(item => {
          console.log(item)
        })
      )
      this.$refs.basicRef.validate()

      this.educations.forEach((item, index) => {
        this.$refs[`educationRef${index}`][0].validate()
      })
      this.internshipExperiences.forEach((item, index) => {
        this.$refs[`internshipExperienceRef${index}`][0].validate()
      })
      this.projectExperiences.forEach((item, index) => {
        this.$refs[`projectExperienceRef${index}`][0].validate()
      })
    },
    //选择器默认值函数
    sexSelect(index) {
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
    rankSelect(value, index, item) {
      item['rank'].text = value.name
      item['rank'].show = false
      this.$set(this.educations, index, JSON.parse(JSON.stringify(item)))
    },
    addExperience(type) {
      this[`${type}s`].push(this[type])
    },
    removeExperience(type, index) {
      this[`${type}s`].splice(index, 1)
    },
    clickShow(item, type) {
      item[type].show = true
    },

    rankClose(item) {
      item.rank.show = false
    },
  },
}
