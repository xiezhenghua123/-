/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-27 10:45:08
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-28 18:11:38
 */
import request from './request'

// 发布职位
const releaseJob = data => {
  return request('post', 'workOrder/add', data)
}

// 获取所有职位
const allJob = page => {
  return request(
    'get',
    'workOrder/list/:page',
    {},
    {
      params: {
        page: page
      }
    }
  )
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
const delJob = id => {
  return request('delete', 'workOrder/:id', data, {
    params: {
      id: id
    }
  })
}

// 获取我的发布职位

const getMyReleaseJob = uuid => {
  return request(
    'get',
    'workOrder/:cid',
    {},
    {
      params: {
        cid: uuid
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
export {
  releaseJob,
  allJob,
  jobDetail,
  editJobMssage,
  delJob,
  getMyReleaseJob,
  getJobApplyPerson
}
