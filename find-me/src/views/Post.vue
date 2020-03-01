<template>
	<v-layout>
		<router-link :to="{name: 'Adopt'}" style="text-decoration: none">
			<v-btn class="mx-2" fab dark small color="primary	" style="position:absolute; right:3%; top:3%; z-index:1">
				<v-icon dark>fas fa-arrow-left</v-icon>
			</v-btn>
		</router-link>
		<v-card class="mx-auto" max-width="600">
			<v-img class="white--text align-end" height="400px" :src="post.imgPost">
				<v-chip class="ma-5" color="blue" text-color="white">
					{{ post.titlePost }}
				</v-chip>
			</v-img>

			<v-card-subtitle class="pb-0">{{ post.userPost }}</v-card-subtitle>

			<v-card-text class="text--primary">
				<div>{{ post.messagePost }}</div>
			</v-card-text>
			<v-card-text align="center">
				<v-chip class="ma-1" color="blue" outlined>
					<v-icon left class="ma-1">fas fa-paw</v-icon>
					Raza: {{ post.breed }}
				</v-chip>
				<v-chip class="ma-1" color="blue" outlined>
					<v-icon left class="ma-1">fas fa-cat</v-icon>
					Especie: {{ post.species }}
				</v-chip>
				<v-chip class="ma-1" color="blue" outlined>
					<v-icon left class="ma-1">fas fa-venus-mars</v-icon>
					Genero: {{ post.gender }}
				</v-chip>
				<v-chip class="ma-1" color="blue" outlined>
					<v-icon left>fas fa-feather-alt</v-icon>
					Edad: {{ post.age }}
				</v-chip>
				<v-chip class="ma-1" color="blue" outlined>Peso: {{ post.weight }}</v-chip>
				<v-chip class="ma-1" color="blue" outlined>Tamaño: {{ post.height }}</v-chip>
			</v-card-text>

			<v-card-actions>
				<v-btn color="primary" class="ml-5 mb-5" dark @click.stop="dialog = true">
					Editar Post
				</v-btn>

				<v-btn color="red" class="ml-5 mr-5 mb-5" @click="deletePost(post)" dark>
					Eliminar Post
				</v-btn>

				<v-dialog v-model="dialog" persistent max-width="800">
					<v-card align="center ">
						<v-form v-model="isValid" @submit.prevent="editPost(post)">
							<v-container fluid class="pa-5">
								<v-row class="pa-5">
									<v-flex xs-6>
										<v-card flat class="transparent">
											<v-card-title primary-title class="layout justify-center">
												<div class="headline">Editar post</div>
											</v-card-title>

											<v-card-text class="title font-weight-light">
												<v-text-field v-model="post.titlePost" :rules="titlePostRules" :counter="10" label="Nombre de tu mascota" required></v-text-field>
											</v-card-text>
											<v-card-text>
												<v-row>
													<v-col cols="12" md="6">
														<v-select :items="breed" v-model="post.breed" :label="post.breed" outlined></v-select>
														<v-select :items="weight" v-model="post.weight" label="Peso" outlined></v-select>
														<v-select :items="gender" v-model="post.gender" label="Genero" outlined></v-select>
													</v-col>
													<v-col cols="12" md="6">
														<v-select :items="species" v-model="post.species" label="Especie" outlined></v-select>
														<v-select :items="height" v-model="post.height" label="Tamaño" outlined></v-select>
														<v-select :items="age" v-model="post.age" label="Edad" outlined></v-select>
													</v-col>
												</v-row>

												<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
												<v-btn @click="$refs.btnUploadFile.click()" color="blue" class="white--text ma-1">
													<v-icon dark right class="mr-3">fas fa-person-booth</v-icon>
													Muéstranos a tu peludo
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
													<v-textarea
														outlined
														v-model="post.messagePost"
														name="input-7-4"
														label="¡Has una breve descripción de la historia de tu peludo!"
														value=""
													></v-textarea>
												</v-list-item>
												<v-btn outlined color="red" @click="dialog = false">Cancelar</v-btn>
												<v-btn outlined color="green" class="ma-5" type="submit">Enviar</v-btn>
											</v-list>
										</v-card>
									</v-flex>
								</v-row>
							</v-container>
						</v-form>
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
			breed: [
				"Criollo",
				"American bully",
				"Amstaff (American Staffordshire Terrier)",
				"Azul de Gascuña",
				"BeagleHarrier",
				"Bodeguero",
				"Border Collie",
				"Boxer",
				"Bulldog Francés",
				"Bulldog Inglés",
				"Bullterrier",
				"Caniche",
				"Carea leonés",
				"Carey",
				"Chihuahua",
				"Cocker Spaniel",
				"Común europeo",
				"Dálmata",
				"Doberman",
				"Dogo CANARIO",
				"Epagneul Breton",
				"Fox Terrier",
				"GALGO",
				"Golden Retriever",
				"Gos d'atura",
				"Grifón",
				"Husky",
				"Labrador",
				"Maine Coon",
				"Mastín",
				"Mastín del Pirineo",
				"Mestizo",
				"Nórdico",
				"Otros",
				"Palomino",
				"Pastor",
				"Pastor alemán",
				"Pastor Belga",
				"Pastor Belga Groenendael",
				"Pastor Belga Malinois",
				"Pastor Leonés",
				"Pastor suizo",
				"Pastor Vasco",
				"Pequinés",
				"Perdiguero de Burgos",
				"Persa",
				"Persa Americano",
				"Pinscher Miniatura",
				"Pitbull",
				"Pointer",
				"Presa Canario",
				"Ratonero",
				"Retriever",
				"Rottweiler",
				"Sabueso",
				"Sabueso Español",
				"Samoyedo",
				"San bernardo",
				"Schnauzer",
				"Setter",
				"Shar Pei",
				"Shih Tzu",
				"Siámes",
				"Siamés Azul Point",
				"Siames Red Point",
				"Siberian Husky",
				"Snowshoe",
				"Spaniel Breton",
				"Springel Spaniel",
				"Staffordshire Bull Terrier",
				"Staffy (Staffordshire Bull Terrier)",
				"Teckel",
				"Teckel Kaninchen Pelo Duro",
				"Teckel Miniatura Pelo Duro",
				"Terrier",
				"Yorkshire"
			],
			species: ["Perro", "Gato"],
			weight: ["Menos de 10 Kg", "Entre 10 Kg y 20 Kg", "Entre 20 Kg y 40 Kg", "Mayor a 40 kg"],
			height: ["Pequeño", "Mediano", "Grande", "Muy grande"],
			gender: ["Macho", "Hembra"],
			age: ["Entre 0 a 6 meses", "Entre 6 meses a 1 año", "Entre 1 a 5 años", "Entre 5 a 10 años", "Más de 10 años"],
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
