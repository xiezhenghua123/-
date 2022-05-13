/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-10 23:26:34
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 23:28:24
 */
import request from './request/index.js'

const addTip = data => {
  return request('post', 'tip/add', data)
}

export { addTip }
