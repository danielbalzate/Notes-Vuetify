<template>
	<v-layout>
		<v-card class="mx-auto mt-5 " max-width="80%" height="100%">
			<v-card-title>
				Últimas publicaciones
			</v-card-title>
			<v-card-subtitle>
				Aquí puedes ver los útimos reportes de los animales perdidos, abandonados, encontrados y en adopción.
			</v-card-subtitle>
			<v-card-actions>
				<v-card-text>Animales perdidos</v-card-text>
				<v-spacer></v-spacer>
				<v-btn icon @click="showOptionOne = !showOptionOne">
					<v-icon>{{ showOptionOne ? "fas fa-angle-up" : "fas fa-angle-down" }}</v-icon>
				</v-btn>
			</v-card-actions>
			<v-expand-transition>
				<div v-show="showOptionOne">
					<v-divider></v-divider>
					<v-card-text>
						<v-timeline dense>
							<v-timeline-item v-for="(lost, index) in losts" :key="index" large>
								<template v-slot:icon>
									<v-avatar>
										<img :src="lost.avatarUserPost" />
									</v-avatar>
								</template>
								<v-card class="elevation-2">
									<v-card-title class="headline">{{ lost.userPost }}</v-card-title>
									<v-card-text>
										{{ lost.messagePost }}
									</v-card-text>
								</v-card>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</div>
			</v-expand-transition>
			<v-card-actions>
				<v-card-text>Causa Social</v-card-text>
				<v-spacer></v-spacer>
				<v-btn icon @click="showOptionTwo = !showOptionTwo">
					<v-icon>{{ showOptionTwo ? "fas fa-angle-up" : "fas fa-angle-down" }}</v-icon>
				</v-btn>
			</v-card-actions>
			<v-expand-transition>
				<div v-show="showOptionTwo">
					<v-divider></v-divider>
					<v-card-text>
						<v-timeline dense>
							<v-timeline-item v-for="(post, index) in posts" :key="index" large>
								<template v-slot:icon>
									<v-avatar>
										<img :src="post.avatarUserPost" />
									</v-avatar>
								</template>
								<v-card class="elevation-2">
									<v-card-title class="headline">{{ post.userPost }}</v-card-title>
									<v-card-text>
										{{ post.messagePost }}
									</v-card-text>
								</v-card>
							</v-timeline-item>
						</v-timeline>
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-layout>
</template>

<script>
import {db} from "@/firebase";
import {mapState} from "vuex";

export default {
	data() {
		return {
			losts: [],
			posts: [],
			showOptionOne: false,
			showOptionTwo: false
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
				const allDataLosts = [];
				const allDataPosts = [];
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
										allDataLosts.push(lostGlobal);
									});
								});
						});
					});
				db.collection("users")
					.get()
					.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							db.collection("users")
								.doc(doc.id)
								.collection("posts")
								.get()
								.then(function(querySnapshot) {
									querySnapshot.forEach(function(res) {
										const registerDate = new Date(res.data().registerDate.seconds * 1000)
											.toISOString()
											.slice(-30, -8)
											.replace("T", " ");
										const postGlobal = {
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
										allDataPosts.push(postGlobal);
									});
								});
						});
					});

				this.losts = allDataLosts;
				this.posts = allDataPosts;
			} catch (error) {
				console.log("TCL: getPostGlobal -> error", error);
			}
		}
	}
};
</script>
