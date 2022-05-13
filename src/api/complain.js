/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-03 15:56:18
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-11 16:58:15
 */
import request from './request'

const addComplain = data => {
  return request('post', 'appeal/add', data)
}

const cancelComplain = (id, data) => {
  return request('put', 'appeal/:id', data, {
    params: {
      id: id
    }
  })
}

const getMyComplainList = (id, type) => {
  return request(
    'get',
    'appeal/me/:id',
    {},
    {
      params: {
        id: id
      },
      query: {
        type: type
      }
    }
  )
}

export { addComplain, getMyComplainList, cancelComplain }
