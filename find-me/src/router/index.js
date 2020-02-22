import Vue from "vue";
import VueRouter from "vue-router";
import {auth} from "@/firebase";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import(/* webpackChunkName: "about" */ "../views/Home.vue"),
		meta: {requiresAuth: true}
	},
	{
		path: "/login",
		name: "Ingreso",
		component: () => import(/* webpackChunkName: "about" */ "../views/Login.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const user = auth.currentUser;

	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (user) {
			next();
		} else {
			next({
				name: "Ingreso"
			});
		}
	} else {
		next(); // make sure to always call next()!
	}
});

export default router;
