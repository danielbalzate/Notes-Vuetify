<template>
	<v-layout>
		<router-link :to="{name: 'Adopt'}" style="text-decoration: none">
			<v-btn class="mx-2" fab dark small color="primary	" style="position:absolute; right:3%; top:3%; z-index:1">
				<v-icon dark>fas fa-arrow-left</v-icon>
			</v-btn>
		</router-link>
		<v-card class="mx-auto" max-width="600">
			<v-img class="white--text align-end" height="400px" :src="post.imgPost">
				<v-card-title>{{ post.titlePost }}</v-card-title>
			</v-img>

			<v-card-subtitle class="pb-0">{{ post.userPost }}</v-card-subtitle>

			<v-card-text class="text--primary">
				<div>{{ post.messagePost }}</div>
			</v-card-text>

			<v-card-actions>
				<v-btn color="primary" dark @click.stop="dialog = true">
					Editar Post
				</v-btn>

				<v-btn color="red" @click="deletePost(post)" dark>
					Eliminar Post
				</v-btn>

				<v-dialog v-model="dialog" persistent max-width="1200">
					<v-card>
						<v-card-text>
							<v-form v-model="isValid" @submit.prevent="editPost(post)">
								<v-container>
									<v-row>
										<v-flex xs-6>
											<v-card flat class="transparent">
												<v-card-title primary-title class="layout justify-center">
													<div class="headline"></div>
													<v-spacer></v-spacer>
												</v-card-title>

												<v-card-text class="title font-weight-light">
													<v-text-field v-model="post.titlePost" value="post.titlePost" :rules="titlePostRules" :counter="10" label="Título del post" required></v-text-field>
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
												</v-card-text>
												<v-list class="transparent">
													<v-list-item>
														<v-textarea outlined v-model="post.messagePost" value="post.messagePost" name="input-7-4" label="¡Esperamos tus mensajes!"></v-textarea>
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
			</v-card-actions>
		</v-card>
	</v-layout>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {storage} from "@/firebase";
import Swal from "sweetalert2";

export default {
	name: "Post",
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
			infoPost: {
				userId: this.$route.params.userId,
				id: this.$route.params.id
			}
		};
	},
	computed: {
		...mapState(["user"]),
		...mapState(["post"])
	},
	methods: {
		...mapActions(["getPost", "editPost", "deletePost"]),
		clear() {
			this.titlePost = "";
			this.messagePost = "";
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
			this.uploadImg();
		},
		async uploadImg() {
			try {
				Swal.fire({
					title: "Estamos subiendo tu imagen",
					onBeforeOpen: () => {
						Swal.showLoading();
					}
				});
				const actualDate = Date.now().toString();
				const refImg = storage
					.ref()
					.child("Post")
					.child(actualDate);
				const res = await refImg.put(this.file);
				// console.log(res);

				const urlDownload = await refImg.getDownloadURL();
				// console.log("TCL: uploadImg -> urlDownload", urlDownload);

				this.post.imgPost = urlDownload;
				Swal.fire({
					icon: "success",
					title: "¡Imagen actualizada correctamente!",
					showConfirmButton: false,
					timer: 1000
				});
				// console.log("TCL: uploadImg -> this.post.imgPost", this.post.imgPost);
			} catch (error) {
				console.log("TCL: uploadImg -> error", error);
			} finally {
				/* db.collection("chatGlobal")
					.doc(this.user.uid)
					.update({
						avatarUserPost: urlDownload
					}); */
			}
		}
	},
	created() {
		this.getPost(this.infoPost);
	}
};
</script>
