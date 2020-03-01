import Vue from "vue";
import Vuex from "vuex";
import {auth, db} from "@/firebase";
import router from "@/router";
import Swal from "sweetalert2";
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
				// console.log("TCL: getPost -> info", info[0], info[1]);
				db.collection("users")
					.doc(info[0])
					.collection("posts")
					.doc(info[1])
					.get()
					.then((doc) => {
						// console.log("TCL: getPost -> doc", doc.data());
						let post = doc.data();
						post.id = doc.id;
						// console.log(post);
						commit("setPost", post);
					});
			} catch (error) {
				console.log("TCL: setUser -> error", error);
			}
		},
		editPost({commit}, post) {
			const infoPost = Object.values(post);
			// console.log("TCL: editPost -> infoPost", infoPost);
			// console.log("TCL: photoPost -> photoPost", infoPost[1]);
			// console.log("TCL: editPost -> PostID", infoPost[7]);
			// console.log("TCL: editPost -> PostID", infoPost[7]);

			db.collection("users")
				.doc(infoPost[11])
				.collection("posts")
				.doc(infoPost[13])
				.update({
					titlePost: post.titlePost,
					messagePost: post.messagePost,
					imgPost: post.imgPost,
					breed: post.breed,
					species: post.species,
					weight: post.weight,
					height: post.height,
					gender: post.gender,
					age: post.age
				})
				.then(() => {
					Swal.fire({
						icon: "success",
						title: "¡Has editado el post correctamente!",
						showConfirmButton: false,
						timer: 1000
					});
					router.push({name: "Adopt"});
				});
		},
		deletePost({commit}, post) {
			const infoPost = Object.values(post);
			Swal.fire({
				title: "¿Estás seguro que quieres eliminar este post?",
				text: "Recuerda que si el perrito fue adopato cambiar el estado",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Estoy seguro de eliminarlo",
				cancelButtonText: "Cancelar"
			}).then((result) => {
				if (result.value) {
					db.collection("users")
						.doc(infoPost[11])
						.collection("posts")
						.doc(infoPost[13])
						.delete()
						.then(() => {
							Swal.fire({
								icon: "success",
								title: "¡Has eliminado el post correctamente!",
								showConfirmButton: false,
								timer: 1000
							});
							router.push({name: "Adopt"});
						});
				}
			});
		}
	},
	modules: {
		/* posts */
	}
});
