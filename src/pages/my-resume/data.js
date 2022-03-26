/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 13:40:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-24 13:56:48
 */
const resumeData = {
  basic: {
    headPhoto: require('static/logo.png'),
    name: '张三',
    sex: '男',
    age: '23岁',
    tel: '123456789',
    maxEducation: '本科',
  },
  jobExpectations: {
    job: '产品运营',
    salary: '10k-15k',
    position: '杭州',
  },

  educations: [
    {
      schoolName: '湘潭大学',
      start: '2018-09',
      end: '2022-06',
      rank: '本科',
      major: '信息管理与信息系统',
      details: 'xxxxxxx',
    },
    {
      schoolName: '湘潭大学',
      start: '2018-09',
      end: '2024-06',
      rank: '本科',
      major: '信息管理与信息系统',
      details: 'xxxxxxx',
    },
  ],
  internshipExperiences: [
    {
      companyName: '上海合合科技',
      job: '前端开发',
      start: '2021-05',
      end: '2022-02',
      details:
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxx\n   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
  ],
  projectExperiences: [
    {
      projectName: '大学生兼职平台',
      job: '前端开发',
      start: '2021-05',
      end: '2022-02',
      details: 'xxxxxxxxxxxxxxxxxxxxx',
    },
  ],
  selfEvaluation: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
}

export default resumeData
