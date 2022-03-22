/*
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-03-11 22:35:51
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-03-20 21:08:01
 */
const state = () => {
  return {
    isLogin: true,
    // isConfirm: false,
    identity: 'company',
    // identityArray: []
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
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
