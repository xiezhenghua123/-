/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-25 23:09:33
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-27 10:12:17
 */
import request from './request/index'

const checkConfirm = data => {
  return request('post', 'check', data)
}

const authenticate = data => {
  return request('post', '/authenticate', data)
}

export { checkConfirm, authenticate }
