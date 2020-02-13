<template>
	<v-app light>
		<v-content>
			<section>
				<v-parallax src="../assets/agro.jpg" style="">
					<v-layout column align-center justify-center class="white--text">
						<div class="" style="background-color: #ccc; opacity:0.6; width: 100%; height: 50%; border-radius: 25px; position:absolute"></div>
						<v-card flat class="my-12 mx-12 pa-1" color="rgb(186, 201, 38)">
							<v-card-title primary-title class="layout justify-center">
								<div class="display-3 font-weight-bold" style="color:white">¡Bienvenido AgroQuipu!</div>
							</v-card-title>
							<v-card-text class="text-center font-weight-light display-1" style="color:white">
								Donde cuidar el planeta es crear oportunidades
							</v-card-text>
						</v-card>
					</v-layout>
				</v-parallax>
			</section>
			<!-- <section>
				<v-layout column wrap class="my-12" align-center>
					<v-card flat class="my-12 mx-12">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-3 font-weight-bold">Bienvenido a AgroQuipu</div>
						</v-card-title>
						<v-card-text class="text-center font-weight-light display-1">
							Donde cuidar el planeta es crear oportunidades
						</v-card-text>
					</v-card>
				</v-layout>
			</section>
			<section>
				<v-divider></v-divider>
			</section> -->
			<section>
				<v-layout column wrap class="my-12" align-center>
					<v-col lg="10">
						<v-card flat class="mb-12 mt-12">
							<v-card-title primary-title class="layout justify-center">
								<div class="display-2 font-weight-bold mb-5">¿Quiénes somos?</div>
							</v-card-title>

							<v-card-text class="text-center font-weight-light title">
								Somos una comunidad donde cada campesino y citadino puede tener la capacidad de producir, procesar y/o comercializar productos orgánicos, o suplir sus necesidades
								básicas generando así mercados agroecológicos autosostenible y amigables con el medio ambiente.
							</v-card-text>
						</v-card>
					</v-col>
				</v-layout>
			</section>
			<section>
				<v-divider></v-divider>
			</section>
			<section>
				<v-layout column wrap class="my-12" align-center>
					<v-flex xs12 sm4 class="my-4">
						<div class="text-center mt-12 mb-4">
							<h2 class="display-2 font-weight-bold">Testimonios</h2>
						</div>
					</v-flex>
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap align-center>
								<v-flex xs12 md4 text-justify>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light sub-title">
											Julián Mejía 28 años. Psicologo,
											<p class="font-italic .font-weight-light">
												"...para mi Agroquipu fue una puerta para ingresar al mundo de comer sano, ayudar al medio ambiente y generar un ingreso extra..."
											</p>
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<v-avatar>
												<img src="../assets/chico.png" alt="Men" />
											</v-avatar>
											<div class="headline font-weight-bold ml-12">Julián Mejía</div>
										</v-card-title>
									</v-card>
								</v-flex>
								<v-flex xs12 md4 text-justify>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light sub-title">
											Natalia Tamayo 26 años. Ingeniera,
											<p class="font-italic .font-weight-light">
												“...para mi ser parte de Agroquipu, fue darme la oportunidad de comer más sano, ayudar a mi cuerpo y sobre todo saber que estoy contribuyendo a que el
												medio ambiente sea mejor..."
											</p>
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<v-avatar>
												<img src="../assets/chica.png" alt="Women" />
											</v-avatar>
											<div class="headline font-weight-bold ml-12">Natalia Tamayo</div>
										</v-card-title>
									</v-card>
								</v-flex>

								<v-flex xs12 md4 text-justify>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light sub-title">
											Carlos Jimenez. 40 años , Campesino,
											<p class="font-italic .font-weight-light">
												"...Agroquipu se ha convertido en mi mano derecha, me acompaña en la siembra y venta de mis productos..."
											</p>
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<v-avatar>
												<img src="../assets/chico.png" alt="Men" />
											</v-avatar>
											<div class="headline font-weight-bold ml-12">Carlos Jimenez</div>
										</v-card-title>
									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					</v-flex>
				</v-layout>
			</section>
			<section>
				<v-divider></v-divider>
			</section>
			<!-- 			<section>
				<v-layout column wrap class="my-12" align-center>
					<v-card flat class="my-12 mx-12">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-3 font-weight-bold">Nuestros servicios AgroQuipu</div>
						</v-card-title>
						<v-card-text class="text-center font-weight-light display-1">
							Estamos aquí para crecer juntos
						</v-card-text>
					</v-card>
				</v-layout>
			</section> -->
			<section>
				<v-card flat class="my-12 mx-12">
					<v-card-title primary-title class="layout justify-center">
						<div class="display-2 font-weight-bold">Nuestros servicios AgroQuipu</div>
					</v-card-title>
					<v-card-text class="text-center font-weight-light title">
						Estamos aquí para crecer juntos
					</v-card-text>
				</v-card>
				<div class="d-flex">
					<v-col lg="6">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-1 font-weight-bold">Aprende con nosotros</div>
						</v-card-title>
						<v-parallax src="../assets/cultivo.jpeg" height="400">
							<v-layout column align-center justify-center></v-layout>
						</v-parallax>
					</v-col>
					<v-col lg="6">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-1 font-weight-bold">Tienda virtual</div>
						</v-card-title>
						<v-parallax src="../assets/frutas.jpeg" height="400">
							<v-layout column align-center justify-center></v-layout>
						</v-parallax>
					</v-col>
				</div>
			</section>
			<section>
				<v-divider></v-divider>
			</section>
			<section>
				<v-container grid-list-xl>
					<v-layout row wrap justify-center class="my-12">
						<v-form v-model="isValid" @submit.prevent="addInfo()">
							<v-container>
								<v-row>
									<v-flex xs-6>
										<v-card flat class="transparent">
											<v-card-title primary-title class="layout justify-center">
												<div class="headline">Contáctenos</div>
											</v-card-title>
											<v-card-text class="title font-weight-light">
												Sé parte de nuestra comunidad
											</v-card-text>

											<v-list class="transparent">
												<v-list-item>
													<v-list-item-action>
														<v-icon class="blue--text text--blue darken-2">mdi-face</v-icon>
													</v-list-item-action>

													<v-list-item-content>
														<v-list-item-title>
															<v-text-field v-model="name" :rules="nameRules" :counter="30" label="Nombre completo" required></v-text-field>
														</v-list-item-title>
													</v-list-item-content>
												</v-list-item>
												<v-list-item>
													<v-list-item-action>
														<v-icon class="blue--text text--blue darken-2">mdi-email</v-icon>
													</v-list-item-action>
													<v-list-item-content>
														<v-list-item-title><v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field></v-list-item-title>
													</v-list-item-content>
												</v-list-item>
												<v-list-item>
													<v-list-item-action>
														<v-icon class="blue--text text--blue darken-2">mdi-phone</v-icon>
													</v-list-item-action>
													<v-list-item-content>
														<v-list-item-title>
															<v-text-field type="number" v-model="phone" :rules="phoneRules" :counter="10" label="Teléfono o celular" required></v-text-field>
														</v-list-item-title>
													</v-list-item-content>
												</v-list-item>
												<v-card-title primary-title class="layout justify-center">
													<v-btn outlined color="green" class="mr-4" type="submit">Enviar</v-btn>
													<v-btn outlined color="blue darken-2" @click="clear">Limpiar fomulario</v-btn>
												</v-card-title>
											</v-list>
										</v-card>
									</v-flex>
									<v-flex xs6>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline">¡Selecciona tus intereses!</div>
										</v-card-title>
										<v-col cols="12">
											<v-select v-model="pleasures" :items="items" chips label="Quiero hacer parte de..." multiple outlined></v-select>
										</v-col>
										<v-card flat class="transparent">
											<v-card-title primary-title class="layout justify-center">
												<div class="headline">¡Queremos escucharte!</div>
											</v-card-title>
											<v-card-text>
												<v-textarea outlined v-model="comments" name="input-7-4" label="¡Esperamos tus comentarios!" value=""></v-textarea>
											</v-card-text>
										</v-card>
									</v-flex>
								</v-row>
							</v-container>
						</v-form>
					</v-layout>
				</v-container>
			</section>

			<v-footer color="blue darken-2">
				<v-layout row wrap align-center>
					<v-flex xs12>
						<div class="white--text mr-4 text-right">
							<v-spacer></v-spacer>
							Developer ©2020 by Agroquipu
						</div>
					</v-flex>
				</v-layout>
			</v-footer>
		</v-content>
	</v-app>
