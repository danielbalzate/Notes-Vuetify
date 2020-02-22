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
import {mapMutations} from "vuex";
import router from "@/router";

export default {
	data() {
		return {
			login: false
		};
	},
	methods: {
		...mapMutations(["newUser"]),
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
				//Ingresar usuario
				const userData = {
					name: user.displayName,
					email: user.email,
					photo: user.photoURL,
					uid: user.uid
				};

				this.newUser(user);

				await db
					.collection("users")
					.doc(userData.uid)
					.set(userData);
				console.log("Usuario guardado");
				router.push({name: "Home"});
				// console.log("TCL: loginGoogle -> user", user);
			} catch (error) {
				// console.log("TCL: loginGoogle -> error", error);
			}
		}
	}
};
</script>
