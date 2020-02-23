<template>
	<v-layout justify-center mt-4>
		<v-flex xs12 sm8 md6 xl4>
			<v-card>
				<v-card-text class="display-1 text-uppercase white--text text-center" :class="login ? 'success' : 'primary'">
					<span v-if="!login">Ingreso</span>
					<span v-if="login">Registro</span>
				</v-card-text>
				<v-card-text>
					<v-btn block color="error" @click="loginGoogle">
						<v-icon left dark>fab fa-google</v-icon>

						Google
					</v-btn>
					<v-btn block color="info" @click="loginFacebook">
						<v-icon left dark>fab fa-facebook-f</v-icon>
						Facebook
					</v-btn>
				</v-card-text>

				<v-card-text>
					<v-btn block @click="login = !login" v-if="!login">¿No tienes cuenta? Regístrate aquí</v-btn>
					<v-btn block @click="login = false" v-if="login">¿Ya tienes cuenta? Ingresa aquí</v-btn>
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
