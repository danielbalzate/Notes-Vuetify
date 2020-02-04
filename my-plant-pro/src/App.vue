<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />
			</div>
			<div class="d-flex align-center">
				<h2 class="font-weight-black">My plant</h2>
			</div>

			<v-spacer></v-spacer>

			<v-btn href="https://github.com/danielbalzate" target="_blank" text>
				<span class="mr-2">My github</span>
				<v-icon>mdi-open-in-new</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			<HelloWorld />
			<template>
				<div id="app">
					<v-progress-linear :value="UploadValue"></v-progress-linear>

					<v-card class="pa-md-4 mx-auto mt-7" color="white" width="90%">
						<v-card-text>
							<template>
								<v-file-input
									v-model="files"
									color="deep-purple accent-4"
									counter
									label="Foto de perfil"
									multiple
									placeholder="Selecciona tu foto de perfil"
									prepend-icon="mdi-paperclip"
									outlined
									@change="onFileSelected"
									:show-size="1000"
								>
									<template v-slot:selection="{index, text}">
										<v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
											{{ text }}
										</v-chip>

										<span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">+{{ files.length - 2 }} File(s)</span>
									</template>
								</v-file-input>
								<div class="text-center">
									<v-btn class="ma-2" outlined color="blue darken-3">Subir archivo</v-btn>
								</div>
								<img :src="this.picture" width="40%" alt="" />
							</template>
						</v-card-text>
					</v-card>
				</div>
			</template>
		</v-content>
	</v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
	name: "App",

	components: {
		HelloWorld
	},

	data: () => ({
		files: []
	})
};
</script>
