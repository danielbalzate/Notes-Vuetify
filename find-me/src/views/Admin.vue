<template>
	<v-layout justify-center>
		<v-flex xs10>
			<v-card class="text-center mt-5">
				<v-card-text>
					<v-avatar>
						<img :src="user.photo" />
					</v-avatar>
				</v-card-text>

				<v-card-text>
					<h3 class="font-weight-black">{{ user.name }}</h3>
				</v-card-text>
				<v-divider></v-divider>
				<span class="title font-weight-light">Cambiar foto de perfil</span>
				<v-card-text>
					<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
					<v-btn @click="$refs.btnUploadFile.click()" color="blue" class="white--text ma-1">
						<v-icon dark right class="mr-3">fas fa-person-booth</v-icon>
						Imagen
					</v-btn>
					<v-btn :disabled="file === null" @click="uploadImg()" color="lime" class="white--text ma-1">
						<v-icon dark right class="mr-3">fas fa-rocket</v-icon>
						Subir
					</v-btn>
				</v-card-text>

				<!-- <v-card-text v-if="error">
					<h4>{{ error }}</h4>
				</v-card-text> -->

				<v-card-text v-if="file">
					<h4>{{ file.name }}</h4>
					<v-img :src="urlTmp"></v-img>
				</v-card-text>
			</v-card>
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
			urlTmp: ""
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
					.child(this.user.email)
					.child("Photo Profile");
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
			}
		}
	}
};
</script>
