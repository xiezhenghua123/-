/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-27 11:03:37
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-08 15:21:43
 */
import request from './request'

//应聘操作
const addApplyJob = data => {
  return request('post', 'applicationOrder/add', data)
}

//取消应聘

const cancelApply = (id, status) => {
  return request('put', 'applicationOrder/:id', status, {
    params: {
      id: id
    }
  })
}

// 获取我的应聘订单列表
const getApplyJobList = uid => {
  return request(
    'get',
    'applicationOrder/user/:uid',
    {},
    {
      params: {
        uid: uid
      }
    }
  )
}

// 查看应聘者
const getWorkers = id => {
  return request(
    'get',
    'applicationOrder/workOrder/:wid',
    {},
    {
      params: {
        params: {
          wid: id
        }
      }
    }
  )
}

export { addApplyJob, cancelApply, getApplyJobList, getWorkers }
