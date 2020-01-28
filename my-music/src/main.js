import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.filter("desc", function(arr) {
	if (arr) return arr.reverse();
});

new Vue({
	vuetify,
	render: (h) => h(App)
}).$mount("#app");
