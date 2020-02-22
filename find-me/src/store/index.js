import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {}
	},
	mutations: {
		newUser(state, payload) {
			state.user = payload;
		}
	},
	actions: {
		setUser({commit}, user) {
			const userData = {
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
				uid: user.uid
			};
			commit("newUser", user);
		}
	},
	modules: {}
});
