/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-25 23:09:33
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-01 17:19:42
 */
import request from './request/index'

const checkConfirm = data => {
  return request('post', 'check', data)
}

const authenticate = data => {
  return request('post', '/authenticate', data)
}

const getStudentConfirmData = id => {
  return request(
    'get',
    'worker/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const getCompanyConfirmData = id => {
  return request(
    'get',
    'company/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

const editCompanyData = (id, data) => {
  return request('put', ':id/update', data, {
    params: {
      id: id
    }
  })
}
export {
  checkConfirm,
  authenticate,
  getStudentConfirmData,
  getCompanyConfirmData,
  editCompanyData
}
