/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 20:08:30
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-05 22:08:05
 */
import timeChange from './time-change.js'
import chat from './chat.js'

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
      chat,
    }
  },
}
