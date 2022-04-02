/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-01 22:36:10
 */

const state = () => {
  return {
    // isLogin: false,
    isLogin: false,
    // isConfirm: false,
    identity: 'student',
    // identityArray: []\
    userInfo: {},
    identityArray: [
      {
        name: '学生',
        key: 'student',
      },
      {
        name: '企业',
        key: 'company',
      },
    ],
  }
}

const actions = {
  setIdentity({ commit }, data) {
    commit('setIdentity', data)
  },
  changeIdentity({ commit }, data) {
    commit('changeIdentity', data)
  },
  setLogin({ commit }, data) {
    commit('setLogin', data)
  },
  setUserInfo({ commit }, data) {
    commit('setUserInfo', data)
  },
}

const mutations = {
  setIdentity(state, data) {
    console.log(data)
    state.identity = data.key
    if (
      !state.identityArray.some(item => {
        return item.key === data.key
      })
    ) {
      state.identityArray.push(data)
    }
  },
  changeIdentity(state, data) {
    if (state.isLogin) {
      const status = state.identityArray.filter(item => {
        return item.key !== state.identity
      })[0].key
      state.identity = status
    }
  },
  setLogin(state, data) {
    state.isLogin = data
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
