/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-27 10:45:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 16:42:34
 */
import request from './request'

// 发布职位
const releaseJob = data => {
  return request('post', 'workOrder/add', data)
}

// 获取所有职位
const allJob = (page, data) => {
  return request('post', 'workOrder/list/:page', data, {
    params: {
      page: page
    }
  })
}

// 获取职位详情
const jobDetail = id => {
  return request(
    'get',
    'workOrder/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

// 修改职位信息
const editJobMssage = (id, data) => {
  return request('put', 'workOrder/:id', data, {
    params: {
      id: id
    }
  })
}

//职位下架
const delJob = (id, data) => {
  return request('put', 'workOrder/:id', data, {
    params: {
      id: id
    }
  })
}

// 获取我的发布职位

const getMyReleaseJob = uuid => {
  return request(
    'get',
    'workOrder/me/:id',
    {},
    {
      params: {
        id: uuid
      }
    }
  )
}

//查看应聘者

const getJobApplyPerson = wid => {
  return request(
    'get',
    'applicationOrder/workOrder/:wid',
    {},
    {
      params: {
        wid: wid
      }
    }
  )
}

const collect = data => {
  return request('post', 'collection/workerOrder', data)
}

// 取消收藏
const cancelCollect = (workOrderId, workerId) => {
  return request(
    'delete',
    'collection/workerOrder/:id',
    {
      workOrderId: workOrderId
    },
    {
      params: {
        id: workerId
      }
    }
  )
}

// 获取收藏招聘帖
const getCollection = id => {
  return request(
    'get',
    'collection/workerOrder/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}
export {
  releaseJob,
  allJob,
  jobDetail,
  editJobMssage,
  delJob,
  getMyReleaseJob,
  getJobApplyPerson,
  collect,
  cancelCollect,
  getCollection
}
