<template>
	<nav>
		<v-app-bar app color="primary" dark>
			<v-icon @click="drawer = !drawer">fas fa-lock</v-icon>
			<div class="d-flex align-center">
				<router-link :to="{name: 'Home'}">
					<span class="white--text ml-5">Home</span>
				</router-link>
			</div>

			<v-spacer></v-spacer>

			<v-btn text @click="logoutUser">
				<span class="mr-2">Cerrar sesión</span>
				<v-icon>fas fa-address-book</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer color="lime" v-model="drawer" app>
			<v-layout column align-center mt-5>
				<v-flex>
					<v-avatar>
						<img :src="user.photo" />
					</v-avatar>
				</v-flex>
				<v-flex>
					<p class="mt-3 white--text">{{ user.name }}</p>
				</v-flex>
			</v-layout>
			<v-divider></v-divider>
			<v-list>
				<v-list-item v-for="(item, index) in items" :key="index" :to="item.path">
					<v-list-item-action>
						<v-icon class="ml-5 white--text">{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title class="ml-5 white--text">{{ item.title }}</v-list-item-title>
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
				{title: "Perfil", icon: "fas fa-address-card", path: {name: "Home"}},
				{title: "Ingreso", icon: "fas fa-address-card", path: {name: "Ingreso"}},
				{title: "Admin", icon: "fas fa-address-card", path: {name: "Admin"}}
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
