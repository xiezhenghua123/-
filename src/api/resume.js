/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-30 11:37:11
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 21:32:05
 */
import request from './request'

const getMyResume = openid => {
  return request(
    'get',
    'resume/me/:id',
    {},
    {
      params: {
        id: openid
      }
    }
  )
}

const editResume = (resumeId, data) => {
  return request('put', 'resume/:id', data, {
    params: {
      id: resumeId
    }
  })
}

const createResume = data => {
  return request('post', 'resume/add', data)
}

const getResumeList = (page, data) => {
  return request('post', 'resume/list/:page', data, {
    params: {
      page: page
    }
  })
}

const collect = data => {
  return request('post', 'collection/resume', data)
}

const cancelCollect = (collectionId, resumeId) => {
  return request(
    'delete',
    'collection/resume/:id',
    {
      resumeId: resumeId
    },
    {
      params: {
        id: collectionId
      }
    }
  )
}

const getCollect = id => {
  return request(
    'get',
    'collection/resume/:id',
    {},
    {
      params: {
        id: id
      }
    }
  )
}

export {
  getMyResume,
  editResume,
  createResume,
  getResumeList,
  collect,
  cancelCollect,
  getCollect
}
