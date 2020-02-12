<template>
	<v-app light>
		<v-content>
			<section>
				<v-parallax src="../assets/agro.jpg" height="600" style="">
					<v-layout column align-center justify-center class="white--text">
						<!-- <img src="../assets/brote.png" class="mb-5" height="200" /> -->
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
						<v-card flat>
							<v-card-title primary-title class="layout justify-center">
								<div class="display-3 font-weight-bold">¿Quiénes somos?</div>
							</v-card-title>

							<v-card-text class="text-center font-weight-light display-1">
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
						<div class="text-center">
							<h2 class="display-3 font-weight-bold">Testimonios</h2>
						</div>
					</v-flex>
					<v-flex xs12>
						<v-container grid-list-xl>
							<v-layout row wrap align-center>
								<v-flex xs12 md4>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light title">
											Natalia Tamayo 26 años. Ingeniera, “...para mi ser parte de Agroquipu, fue darme la oportunidad de comer más sano, ayudar a mi cuerpo y sobre todo saber que
											estoy contribuyendo a que el medio ambiente sea mejor..."
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline text-center font-weight-bold">Natalia Tamayo</div>
										</v-card-title>
									</v-card>
								</v-flex>
								<v-flex xs12 md4>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light title">
											Julian Mejia 28 años. Psicologo, "...para mi agroquipu fue una puerta para ingresar al mundo de comer sano, ayudar al medio ambiente y generar un ingreso
											extra..."
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline font-weight-bold">J. Mejia</div>
										</v-card-title>
									</v-card>
								</v-flex>
								<v-flex xs12 md4>
									<v-card flat class="transparent">
										<v-card-text class="text-center">
											<v-icon x-large class="orange--text text--lighten-2">mdi-comment-quote</v-icon>
										</v-card-text>
										<v-card-text class="font-weight-light title">
											Carlos Jimenez. 40 años , Campesino,"...agroquipu se ha convertido en mi mano derecha, me acompaña en la siembra y venta de mis productos..."
										</v-card-text>
										<v-card-title primary-title class="layout justify-center">
											<div class="headline text-center font-weight-bold">C. Jiménez</div>
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
						<div class="display-3 font-weight-bold">Nuestros servicios AgroQuipu</div>
					</v-card-title>
					<v-card-text class="text-center font-weight-light display-1">
						Estamos aquí para crecer juntos
					</v-card-text>
				</v-card>
				<div class="d-flex">
					<v-col lg="4">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-1 font-weight-bold">Aprende con nosotros</div>
						</v-card-title>
						<v-parallax src="../assets/section.jpg" height="380">
							<v-layout column align-center justify-center></v-layout>
						</v-parallax>
					</v-col>
					<v-col lg="4">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-1 font-weight-bold">Simulador interáctivo</div>
						</v-card-title>
						<v-parallax src="../assets/section.jpg" height="380">
							<v-layout column align-center justify-center></v-layout>
						</v-parallax>
					</v-col>
					<v-col lg="4">
						<v-card-title primary-title class="layout justify-center">
							<div class="display-1 font-weight-bold">Tienda virtual</div>
						</v-card-title>
						<v-parallax src="../assets/section.jpg" height="380">
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
						<v-flex xs12 sm4>
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
											<v-list-item-title><v-text-field v-model="name" :rules="nameRules" :counter="30" label="Nombre completo" required></v-text-field></v-list-item-title>
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
										<v-btn outlined color="green" class="mr-4" @click="submit">Enviar</v-btn>
										<v-btn outlined color="blue darken-2" @click="clear">Limpiar fomulario</v-btn>
									</v-card-title>
								</v-list>
							</v-card>
						</v-flex>
						<v-flex xs12 sm4>
							<v-card-title primary-title class="layout justify-center">
								<div class="headline">¡Selecciona tus intereses!</div>
							</v-card-title>
							<v-col cols="12">
								<v-select v-model="value" :items="items" chips label="Quiero hacer parte de..." multiple outlined></v-select>
							</v-col>
							<v-card flat class="transparent">
								<v-card-title primary-title class="layout justify-center">
									<div class="headline">¡Queremos escucharte!</div>
								</v-card-title>
								<v-card-text>
									<v-textarea outlined name="input-7-4" label="¡Esperamos tus comentarios!" value=""></v-textarea>
								</v-card-text>
							</v-card>
						</v-flex>
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
export default {
	data: () => ({
		valid: false,
		name: "",
		phone: "",
		nameRules: [(v) => !!v || "Para continuar debe ingresar su nombre", (v) => v.length <= 30 || "No debe superar las 30 letras"],
		phoneRules: [(v) => !!v || "Para continuar debe ingresar su teléfono", (v) => v.length <= 10 || "No debe superar las 10 letras"],
		email: "",
		emailRules: [(v) => !!v || "Para continuar debe ingresar su e-mail", (v) => /.+@.+/.test(v) || "Por favor verifique su e-mail"],
		items: ["Nuestros aprendices en agroecología", "Compradores de productos agroecológicos", "Vendedores de productos agroecológicos"],
		value: ["Nuestros aprendices en agroecología", "Compradores de productos agroecológicos", "Vendedores de productos agroecológicos"]
	}),
	methods: {
		submit() {},
		clear() {
			this.name = "";
			this.email = "";
			this.phone = "";
			this.items = ["Nuestros aprendices en agroecología"];
			this.value = ["Nuestros aprendices en agroecología"];
		}
	}
};
</script>
