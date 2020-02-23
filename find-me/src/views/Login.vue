<template>
	<v-layout justify-center mt-5>
		<v-flex xs12 sm8 md6 xl4>
			<v-card>
				<v-card-text class="display-1 text-uppercase white--text text-center" :class="login ? 'blue darken-1' : 'lime'">
					<span v-if="!login">Ingreso</span>
					<span v-if="login">Registro</span>
				</v-card-text>
				<v-card-text class="text-center">
					<v-btn outlined color="error" @click="loginGoogle" class="ma-3">
						<v-icon left dark>fab fa-google</v-icon>

						Gmail
					</v-btn>
					<v-btn outlined color="info" @click="loginFacebook" class="ma-3">
						<v-icon left dark>fab fa-facebook-f</v-icon>
						Facebook
					</v-btn>
				</v-card-text>

				<v-card-text>
					<v-btn block @click="login = !login" v-if="!login" :class="login ? 'blue darken-1' : 'lime'" class="white--text">¿No tienes cuenta? Regístrate aquí</v-btn>
					<v-btn block @click="login = false" v-if="login" :class="login ? 'blue darken-1' : 'lime'" class="white--text">¿Ya tienes cuenta? Ingresa aquí</v-btn>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script>
import {firebase, auth, db} from "@/firebase";
import {mapMutations, mapActions} from "vuex";
import router from "@/router";

export default {
	data() {
		return {
			login: false
		};
	},
	methods: {
		...mapMutations(["newUser"]),
		...mapActions(["setUser"]),
		loginFacebook() {
			const provider = new firebase.auth.FacebookAuthProvider();
			this.loginAndRegisterUser(provider);
		},
		loginGoogle() {
			const provider = new firebase.auth.GoogleAuthProvider();
			this.loginAndRegisterUser(provider);
		},
		async loginAndRegisterUser(provider) {
			firebase.auth().languageCode = "es";
			try {
				const result = await firebase.auth().signInWithPopup(provider);
				const user = result.user;
				// console.log("TCL: loginAndRegisterUser -> user", user)
				this.setUser(user);
				// Guardar en Firestore
				router.push({name: "Home"});
				// console.log("TCL: loginGoogle -> user", user);
			} catch (error) {
				console.log("TCL: loginGoogle -> error", error);
			}
		}
	}
};
</script>
