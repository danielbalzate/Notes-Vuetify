import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

/* Configuración Firebase */

new Vue({
	router,
	store,
	vuetify,
	el: "#app",
	render: (h) => h(App)
}).$mount("#app");
