<template>
	<v-layout>
		<v-card width="80%" class="mx-auto">
			<v-list subheader>
				<v-subheader>Últimos usuarios registrados</v-subheader>
				<v-list-item v-for="user in users" :key="user.title" @click="">
					<v-list-item-avatar>
						<v-img :src="user.photo"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-text="user.name"></v-list-item-title>
					</v-list-item-content>
					<v-chip x-small class="mr-5">En adopción: 0</v-chip>
					<v-chip x-small>Reportes útiles: 0</v-chip>
					<v-list-item-icon>
						<v-icon :color="user.enabled ? 'lime' : 'red darken-1'">fas fa-bell</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list subheader>
				<v-subheader>Usuarios más fieles</v-subheader>

				<v-list-item v-for="item in items2" :key="item.title" @click="">
					<v-list-item-avatar>
						<v-img :src="item.avatar"></v-img>
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title v-text="item.title"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card>
	</v-layout>
</template>

<script>
import {db} from "@/firebase";
import {mapState} from "vuex";
export default {
	data: () => ({
		users: [],
		items2: [{title: "Travis Howard", avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"}]
	}),
	created() {
		this.getUsersGlobal();
	},
	computed: {
		...mapState(["user"])
	},
	methods: {
		async getUsersGlobal() {
			try {
				const allData = [];

				db.collection("users")
					.get()
					.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							// console.log("getUsersGlobal -> doc", doc.data());

							const usersGlobal = {
								email: doc.data().email,
								name: doc.data().name,
								photo: doc.data().photo,
								enabled: doc.data().enabled
							};
							allData.push(usersGlobal);
						});
					});
				this.users = allData;
				// console.log("getUsersGlobal -> allData", allData);
			} catch (error) {
				console.log("TCL: getUsersGlobal -> error", error);
			}
		}
	}
};
</script>
