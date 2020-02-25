<template>
	<v-card class="d-flex flex-wrap" flat tile no-gutters>
		<v-card max-width="250" height="100%" class="ma-1">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="user.photo" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">¡Bienvenido!</v-list-item-title>
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
														<v-text-field v-model="titlePost" :rules="titlePostRules" :counter="10" label="Título del post" required></v-text-field>
													</v-card-text>
													<v-card-text>
														<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
														<v-btn @click="$refs.btnUploadFile.click()" color="blue" class="white--text ma-1">
															<v-icon dark right class="mr-3">fas fa-person-booth</v-icon>
															Subir imagen
														</v-btn>
														<v-card-text v-if="file">
															<h4>Nombre del archivo: {{ file.name }}</h4>
															<v-img width="15%" :src="urlTmp"></v-img>
														</v-card-text>
														<!-- <v-btn :disabled="file === null" @click="uploadImg()" color="lime" class="white--text ma-1">
															<v-icon dark right class="mr-3">fas fa-rocket</v-icon>
															Subir
														</v-btn> -->
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

		<v-card max-width="250" height="100%" class="ma-1" v-for="(post, index) in posts" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="user.photo" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">{{ post.titlePost }}</v-list-item-title>
					<v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-img :src="post.imgPost" height="194"></v-img>
			<v-chip class="ma-2" color="indigo darken-3" outlined>
				<v-icon left>mdi-fire</v-icon>
				{{ post.registerDate }}
			</v-chip>
			<v-card-text>
				{{ post.messagePost }}
			</v-card-text>
		</v-card>
	</v-card>
</template>
<script>
import {mapState} from "vuex";
import {firebase, storage, db} from "@/firebase";
import Swal from "sweetalert2";

// @ is an alias to /src
export default {
	data() {
		return {
			/* Upload image */
			file: null,
			urlTmp: "",
			/* Rules form */
			valid: false,
			isValid: true,
			titlePostRules: [(v) => !!v || "Para continuar debe ingresar un título", (v) => v.length <= 10 || "No debe superar las 10 letras"],
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
	created() {
		this.getPostGlobal();
	},
	mounted() {},
	methods: {
		clear() {
			this.titlePost = "";
			this.messagePost = "";
		},
		async getPostGlobal() {
			try {
				const resDB = await db
					.collection("users")
					.doc(this.user.uid)
					.collection("posts")
					.get();
				resDB.forEach((res) => {
					// console.log("TCL: getPostGlobal -> res", res);
					// console.log("TCL: getPostGlobal -> res.data().registerDate", new Date(res.data().registerDate.seconds * 1000));
					// console.log("TCL: getPostGlobal -> hola", hola);
					const registerDate = new Date(res.data().registerDate.seconds * 1000)
						.toISOString()
						.slice(-30, -8)
						.replace("T", " ");

					const postGlobal = {
						avatarUserPost: res.data().avatarUserPost,
						userPost: res.data().userPost,
						titlePost: res.data().titlePost,
						imgPost: res.data().imgPost,
						messagePost: res.data().messagePost,
						registerDate: registerDate
					};
					this.posts.push(postGlobal);
				});
			} catch (error) {
				console.log("TCL: getPostGlobal -> error", error);
			}
		},
		async addPost() {
			try {
				if (this.titlePost && this.messagePost && this.file) {
					/* Todo esto hace parte a la imagen */
					Swal.fire({
						title: "¡Estamos retocando la foto de tu peludo!",
						onBeforeOpen: () => {
							Swal.showLoading();
						}
					});
					const actualDate = Date.now().toString();
					// console.log("TCL: addPost -> actualDate", actualDate);
					const refImg = storage
						.ref()
						.child("Post")
						.child(actualDate);
					const res = await refImg.put(this.file);
					// console.log(res);
					const urlDownload = await refImg.getDownloadURL();
					/* Sube la info */
					const resDB = await db
						.collection("users")
						.doc(this.user.uid)
						.collection("posts")
						.add({
							avatarUserPost: this.user.photo,
							userPost: this.user.name,
							titlePost: this.titlePost,
							messagePost: this.messagePost,
							imgPost: urlDownload,
							registerDate: firebase.firestore.Timestamp.fromDate(new Date())
						});
					Swal.fire({
						icon: "success",
						title: "¡Has posteado correctamente!",
						showConfirmButton: false,
						timer: 1000
					});
					(this.posts = []), (this.dialog = false);
					this.titlePost = "";
					this.file = null;
					// Creo que esto podría mejorarse con un Snapshot
					this.messagePost = "";
					this.getPostGlobal();
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "¡Debes ingresar todos los datos del formulario para poder continuar!"
					});
					this.dialog = true;
				}
			} catch (error) {
				console.error("Oe");
				console.log("TCL: addPost -> error", error);
			}
		},
		searchImg(event) {
			const typeFile = event.target.files[0].type;

			if (typeFile === "image/jpeg" || typeFile === "image/png") {
				// console.log(event.target.files[0]);
				this.file = event.target.files[0];
			} else {
				Swal.fire({
					icon: "error",
					title: "Oops... Archivo no válido",
					text: "¡Debes seleccionar una imagen!"
				});
				this.error = "Archivo no valido";
				this.file = null;
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = (e) => {
				// console.log(e.target.result);
				this.urlTmp = e.target.result;
			};
		}
	}
};
</script>
