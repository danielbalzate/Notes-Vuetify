<template>
	<nav>
		<v-app-bar app color="lime" dark>
			<v-icon @click="drawer = !drawer">fas fa-bars</v-icon>
			<!-- <div class="d-flex align-center">
				<router-link :to="{name: 'Home'}">
					<span class="white--text ml-5">Home</span>
				</router-link>
			</div> -->

			<v-spacer></v-spacer>

			<v-btn text @click="logoutUser">
				<span class="mr-2">Cerrar sesión</span>
				<v-icon>fas fa-sign-out-alt</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer color="lime" v-model="drawer" src="../assets/space-wallpaper.jpg" app>
			<v-layout column align-center mt-5>
				<v-flex>
					<router-link :to="{name: 'Admin'}">
						<v-avatar>
							<img :src="user.photo" />
						</v-avatar>
					</router-link>
				</v-flex>
				<v-flex>
					<p class="mt-3 white--text">{{ user.name }}</p>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index" :to="item.path">
					<v-list-item-action>
						<v-icon class="white--text">{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
	data() {
		return {
			drawer: true,
			items: [
				{title: "Últimas publicaciones", icon: "fas fa-igloo", path: {name: "Home"}},
				{title: "Perfil", icon: "fas fa-user-circle", path: {name: "Admin"}},
				{title: "Registrar post", icon: "fas fa-keyboard", path: {name: "Adopt"}},
				{title: "¡Adopta!", icon: "fas fa-paw", path: {name: "PostGlobal"}},
				{title: "Usuarios", icon: "fas fa-users", path: {name: "Users"}},
				{title: "Perdidos", icon: "fas fa-users", path: {name: "Losts"}},
				{title: "Reportar", icon: "fas fa-users", path: {name: "ReportLostPet"}},
				{title: "Todos los perdidos", icon: "fas fa-users", path: {name: "LostGlobal"}}
			]
		};
	},
	methods: {
		...mapActions(["logoutUser"])
	},
	computed: {
		...mapState(["user"])
	}
};
</script>
