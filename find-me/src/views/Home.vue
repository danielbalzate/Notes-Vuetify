<template>
	<v-layout>
		<h3>Bienvenido usuario {{ user.email }}</h3>
	</v-layout>
</template>

<script>
import {mapState} from "vuex";
// @ is an alias to /src
export default {
	computed: {
		...mapState(["user"])
	}
};
</script>