</template>

<script>
import {db} from "../firebase.js";
import Swal from "sweetalert2";

export default {
	data: () => ({
		valid: false,
		/* Rules form */
		isValid: true,
		nameRules: [(v) => !!v || "Para continuar debe ingresar su nombre", (v) => v.length <= 30 || "No debe superar las 30 letras"],
		phoneRules: [(v) => !!v || "Para continuar debe ingresar su teléfono", (v) => v.length <= 10 || "No debe superar las 10 letras"],
		emailRules: [(v) => !!v || "Para continuar debe ingresar su e-mail", (v) => /.+@.+/.test(v) || "Por favor verifique su e-mail"],
		name: "",
		phone: "",
		email: "",
		items: ["Nuestros aprendices en agroecología", "Compradores de productos agroecológicos", "Vendedores de productos agroecológicos"],
		pleasures: ["Nuestros aprendices en agroecología", "Compradores de productos agroecológicos", "Vendedores de productos agroecológicos"],
		comments: null,
		info: []
	}),
	mounted() {
		this.getInfo();
	},
	created() {},
	methods: {
		submit() {},
		clear() {
			this.name = "";
			this.phone = "";
			this.email = "";
			this.pleasures = ["Nuestros aprendices en agroecología"];
			this.comments = "";
		},
		async addInfo() {
			try {
				if (this.name && this.phone && this.email /* && this.pleasures && this.comments */) {
					await db.collection("info").add({
						name: this.name,
						phone: this.phone,
						email: this.email,
						pleasures: this.pleasures,
						comments: this.comments
					});
					this.getInfo();
					Swal.fire({
						icon: "success",
						title: "¡Felicidades has registrado los datos correctamente!",
						text: "Gracias por confiar en nosotros y querer participar, pronto nos volveremos a encontrar."
					});
					this.name = null;
					this.phone = null;
					this.email = null;
					this.pleasures = ["Nuestros aprendices en agroecología", "Compradores de productos agroecológicos", "Vendedores de productos agroecológicos"];
					this.comments = null;
				} else {
					Swal.fire({
						icon: "error",
						title: "Oops...",
						text: "¡Debes ingresar todos los datos del formulario para poder continuar!"
					});
				}
			} catch (error) {
				console.log(error);
			}
		},
		async getInfo() {
			try {
				const snapshot = await db.collection("info").get();
				const info = [];

				snapshot.forEach((doc) => {
					// console.log(doc.data());
					let infoData = doc.data();
					infoData.id = doc.id;
					info.push(infoData);
				});
			} catch (error) {
				console.log("TCL: getInfo -> error", error);
			}
		}
	}
};
</script>
