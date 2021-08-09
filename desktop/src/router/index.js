import { createRouter, createWebHashHistory } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import Dashboard from "../views/Dashboard.vue";
import Requests from "../views/Requests.vue";
import Products from "../views/Products.vue";
import Tables from "../views/Tables.vue";
import Settings from "../views/Settings.vue";
import Users from "../views/Users.vue";

const routes = [
	{ path: "/", name: "Home", component: AuthPage },
	{ path: "/dashboard", name: "Dashboard", component: Dashboard },
	{ path: "/dashboard/requests", name: "Requests", component: Requests },
	{ path: "/dashboard/products", name: "Products", component: Products },
	{ path: "/dashboard/tables", name: "Tables", component: Tables },
	{ path: "/dashboard/settings", name: "Settings", component: Settings },
	{ path: "/dashboard/users", name: "Users", component: Users },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
