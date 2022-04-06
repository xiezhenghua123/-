/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-03 14:52:20
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-03 15:00:52
 */
import { request } from './request'
const getJobList = (data = {}) => {
  return request({
    url: '/getJobList',
    method: 'GET',
    data: data,
  })
}
export { getJobList }
