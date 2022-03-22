/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-12 13:40:50
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-21 14:35:36
 */
const resumeData = {
  basic: [
    {
      title: '头像',
      key: 'headPhoto',
      content: require('static/logo.png'),
    },
    {
      title: '姓名',
      key: 'name',
      content: '张三',
    },
    {
      title: '性别',
      key: 'sex',
      content: '男',
    },
    {
      title: '年龄',
      key: 'age',
      content: '23岁',
    },
    {
      title: '电话',
      key: 'tel',
      content: '123456789',
    },
    {
      title: '最高学历',
      key: 'maxEducation',
      content: '',
    },
  ],
  jobExpectations: [
    {
      title: '期望岗位',
      key: 'job',
      content: '产品运营',
    },
    {
      title: '期望薪资',
      key: 'salary',
      content: '10-15k',
    },
    {
      title: '期望城市',
      key: 'position',
      content: '杭州',
    },
  ],
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
