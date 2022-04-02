/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:34:01
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-02 18:57:13
 */
import App from './App'
import store from '@/store/index.js'
import utils from './utils/index.js'

import uView from 'uview-ui'
Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
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
