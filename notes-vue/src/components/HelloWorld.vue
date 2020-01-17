<template>
	<v-container>
		<v-layout>
			<v-flex>
				<v-btn>Texto</v-btn>
				<v-btn color="primary">Color</v-btn>
				<v-btn color="blue">Blue</v-btn>
				<v-btn color="secondary" text>Son fondo</v-btn>
				<v-btn color="secondary" outline>Son fondo</v-btn>
				<v-btn color="secondary" outline large>Son fondo</v-btn>
				<v-btn color="secondary" outline smalld :disabled="true">Son fondo</v-btn>
			</v-flex>
			<v-flex>
				<v-btn depressed class="primary"></v-btn>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>
