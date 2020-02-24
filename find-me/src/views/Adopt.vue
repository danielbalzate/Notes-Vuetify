<template>
	<v-card class="d-flex flex-wrap" flat tile>
		<v-card max-width="250" class="ma-3" v-for="(post, index) in posts" :key="index">
			<v-list-item>
				<v-avatar class="mr-5">
					<img :src="post.avatarUserPost" />
				</v-avatar>
				<v-list-item-content>
					<v-list-item-title class="headline">{{ post.titlePost }}</v-list-item-title>
					<v-list-item-subtitle>{{ post.userPost }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-img :src="post.imgPost" height="194"></v-img>

			<v-card-text>
				{{ post.messagePost }}
			</v-card-text>
		</v-card>
	</v-card>
</template>
<script>
import {mapState} from "vuex";
import {db} from "@/firebase";

// @ is an alias to /src
export default {
	data() {
		return {
			posts: [
				/* 	{
					avatarUserPost: "red",
					userPost: "Rogrigo Lara",
					titlePost: "Ayuda amigos",
					imgPost: "https://cdn.vuetifyjs.com/images/cards/mountain.jpg",
					messagePost: "Visit ten places on our planet that are undergoing the biggest changes today."
				}, */
			]
		};
	},
	computed: {
		...mapState(["user"])
		// Creo que no lo voy a utilizar modular
		// ...mapState("posts", ["posts"])
	},
	created() {
		this.getChatGlobal();
	},
	methods: {
		async getChatGlobal() {
			try {
				const resDB = await db.collection("chatGlobal").get();
				resDB.forEach((res) => {
					// console.log("TCL: getChatGlobal -> res", res);
					const chatGlobal = {
						avatarUserPost: res.data().avatarUserPost,
						userPost: res.data().userPost,
						titlePost: res.data().titlePost,
						imgPost: res.data().imgPost,
						messagePost: res.data().messagePost
					};
					this.posts.push(chatGlobal);
				});
			} catch (error) {
				console.log("TCL: getChatGlobal -> error", error);
			}
		}
	}
};
</script>
