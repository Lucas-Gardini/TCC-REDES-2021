import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
	createPersistedState({
		key: 'cookies',
	})(store);
};
