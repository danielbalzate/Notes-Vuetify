import Vue from "vue";
import Vuex from "vuex";
import {auth, db} from "@/firebase";
import router from "@/router";
// import posts from "../modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: ""
	},
	mutations: {
		newUser(state, payload) {
			state.user = payload;
			if (payload == null) {
				state.user = "";
			} else {
				state.user = payload;
			}
		}
	},
	actions: {
		async setUser({commit}, user) {
			try {
				const doc = await db
					.collection("users")
					.doc(user.uid)
					.get();

				if (doc.exists) {
					commit("newUser", doc.data());
				} else {
					const userData = {
						name: user.displayName,
						email: user.email,
						photo: user.photoURL,
						uid: user.uid
					};
					await db
						.collection("users")
						.doc(userData.uid)
						.set(userData);
					// console.log("Usuario guardado");
					commit("newUser", userData);
				}
			} catch (error) {
				console.log("TCL: setUser -> error", error);
			}
		},
		logoutUser({commit}) {
			auth.signOut();
			commit("newUser", null);
			router.push({name: "Ingreso"});
		}
	},
	modules: {
		/* posts */
	}
});
