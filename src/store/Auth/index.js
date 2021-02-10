import { AUTH_USER, LOGIN_USER, REGISTER_USER } from '../../gql'
import { toast } from '../../helpers'
import router from '../../router'
import { apolloClient } from '../../vue-apollo'

const state = {
	user: {},
	authStatus: false,
	token: localStorage.getItem('apollo-token')
}

const getters = {
	user: state => state.user,
	isAuth: state => state.token,
	authStatus: state => state.authStatus
}

const actions = {
	async loginUser({ dispatch }, userData) {
		try {
			let { data: { loginUser } } = await apolloClient.query({
				query: LOGIN_USER,
				variables: userData
			})
			dispatch('setAuthUserData', loginUser)
		} catch (err) {
			toast('error', err.message.split(': ')[1])
		}
	},

	async registerUser({ dispatch }, userData) {
		let { data: { registerUser } } = await apolloClient.mutate({
			mutation: REGISTER_USER,
			variables: userData
		})
		dispatch('setAuthUserData', registerUser)
		toast('success', 'You are now registered.')
	},

	async setAuthUserData({ commit }, payload) {
		commit('LOGIN_USER', payload)
		commit('SET_TOKEN', payload)
		// Set token in localstorage
		localStorage.setItem('apollo-token', payload.token.split(' ')[1])
		// redirect the user to the dashboard
		router.push('/dashboard')
		toast('success', 'You are now logged in.')
	},

	async getAuthUser({ commit, dispatch }) {
		try {
			let { data: { authUser } } = await apolloClient.query({
				query: AUTH_USER,
			})
			commit("LOGIN_USER", { user: authUser })
		} catch (err) {
			dispatch('logoutUser')
		}
	},

	logoutUser({ commit, state }) {
		if (state.token) {
			toast('success', 'You are now logged out.')
		}
		commit('LOGOUT_USER')
		localStorage.removeItem('apollo-token')
	}
}

const mutations = {
	LOGIN_USER(state, payload) {
		state.user = payload.user
		state.authStatus = true
	},

	SET_TOKEN(state, payload) {
		state.token = payload.token
	},

	LOGOUT_USER(state) {
		state.user = {}
		state.authStatus = false
		state.token = null
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}