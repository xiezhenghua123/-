/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-25 23:08:31
 */
import request from './request/index.js'
import { getJobUrl } from './requestUrl'
const getJobList = data => {
  return request('get', '/getJobList', data, {
    baseURL: getJobUrl
  })
}
export { getJobList }
