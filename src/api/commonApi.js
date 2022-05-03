/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 23:06:44
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 23:08:04
 */
import request from './request'

const getBanList = page => {
  return request('get', `banner/list/${page}`)
}
export { getBanList }
