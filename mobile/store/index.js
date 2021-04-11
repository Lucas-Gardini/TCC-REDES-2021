export const strict = false;

export const state = function () {
	return {
		authenticated: false,
		authentication: { name: '', passwd: '' },
	};
};

export const mutations = {
	authenticate(state, payload) {
		state.authenticated = true;
		state.authentication = payload;
	},
	unAuthenticate(state) {
		state.authenticated = false;
		state.authentication = { name: '', passwd: '' };
		this.$router.push('/auth');
	},
};

export const getters = {
	getAuthentication(state) {
		return state.authenticated;
	},
};
