<template>
	<v-card class="d-flex flex-wrap" flat tile no-gutters>
		<v-card max-width="250" class="ma-1" v-for="(lost, index) in losts" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="lost.avatarUserPost" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="subtitle-1">Ayúdame :(</v-list-item-title>
					<v-list-item-subtitle>{{ lost.userPost }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<router-link :to="{name: 'Post', params: {id: lost.id, userId: lost.userUid}}">
				<v-img :src="lost.imgPost" height="194"></v-img>
			</router-link>
			<div align="center">
				<v-btn small disabled class="pa-1 ma-1">
					Vistas:
				</v-btn>
				<v-chip class="pa-2 ma-2" color="indigo darken-3" small outlined>
					{{ lost.registerDate }}
					<v-icon x-small class="ml-1">fas fa-calendar-day</v-icon>
				</v-chip>

				<v-icon color="red">fas fa-heart</v-icon>
			</div>
			<v-card-text>{{ lost.messagePost.substring(0, 120) }}...</v-card-text>
		</v-card>
	</v-card>
</template>
<script>
import {db} from "@/firebase";
import {mapState} from "vuex";

export default {
	data() {
		return {
			losts: []
		};
	},
	created() {
		this.getLostGlobal();
	},
	computed: {
		...mapState(["user"])
	},
	methods: {
		async getLostGlobal() {
			try {
				const allData = [];
				db.collection("users")
					.get()
					.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							db.collection("users")
								.doc(doc.id)
								.collection("lostPet")
								.get()
								.then(function(querySnapshot) {
									querySnapshot.forEach(function(res) {
										const registerDate = new Date(res.data().registerDate.seconds * 1000)
											.toISOString()
											.slice(-30, -8)
											.replace("T", " ");
										const lostGlobal = {
											id: res.id,
											avatarUserPost: res.data().avatarUserPost,
											userPost: res.data().userPost,
											userMail: res.data().userMail,
											userUid: res.data().userUid,
											titlePost: res.data().titlePost,
											imgPost: res.data().imgPost,
											messagePost: res.data().messagePost,
											registerDate: registerDate
										};
										allData.push(lostGlobal);
									});
								});
						});
					});
				this.losts = allData;
			} catch (error) {
				console.log("TCL: getLostGlobal -> error", error);
			}
		}
	}
};
</script>
