/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:34:01
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-05 22:11:12
 */
import App from './App'
import store from '@/store/index.js'
import utils from './utils/index.js'
import { goEasy, GoEasy } from './goEasy/index.js'

import uView from 'uview-ui'
Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.goEasy = goEasy
Vue.prototype.GoEasy = GoEasy

Vue.prototype.formatDate = function (t) {
  t = t || Date.now()
  let time = new Date(t)
  let str =
    time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  str += '-'
  str += time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  str += ' '
  str += time.getHours()
  str += ':'
  str += time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  return str
}

Vue.use(utils)
App.mpType = 'app'
const app = new Vue({
  ...App,
  store,
  utils,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif
