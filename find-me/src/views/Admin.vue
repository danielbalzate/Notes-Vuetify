<template>
	<v-layout justify-center>
		<v-flex xs6>
			<v-card class="text-center">
				<v-card-text>
					<v-avatar>
						<img :src="user.photo" />
					</v-avatar>
				</v-card-text>

				<v-card-text>
					<h3>{{ user.name }}</h3>
				</v-card-text>

				<v-card-text>
					<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
					<v-btn @click="$refs.btnUploadFile.click()">Buscar Imagen</v-btn>
					<v-btn :disabled="file === null" @click="uploadImg()" :loading="loading">Subir Imagen</v-btn>
				</v-card-text>

				<v-card-text v-if="error">
					<h4>{{ error }}</h4>
				</v-card-text>

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

export default {
	data() {
		return {
			file: null,
			urlTmp: "",
			loading: false,
			error: null
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
				this.error = null;
			} else {
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
				this.loading = true;
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

				this.error = "Imagen subida correctamente";
				this.file = null;
			} catch (error) {
				console.log("TCL: uploadImg -> error", error);
			} finally {
				this.loading = false;
			}
		}
	}
};
</script>
