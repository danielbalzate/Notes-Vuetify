<template>
	<v-card class="d-flex flex-wrap" flat tile no-gutters>
		<v-card max-width="250" class="ma-1" v-for="(post, index) in posts" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="post.avatarUserPost" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="subtitle-1">{{ post.titlePost }}</v-list-item-title>
					<v-list-item-subtitle>{{ post.userPost }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<router-link :to="{name: 'Post', params: {id: post.id, userId: post.userUid}}">
				<v-img :src="post.imgPost" height="194"></v-img>
			</router-link>
			<div align="center">
				<v-btn small disabled class="pa-1 ma-1">
					Vistas:
				</v-btn>
				<v-chip class="pa-2 ma-2" color="indigo darken-3" small outlined>
					{{ post.registerDate }}
					<v-icon x-small class="ml-1">fas fa-calendar-day</v-icon>
				</v-chip>

				<v-icon color="red">fas fa-heart</v-icon>
			</div>
			<v-card-text>{{ post.messagePost.substring(0, 120) }}...</v-card-text>
		</v-card>
	</v-card>
</template>
<script>
import {db} from "@/firebase";

import {mapState} from "vuex";

export default {
	data() {
		return {
			posts: [],
			postGlobals: []
		};
	},
	created() {
		this.getPostGlobal();
	},
	computed: {
		...mapState(["user"])
	},
	methods: {
		async getPostGlobal() {
			try {
				const allData = [];
				db.collection("users")
					.get()
					.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
							// doc.data() is never undefined for query doc snapshots
							// console.log("Doc Users", doc.id, " => ", doc.data());
							db.collection("users")
								.doc(doc.id)
								.collection("posts")
								.get()
								.then(function(querySnapshot) {
									querySnapshot.forEach(function(res) {
										// doc.data() is never undefined for query doc snapshots
										//console.log("Doc POSTs", res.id, " => ", res.data());
										const registerDate = new Date(res.data().registerDate.seconds * 1000)
											.toISOString()
											.slice(-30, -8)
											.replace("T", " ");
										const postGlobal = {
											id: res.id,
											avatarUserPost: res.data().avatarUserPost,
											userPost: res.data().userPost,
											userUid: res.data().userUid,
											titlePost: res.data().titlePost,
											imgPost: res.data().imgPost,
											messagePost: res.data().messagePost,
											registerDate: registerDate
										};
										// console.log("TCL: getPostGlobal -> postGlobal", postGlobal);
										allData.push(postGlobal);
									});
								});
						});
					});
				// console.log("¿Todos los post por fin?", allData);
				this.posts = allData;
			} catch (error) {
				console.log("TCL: getPostGlobal -> error", error);
			}
		}
	}
};
</script>
