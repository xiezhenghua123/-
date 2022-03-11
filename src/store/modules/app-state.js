const state = () => {
	return {
		isLogin: true,
		// isConfirm: false,
		identity: 'company',
		// identityArray: []
		identityArray: [
			// {
			// 	name: '学生',
			// 	key: 'student'
			// },
			{
				name: '企业',
				key: 'company'
			},
		]
	}
}

const actions = {
	setIdentity({
		commit
	}, data) {
		commit('setIdentity', data)
	}
}

const mutations = {
	setIdentity(state, data) {
		console.log(data)
		state.identity = data.key
		if (!state.identityArray.some((item) => {
				return item.key === data.key
			})) {
			state.identityArray.push(data)
		}

	},
	changeIdentity(state, data) {
		if (state.isConfirm) {
			const status = state.identityArray.map((item) => {
				if (item.key !== state.identity) {
					return item.key
				}
			})[0]
			state.identity = status
		}
	}
}

const getters = {}

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations
}
