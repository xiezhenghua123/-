/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-16 20:08:30
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-16 20:22:46
 */
import timeChange from './time-change.js'

export default {
  install(Vue) {
    Vue.prototype.$methods = {
      timeChange,
    }
  },
}
