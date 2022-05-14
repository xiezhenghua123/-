/*
 * @Descripttion:uniapp编译成微信小程序的话，template和js最好分开，不然响应式效果不好
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-17 15:24:44
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-14 15:09:11
 */
import { name, tel } from 'data/rules.js'
import data from '../data.js'
import minix from '../../minix/index.js'
import { getMyResume, editResume, createResume } from '@/api/resume.js'
import { mapState } from 'vuex'

export default {
  mixins: [minix],
  data() {
    return {
      internshipExperience: {
        companyName: '',
        start: {
          show: false,
          time: ''
        },
        end: {
          show: false,
          time: ''
        },
        job: '',
        details: ''
      },
      projectExperience: {
        projectName: '',
        start: {
          show: false,
          time: ''
        },
        end: {
          show: false,
          time: ''
        },
        job: '',
        details: ''
      },
      education: {
        schoolName: '',
        start: {
          show: false,
          time: ''
        },
        end: {
          show: false,
          time: ''
        },
        rank: {
          show: false,
          text: ''
        },
        major: '',
        details: ''
      },
      educationsRules: {
        schoolName: {
          type: 'string',
          required: true,
          message: '请输入学校名称',
          trigger: ['change', 'blur']
        },
        start: {
          message: '请选择入学时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },
        end: {
          message: '请选择毕业时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },
        rank: {
          message: '请选择毕业学历',
          validator: (rule, value, callback) => {
            return !!value.text
          },
          trigger: ['change', 'blur']
        },
        major: {
          type: 'string',
          message: '请输入就读专业',
          required: true,
          trigger: ['change', 'blur']
        }
      },
      internshipExperiencesRules: {
        companyName: {
          type: 'string',
          required: true,
          message: '请输入企业名称',
          trigger: ['change', 'blur']
        },
        start: {
          message: '请选择开始时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },
        end: {
          message: '请选择结束时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },

        job: {
          type: 'string',
          message: '请输入实习岗位',
          required: true,
          trigger: ['change', 'blur']
        }
      },
      projectExperiencesRules: {
        projectName: {
          type: 'string',
          required: true,
          message: '请输入企业名称',
          trigger: ['change', 'blur']
        },
        start: {
          message: '请选择开始时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },
        end: {
          message: '请选择结束时间',
          validator: (rule, value, callback) => {
            return !!value.time
          },
          trigger: ['change', 'blur']
        },

        job: {
          type: 'string',
          message: '请输入实习岗位',
          required: true,
          trigger: ['change', 'blur']
        }
      },
      basic: {},
      basicRules: {
        headPhoto: {
          required: true,
          message: '请上传头像',
          validator: (rule, value, callback) => {
            return !!value.length
          },
          trigger: ['blur', 'change']
        },
        name: name,
        sex: {
          required: true,
          max: 1,
          message: '请选择性别',
          trigger: ['blur', 'change']
        },
        age: {
          required: true,
          message: '请输入年龄',
          trigger: ['blur', 'change']
        },
        tel: tel,
        maxEducation: {
          required: true,
          message: '请选择最高学历',
          trigger: ['blur', 'change']
        }
      },
      sexArray: [{ name: '男' }, { name: '女' }],
      sexShow: false,
      maxEducationArray: [
        { name: '本科' },
        { name: '硕士' },
        { name: '博士' },
        { name: '博士后' }
      ],
      jobExpectationsRules: {
        job: {
          required: true,
          message: '请填写期望职位',
          trigger: ['blur', 'change']
        },
        salary: {
          required: true,
          message: '请填写薪资期望',
          trigger: ['blur', 'change']
        },
        position: {
          required: true,
          message: '请填写地点期望',
          trigger: ['blur', 'change']
        }
      },
      maxEducationShow: false,
      jobExpectations: {},
      educations: [],
      internshipExperiences: [],
      projectExperiences: [],
      selfEvaluation: '',
      isCreate: false, //是否第一次创建简历,
      resumeId: ''
    }
  },
  onLoad() {
    getMyResume(this.userInfo.openid).then(({ data }) => {
      if (data.length) {
        data = data[0]
        this.resumeId = data.id
        this.basic = {
          headPhoto: data.avatar,
          age: data.age,
          sex: data.sex,
          tel: data.phone,
          maxEducation: data.education,
          name: data.name
        }
        this.jobExpectations = {
          job: data.position,
          salary: data.salary,
          position: data.city
        }
        this.educations = JSON.parse(data.education_experience)
        this.internshipExperiences = JSON.parse(data.internship_experience)
        this.projectExperiences = JSON.parse(data.project_experience)
        this.selfEvaluation = data.self_assessment
      } else {
        this.isCreate = true
        this.basic = {
          headPhoto: '',
          name: '',
          sex: '',
          age: '',
          tel: '',
          maxEducation: ''
        }
        this.jobExpectations = { job: '', salary: '', position: '' }
        this.educations = []
        this.internshipExperiences = []
        this.projectExperiences = []
        this.selfEvaluation = ''
      }
    })
  },
  computed: {
    ...mapState('appState', ['userInfo']),
    previewFile() {
      return this.basic.headPhoto ? [{ url: this.basic.headPhoto }] : []
    }
  },
  onReady() {
    this.$refs.basicRef.setRules(this.basicRules)
    this.$refs.jobExpectationsRef.setRules(this.jobExpectationsRules)
    this.setRules('education')
    this.setRules('internshipExperience')
    this.setRules('projectExperience')
  },
  methods: {
    timeConfirm(e, type, item) {
      if (type === 'end') {
        if (
          this.$methods.timeChange.timestamp(item['start'].time) >=
          this.$methods.timeChange.timestamp(e)
        ) {
          this.$refs.uToast.show({
            message: '结束时间不能小于开始时间',
            type: 'error'
          })
          return false
        }
      } else {
        if (
          this.$methods.timeChange.timestamp(item['end'].time) <=
          this.$methods.timeChange.timestamp(e)
        ) {
          this.$refs.uToast.show({
            message: '开始时间不能大于结束时间',
            type: 'error'
          })
          return false
        }
      }
      item[type].time = e
    },
    checkRules(type) {
      return new Promise(async (resolve, reject) => {
        try {
          for (let i = 0; i < this[`${type}s`].length; i++) {
            await this.$refs[`${type}Ref${i}`][0].validate()
          }
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },
    async clickConfirm() {
      await this.$refs.basicRef.validate()
      await this.$refs.jobExpectationsRef.validate()
      await this.checkRules('education')
      await this.checkRules('internshipExperience')
      await this.checkRules('projectExperience')
      if (this.isCreate) {
        createResume({
          worker_id: this.userInfo.id,
          openid: this.userInfo.openid,
          avatar: this.basic.headPhoto,
          name: this.basic.name,
          age: this.basic.age,
          sex: this.basic.sex,
          phone: this.basic.tel,
          education: this.basic.maxEducation,
          position: this.jobExpectations.job,
          salary: this.jobExpectations.salary,
          city: this.jobExpectations.position,
          internship_experience: JSON.stringify(this.internshipExperiences),
          project_experience: JSON.stringify(this.projectExperiences),
          education_experience: JSON.stringify(this.educations),
          self_assessment: this.selfEvaluation
        }).then(data => {
          uni.navigateTo({
            url: '/pages/my-resume/index'
          })
        })
      } else {
        editResume(this.resumeId, {
          worker_id: this.userInfo.id,
          openid: this.userInfo.openid,
          avatar: this.basic.headPhoto,
          name: this.basic.name,
          age: this.basic.age,
          sex: this.basic.sex,
          phone: this.basic.tel,
          education: this.basic.maxEducation,
          position: this.jobExpectations.job,
          salary: this.jobExpectations.salary,
          city: this.jobExpectations.position,
          internship_experience: JSON.stringify(this.internshipExperiences),
          project_experience: JSON.stringify(this.projectExperiences),
          education_experience: JSON.stringify(this.educations),
          self_assessment: this.selfEvaluation
        }).then(() => {
          uni.navigateTo({
            url: '/pages/my-resume/index'
          })
        })
      }
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
    afterRead(file, lists, name) {
      const that = this
      uni.uploadFile({
        url: 'https://workfriend.jsky31.cn/api/image',
        filePath: file.file.url,
        name: 'image',
        header: {
          'content-type': 'multipart/form-data'
        },
        success: function ({ data }) {
          that.basic.headPhoto = JSON.parse(data).data
          that.$refs.basicRef.validateField('headPhoto')
        }
      })
    },
    deletePic(file, lists, name) {
      this.basic.headPhoto = ''
      this.$refs.basicRef.validateField('headPhoto')
    },
    clickPreview(url, lists, name) {
      uni.previewImage({
        urls: url
      })
    },
    rankSelect(value, index, item) {
      item['rank'].text = value.name
      item['rank'].show = false
      this.$set(this.educations, index, JSON.parse(JSON.stringify(item)))
    },
    setRules(type) {
      // await this.$methods.sleep(500)
      //异步更新
      this.$nextTick(() => {
        this[`${type}s`].forEach((item, index) => {
          this.$refs[`${type}Ref${index}`][0].setRules(this[`${type}sRules`])
        })
      })
    },
    addExperience(type) {
      this[`${type}s`].push(this[type])
      this.setRules(type)
    },
    removeExperience(type, index) {
      this[`${type}s`].splice(index, 1)
      this.setRules(type)
    },
    clickShow(item, type) {
      item[type].show = true
    },

    rankClose(item) {
      item.rank.show = false
    }
  }
}
