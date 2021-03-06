import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Menus from "../views/Menus.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Início",
		component: Home,
	},
	{ path: "/cardapio/:id", name: "Consulta Cardápio", component: Menu },
	{ path: "/cardapios", name: "Cardápios", component: Menus },
	{
		path: "/sobre",
		name: "Sobre",
		component: About,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
