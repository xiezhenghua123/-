/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 20:08:30
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 22:41:22
 */
import timeChange from './time-change.js'

const sleep = time => {
  return new Promise((res, rej) => {
    setTimeout(res, time)
  })
}

export default {
  install(Vue) {
    Vue.prototype.$methods = {
      timeChange,
      sleep,
    }
  },
}
