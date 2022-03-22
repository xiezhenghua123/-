/*
 * @Descripttion:校验规则
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-14 17:08:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-21 14:33:48
 */
const name = [
  {
    required: true,
    message: '请输入姓名',
    validator: (rule, value, callback) => {
      return !!value
    },
    trigger: ['blur', 'change'],
  },
  {
    min: 2,
    message: '名字太短',
    trigger: ['blur', 'change'],
  },
  {
    max: 8,
    message: '名字太长',
    trigger: ['blur', 'change'],
  },
]
const tel = [
  {
    required: true,
    message: '请输入联系方式',
    trigger: ['blur', 'change'],
  },
  {
    type: 'number',
    validator: (rule, value, callback) => {
      return uni.$u.test.mobile(value)
    },
    message: '手机号码格式错误',
    trigger: ['blur', 'change'],
  },
]

const socialCode = [
  {
    required: true,
    message: '请输入统一社会信用代码',
    trigger: ['blur', 'change'],
  },
  {
    pattern: /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/,
    transform(value) {
      return String(value)
    },
    message: '统一社会信用代码格式错误',
    trigger: ['blur', 'change'],
  },
]

const schoolNumber = [
  {
    type: 'number',
    require: true,
    message: '请输入学号',
    trigger: ['blur', 'change'],
  },
  {
    length: 12,
    message: '学号格式错误',
    trigger: ['blur', 'change'],
  },
]
export { name, tel, socialCode, schoolNumber }
