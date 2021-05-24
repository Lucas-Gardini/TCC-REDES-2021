import { createRouter, createWebHashHistory } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/Products.vue";
import Tables from "../views/Tables.vue";
import Settings from "../views/Settings.vue";

const routes = [
	{ path: "/", name: "Home", component: AuthPage },
	{ path: "/dashboard", name: "Dashboard", component: Dashboard },
	{ path: "/dashboard/products", name: "Products", component: Products },
	{ path: "/dashboard/tables", name: "Tables", component: Tables },
	{ path: "/dashboard/settings", name: "Settings", component: Settings },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
