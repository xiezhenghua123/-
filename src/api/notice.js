/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-29 16:32:31
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 00:28:30
 */
import request from './request'

const getNotice = id => {
  return request(
    'get',
    'notice/me/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const delNotice = id => {
  return request(
    'delete',
    'notice/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

export { getNotice, delNotice }
