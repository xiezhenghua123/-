/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-03 15:56:18
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-03 16:15:05
 */
import request from './request'

const addComplain = data => {
  return request('post', 'tip/add', data)
}

const getMyComplainList = id => {
  return request(
    'get',
    'tip/me:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

export { addComplain, getMyComplainList }
