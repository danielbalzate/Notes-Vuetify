<template>
	<v-card class="d-flex flex-wrap" flat tile no-gutters>
		<v-card max-width="250" height="100%" class="ma-1" color="lime darken-2">
			<v-list-item class="mt-5">
				<v-avatar class="mr-5">
					<img :src="user.photo" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">¡Bienvenido!</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<p class="ma-5">
				Recuerda ser específico y claro al momento de reportar una mascota perdida, no podemos controlarlo todo, así que confiamos en ti para que subas contenido que realmente aporte a la
				comunidad. ¡Gracias por hacer del mundo un lugar más agradable!
			</p>

			<v-card-text>
				<v-row justify="center">
					<v-dialog v-model="dialog" persistent max-width="800">
						<template v-slot:activator="{on}">
							<v-btn color="primary" dark v-on="on" x-large>
								Reportar
								<br />
								mascota perdida
							</v-btn>
						</template>
						<v-card align="center ">
							<v-form v-model="isValid" @submit.prevent="addPost()">
								<v-container fluid class="pa-5">
									<v-row class="pa-5">
										<v-flex xs-6>
											<v-card flat class="transparent">
												<v-card-title primary-title class="layout justify-center">
													<div class="headline">Registrar un post</div>
												</v-card-title>

												<v-card-text>
													<v-row>
														<v-col cols="12" md="6">
															<v-select :items="breed" v-model="breed" label="Raza" outlined></v-select>
															<v-select :items="weight" v-model="weight" label="Peso" outlined></v-select>
															<v-select :items="gender" v-model="gender" label="Genero" outlined></v-select>
														</v-col>
														<v-col cols="12" md="6">
															<v-select :items="species" v-model="species" label="Especie" outlined></v-select>
															<v-select :items="height" v-model="height" label="Tamaño" outlined></v-select>
														</v-col>
													</v-row>

													<input type="file" ref="btnUploadFile" class="d-none" @change="searchImg($event)" />
													<v-btn @click="$refs.btnUploadFile.click()" color="blue" class="white--text ma-1" x-large>
														<v-icon dark right class="mr-3">fas fa-person-booth</v-icon>
														Múestranos la
														<br />
														mascota perdida
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
														<v-textarea outlined v-model="messagePost" name="input-7-4" label="¡Has una breve descripción de lo que paso!" value=""></v-textarea>
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
						</v-card>
					</v-dialog>
				</v-row>
			</v-card-text>
		</v-card>

		<v-card max-width="250" class="ma-1" v-for="(post, index) in reportLostPet" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="user.photo" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<router-link :to="{name: 'Post', params: {id: post.id, userId: user.uid}}">
				<v-img :src="post.imgPost" height="194"></v-img>
			</router-link>
			<div align="center">
				<v-btn small disabled class="pa-1 ma-1">
					Vistas:
				</v-btn>
				<v-chip class="pa-2 ma-2" color="indigo darken-3" small outlined>
					{{ post.registerDate }}
					<v-icon x-small class="ml-1">fas fa-calendar-day</v-icon>
				</v-chip>

				<v-icon color="red">fas fa-heart</v-icon>
			</div>
			<v-card-text>{{ post.messagePost.substring(0, 120) }}...</v-card-text>
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
			dialog: false,
			reportLostPet: []
		};
	},
	computed: {
		...mapState(["user"])
	},
	created() {
		this.reportLostPets();
	},
	mounted() {},
	methods: {
		clear() {
			this.messagePost = "";
		},
		async reportLostPets() {
			try {
				const resDB = await db
					.collection("users")
					.doc(this.user.uid)
					.collection("lostPet")
					.get();
				resDB.forEach((res) => {
					//console.log("TCL: reportLostPets -> res", res.id);
					const registerDate = new Date(res.data().registerDate.seconds * 1000)
						.toISOString()
						.slice(-30, -8)
						.replace("T", " ");

					const reportLostPets = {
						id: res.id,
						avatarUserPost: res.data().avatarUserPost,
						userPost: res.data().userPost,
						userMail: res.data().userMail,
						imgPost: res.data().imgPost,
						messagePost: res.data().messagePost,
						registerDate: registerDate
					};
					this.reportLostPet.push(reportLostPets);
				});
			} catch (error) {
				console.log("TCL: reportLostPets -> error", error);
			}
		},
		async addPost() {
			try {
				if (this.messagePost && this.file && this.breed && this.species && this.weight && this.height && this.gender) {
					/* Todo esto hace parte a la imagen */
					Swal.fire({
						title: "¡Estamos retocando la foto del animalito!",
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
						.collection("lostPet")
						.add({
							avatarUserPost: this.user.photo,
							userPost: this.user.name,
							userMail: this.user.email,
							messagePost: this.messagePost,
							breed: this.breed,
							species: this.species,
							weight: this.weight,
							height: this.height,
							gender: this.gender,
							imgPost: urlDownload,
							registerDate: firebase.firestore.Timestamp.fromDate(new Date()),
							userUid: this.user.uid
						});
					Swal.fire({
						icon: "success",
						title: "¡Has reportado esta mascota correctamente!",
						showConfirmButton: false,
						timer: 1000
					});
					(this.reportLostPet = []), (this.dialog = false);
					this.file = null;
					// Creo que esto podría mejorarse con un Snapshot
					this.messagePost = "";
					this.reportLostPets();
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
