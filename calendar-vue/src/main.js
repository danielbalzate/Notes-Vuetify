import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VUeTextareaAutpsize from "vue-textarea-autosize";

import firebase from "firebase/app";
import "firebase/firestore";
Vue.config.productionTip = false;

// Inicia Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCQyGZ07EWqchXpIe0xnR1PH03XPwejt00",
	authDomain: "calendar-vue-1bce3.firebaseapp.com",
	databaseURL: "https://calendar-vue-1bce3.firebaseio.com",
	projectId: "calendar-vue-1bce3",
	storageBucket: "calendar-vue-1bce3.appspot.com",
	messagingSenderId: "854924818923",
	appId: "1:854924818923:web:bd0a8e3f51494f8ddb81ae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App)
}).$mount("#app");
