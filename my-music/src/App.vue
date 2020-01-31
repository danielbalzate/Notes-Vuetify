<template>
	<div id="app">
		<header class="text-center">
			<h1>My music</h1>
		</header>
		<main>
			<section class="player">
				<br />
				<v-card class="mx-auto" outlined>
					<v-img class="white--text align-end" height="200px" :src="current.img" :alt="current.img" style="opacity: 0.5;"></v-img>
					<v-list-item two-line style="margin-left:0%; ">
						<v-list-item-content>
							<div class="overline mb-4 song-title">{{ current.title }}</div>
							<v-list-item-title class="headline mb-1 song-title">{{ current.artist }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-img
						class="img"
						:src="current.img"
						:alt="current.img"
						style="position: absolute; width: 120px; margin-bottom: 26%; margin-top: -70%; margin-left: 57%; border-radius: 10px;"
					></v-img>

					<div class="controls" style="z-index:-3">
						<v-btn class="mx-2 prev" fab dark x-small color="blue" @click="prev">
							<v-icon dark>mdi-skip-previous</v-icon>
						</v-btn>
						<v-btn class="mx-2 play" v-if="!isPlaying" fab dark small color="blue" @click="play">
							<v-icon dark>mdi-play</v-icon>
						</v-btn>
						<v-btn class="mx-2 pause" v-else fab dark small color="blue" @click="pause">
							<v-icon dark>mdi-pause</v-icon>
						</v-btn>
						<v-btn class="mx-2 next" fab dark x-small color="blue" @click="next">
							<v-icon dark>mdi-skip-next</v-icon>
						</v-btn>
					</div>
				</v-card>
			</section>
			<section class="playlist">
				<div>
					<v-switch v-model="reverse" label="Cambiar de posición"></v-switch>
					<v-timeline :reverse="reverse" dense style="margin-left: 5%;">
						<v-timeline-item v-for="song in songs" :key="song.src" :class="song.src == current.src ? 'song playing' : 'song'">
							<template v-slot:icon>
								<v-avatar>
									<img :src="song.img" />
								</v-avatar>
							</template>
							<v-card class="elevation-2">
								<v-card-title class="headline hoverOpacity" @click="play(song)">
									{{ song.title }}
									<br />
									{{ song.artist }}
								</v-card-title>
							</v-card>
						</v-timeline-item>
					</v-timeline>
				</div>
			</section>

			<!-- <v-footer absolute class="font-weight-medium" style="background-color: #379ACC ">
				<v-col class="text-center" cols="12">
					{{ new Date().getFullYear() }} —
					<strong>Desarrollado por Daniel B. Alzate</strong>
				</v-col>
			</v-footer> -->
		</main>
	</div>
</template>

<script>
export default {
	name: "app",
	data() {
		return {
			current: {},
			index: 0,
			reverse: false,
			isPlaying: false,
			icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
			songs: [
				{
					title: "Lady",
					artist: "Modjo",
					src: require("./assets/songs/lady-modjo.mp3"),
					img: require("./assets/img/lady-modjo.jpg")
				},
				{
					title: "Path",
					artist: "Damian Marley",
					src: require("./assets/songs/path.mp3"),
					img: require("./assets/img/damian-marley.jpg")
				},
				{
					title: "Still Searching",
					artist: "Damian Marley",
					src: require("./assets/songs/still.mp3"),
					img: require("./assets/img/damian-marley.png")
				},
				{
					title: "Shaggy",
					artist: "Repent",
					src: require("./assets/songs/shaggy-repent.mp3"),
					img: require("./assets/img/repent.jpg")
				},
				{
					title: "Tanya Stephens",
					artist: "It's a pity",
					src: require("./assets/songs/its-a-pity.mp3"),
					img: require("./assets/img/its-a-pity.jpg")
				},
				{
					title: "Fugees",
					artist: "Fu-Gee-La",
					src: require("./assets/songs/fu-gee-la.mp3"),
					img: require("./assets/img/fu-gee-la.jpg")
				},
				{
					title: "Buju Banton",
					artist: "Champion",
					src: require("./assets/songs/champion.mp3"),
					img: require("./assets/img/champion.jpg")
				}
			],
			player: new Audio()
		};
	},
	methods: {
		play(song) {
			if (typeof song.src != "undefined") {
				this.current = song;
				this.player.src = this.current.src;
			}
			this.player.play();
			this.player.addEventListener("ended", function() {
				this.index++;
				if (this.index > this.songs.length - 1) {
					this.index = 0;
				}
				this.current = this.songs[this.index];
				this.play(this.current);
			});
			this.isPlaying = true;
		},
		pause() {
			this.player.pause();
			this.isPlaying = false;
		},
		next() {
			this.index++;
			if (this.index > this.songs.length - 1) {
				this.index = 0;
			}
			this.current = this.songs[this.index];
			this.play(this.current);
		},
		prev() {
			this.index--;
			if (this.index < 0) {
				this.index = this.songs.length - 1;
			}
			this.current = this.songs[this.index];
			this.play(this.current);
		}
	},
	created() {
		this.current = this.songs[this.index];
		this.player.src = this.current.src;
	}
};
</script>

<style>
body {
	background-repeat: repeat;
	background-image: url("./assets/img/weed-body.jpg");
}
header {
	display: flex;
	justify-content: center;
	text-align: center;
	padding: 15px;
	background: linear-gradient(90deg, rgba(253, 247, 29, 1) 22%, rgba(146, 252, 69, 1) 100%);
	color: azure;
}
.playlist :hover {
	color: rgb(158, 238, 30);
}
.player {
	text-align: center;
}
.song-title {
	color: #212121;
	font-size: 20px;
	font-weight: 700;
	text-transform: uppercase;
}
.play,
.pause {
	padding: 15px 25px;
	color: azure;
	background: radial-gradient(circle, rgba(63, 94, 251, 1) 29%, rgba(30, 42, 92, 1) 100%);
}
.next,
.prev {
	color: azure;
	background: radial-gradient(circle, rgba(63, 94, 251, 1) 29%, rgba(30, 42, 92, 1) 100%);
}
.controls {
	display: flex;
	justify-content: center;
	align-items: center;
}
/* * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	font-family: sans-serif;
}
header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-image: linear-gradient(to right, #cc2e5d, #ff5858);

	color: azure;
}
main {
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	padding: 25px;
}

.song-title {
	color: #212121;
	font-size: 15px;
	font-weight: 700;
	text-transform: uppercase;
}
.song-title span {
	font-weight: 400;
	font-style: italic;
}
.controls {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15px 5px;
}
button {
	appearance: none;
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
}
button:hover {
	opacity: 0.8;
}
.play,
.pause {
	font-size: 20px;
	font-weight: 700;
	padding: 15px 25px;
	margin: 0px 15px;
	border-radius: 8px;
	color: azure;
	background: linear-gradient(160deg, rgba(15, 226, 195, 1) 2%, rgba(215, 0, 160, 1) 100%);
}
.next,
.prev {
	color: azure;
	background: linear-gradient(160deg, rgba(15, 226, 195, 1) 2%, rgba(215, 0, 160, 1) 100%);
}
.playlist {
	padding: 0px 30px;
}
.playlist h3 {
	color: #212121;
	font-size: 28px;
	font-weight: 400;
	margin-bottom: 30px;
	text-align: center;
}
.playlist .song {
	display: block;
	width: 100%;
	padding: 15px;
	font-size: 20px;
	font-weight: 700;
	cursor: pointer;
	border-radius: 10px;
}
.playlist .song:hover {
	color: red;
}

.playlist .song.playing {
	color: azure;
	background-image: linear-gradient(to right, #cc2e5d, #ff5858);
}
.img {
	box-sizing: border-box;
	display: block;
	object-fit: cover;
	border-radius: 20px;
} */
</style>
