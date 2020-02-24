<template>
	<v-card class="d-flex flex-wrap" flat tile>
		<v-card max-width="250" class="ma-3">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="user.photo" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">ESTO ES UN MENSAJE ESTATICO PAI</v-list-item-title>
					<v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-card-text>
				<v-row justify="center">
					<v-dialog v-model="dialog" persistent max-width="1200">
						<template v-slot:activator="{on}">
							<v-btn color="primary" dark v-on="on">Registrar post</v-btn>
						</template>
						<v-card>
							<v-card-text>
								<v-form v-model="isValid" @submit.prevent="addPost()">
									<v-container>
										<v-row>
											<v-flex xs-6>
												<v-card flat class="transparent">
													<v-card-title primary-title class="layout justify-center">
														<div class="headline">Registre un post</div>
														<v-spacer></v-spacer>
													</v-card-title>

													<v-card-text class="title font-weight-light">
														<v-text-field v-model="titlePost" :rules="titlePostRules" :counter="30" label="Título del post" required></v-text-field>
													</v-card-text>

													<v-list class="transparent">
														<v-list-item>
															<v-textarea outlined v-model="messagePost" name="input-7-4" label="¡Esperamos tus mensajes!" value=""></v-textarea>
														</v-list-item>
														<v-btn outlined color="red" @click="dialog = false">Cancelar</v-btn>

														<v-btn outlined color="blue darken-2" @click="clear" class="ml-5">Limpiar post</v-btn>
														<v-btn outlined color="green" class="ma-5" type="submit">Enviar</v-btn>
													</v-list>
												</v-card>
											</v-flex>
										</v-row>
									</v-container>
								</v-form>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-row>
			</v-card-text>
		</v-card>
		<v-card max-width="250" class="ma-3" v-for="(post, index) in posts" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="post.avatarUserPost" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">{{ post.titlePost }}</v-list-item-title>
					<v-list-item-subtitle>{{ post.userPost }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-img :src="post.imgPost" height="194"></v-img>

			<v-card-text>
				{{ post.messagePost }}
			</v-card-text>
		</v-card>
	</v-card>
</template>
<script>
import {mapState} from "vuex";
import {db} from "@/firebase";
import Swal from "sweetalert2";

// @ is an alias to /src
export default {
	data() {
		return {
			valid: false,
			/* Rules form */
			isValid: true,
			titlePostRules: [(v) => !!v || "Para continuar debe ingresar un título", (v) => v.length <= 30 || "No debe superar las 30 letras"],
			titlePost: "",
			messagePost: null,
			dialog: false,
			posts: [
				/* 	{
					avatarUserPost: "red",
					userPost: "Rogrigo Lara",
					titlePost: "Ayuda amigos",
					imgPost: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
					messagePost: "Visit ten places on our planet that are undergoing the biggest changes today."
				}, */
			]
		};
	},
	computed: {
		...mapState(["user"])
		// Creo que no lo voy a utilizar modular
		// ...mapState("posts", ["posts"])
	},
	created() {},
	mounted() {
		this.getChatGlobal();
	},
	methods: {
		clear() {
			this.titlePost = "";
			this.messagePost = "";
		},
		async getChatGlobal() {
			try {
				const resDB = await db.collection("chatGlobal").get();
				resDB.forEach((res) => {
					// console.log("TCL: getChatGlobal -> res", res);
					const chatGlobal = {
						avatarUserPost: res.data().avatarUserPost,
						userPost: res.data().userPost,
						titlePost: res.data().titlePost,
						imgPost: res.data().imgPost,
						messagePost: res.data().messagePost
					};
					this.posts.push(chatGlobal);
				});
			} catch (error) {
				console.log("TCL: getChatGlobal -> error", error);
			}
		},
		async addPost() {
			try {
				if (this.titlePost && this.messagePost) {
					const resDB = await db.collection("chatGlobal").add({
						avatarUserPost: this.user.photo,
						userPost: this.user.name,
						userUID: this.user.uid,
						titlePost: this.titlePost,
						messagePost: this.messagePost,
						imgPost: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
					});
					Swal.fire({
						icon: "success",
						title: "¡Has posteado correctamente!",
						showConfirmButton: false,
						timer: 1000
					});
					(this.posts = []), (this.dialog = false);
					this.titlePost = "";
					// Creo que esto podría mejorarse con un Snapshot
					this.messagePost = "";
					this.getChatGlobal();
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "¡Debes ingresar todos los datos del formulario para poder continuar!"
					});
					this.dialog = true;
				}
			} catch (error) {
				console.log("TCL: addPost -> error", error);
			}
		}
	}
};
</script>
