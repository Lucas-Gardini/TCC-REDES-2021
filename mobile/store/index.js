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
	async unAuthenticate(state) {
		this.$router.push('/auth');
		try {
			const logoff = await this.$axios.post(
				'http://localhost:8080/user/logoff'
			);
			if (logoff.data.success === true) {
				state.authenticated = false;
				state.authentication = { name: '', passwd: '' };
				this.$router.push('/auth');
			} else {
				this.loggedOutError = true;
			}
		} catch (e) {
			console.log(e);
		}
	},
};

export const getters = {
	getAuthentication(state) {
		return state.authenticated;
	},
};
