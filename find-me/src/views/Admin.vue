<template>
	<v-layout justify-center>
		<v-flex xs10>
			<v-row>
				<v-card class="mx-auto" max-width="40%" height="100%">
					<v-img :src="user.photo" height="300px"></v-img>
					<v-card-title>{{ user.name }}</v-card-title>
					<v-card-subtitle>
						Cambiar foto de perfil
					</v-card-subtitle>
					<v-card-actions>
						<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
						<v-btn @click="$refs.btnUploadFile.click()" color="blue" class="white--text ma-1">
							<v-icon dark right class="mr-3">fas fa-person-booth</v-icon>
							Imagen
						</v-btn>
						<v-btn :disabled="file === null" @click="uploadImg()" color="lime" class="white--text ma-1">
							<v-icon dark right class="mr-3">fas fa-rocket</v-icon>
							Subir
						</v-btn>
					</v-card-actions>
				</v-card>

				<v-card class="mx-auto" max-width="40%" height="100%" v-if="file">
					<v-img :src="urlTmp" height="300px"></v-img>
					<v-card-subtitle class="font-weight-light">
						Te ves cool, no lo pienses más y pon esta imagen de perfil, no seas vanidoso.
					</v-card-subtitle>
				</v-card>
			</v-row>
			<v-row>
				<v-card class="mx-auto mt-5 " max-width="80%" height="100%">
					<v-card-title>
						Sabemos muy poco de ti
					</v-card-title>
					<v-card-subtitle>
						Para nosotros es prioridad tu seguridad, por eso tú decides qué información mostrar, para empezar deber presionar la flecha que aparece al frente de cada uno de los items, no
						te preocupes, si algún día ya no quieres mostrar más esta información la puedes ocultar.
					</v-card-subtitle>
					<v-card-actions>
						<v-card-text>Descripción personal</v-card-text>
						<v-spacer></v-spacer>
						<v-btn icon @click="show = !show">
							<v-icon>{{ show ? "fas fa-angle-up" : "fas fa-angle-down" }}</v-icon>
						</v-btn>
					</v-card-actions>
					<v-expand-transition>
						<div v-show="show">
							<v-divider></v-divider>
							<v-card-text>
								<v-textarea outlined label="No seas tímido"></v-textarea>
							</v-card-text>
						</div>
					</v-expand-transition>
					<v-card-actions>
						<v-card-text>Causa Social</v-card-text>
						<v-spacer></v-spacer>
						<v-btn icon @click="showSocial = !showSocial">
							<v-icon>{{ showSocial ? "fas fa-angle-up" : "fas fa-angle-down" }}</v-icon>
						</v-btn>
					</v-card-actions>
					<v-expand-transition>
						<div v-show="showSocial">
							<v-divider></v-divider>
							<v-card-text>
								<v-textarea outlined label="No seas tímido"></v-textarea>
							</v-card-text>
						</div>
					</v-expand-transition>
				</v-card>
			</v-row>
		</v-flex>
	</v-layout>
</template>
<script>
import {mapState} from "vuex";
import {firebase, storage, db} from "@/firebase";
import Swal from "sweetalert2";

export default {
	data() {
		return {
			file: null,
			urlTmp: "",
			show: false,
			showSocial: false
		};
	},
	computed: {
		...mapState(["user"])
	},
	methods: {
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
		},
		async uploadImg() {
			try {
				Swal.fire({
					title: "Estamos subiendo tu imagen",
					onBeforeOpen: () => {
						Swal.showLoading();
					}
				});
				const refImg = storage
					.ref()
					.child("PhotoProfileUsers")
					.child(this.user.email);
				const res = await refImg.put(this.file);
				// console.log(res);

				const urlDownload = await refImg.getDownloadURL();
				// console.log("TCL: uploadImg -> urlDownload", urlDownload);

				this.user.photo = urlDownload;

				await db
					.collection("users")
					.doc(this.user.uid)
					.update({
						photo: urlDownload
					});

				Swal.fire({
					icon: "success",
					title: "¡Imagen actualizada correctamente!",
					showConfirmButton: false,
					timer: 1000
				});
				this.file = null;
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
	}
};
</script>
