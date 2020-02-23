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
// @ is an alias to /src
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(["user"]),
		...mapState("posts", ["posts"])
	}
};
</script>
