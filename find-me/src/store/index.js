import Vue from "vue";
import Vuex from "vuex";
import {auth, db} from "@/firebase";
import router from "@/router";
// import posts from "../modules/posts";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: "",
		post: ""
	},
	mutations: {
		newUser(state, payload) {
			state.user = payload;
			if (payload == null) {
				state.user = "";
			} else {
				state.user = payload;
			}
		},
		setPost(state, payload) {
			state.post = payload;
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
		},
		async getPost({commit}, infoPost) {
			try {
				const info = Object.values(infoPost);
				console.log("TCL: getPost -> info", info[0], info[1]);
				db.collection("users")
					.doc(info[0])
					.collection("posts")
					.doc(info[1])
					.get()
					.then((doc) => {
						// console.log("TCL: getPost -> doc", doc.data());
						let post = doc.data();
						post.id = doc.id;
						console.log(post);
						commit("setPost", post);
					});
			} catch (error) {
				console.log("TCL: setUser -> error", error);
			}
		},
		editPost({commit}, post) {
			const hola = Object.values(post);
			console.log("TCL: editPost -> hola", hola);
			/* db.collection("users")
				.doc(hola[0])
				.collection("posts")
				.doc(hola[1])
				.update({
					titlePost: post.titlePost
				})
				.then(() => {
					console.log("Eres el puto amo!!!");
				}); */
		}
	},
	modules: {
		/* posts */
	}
});
