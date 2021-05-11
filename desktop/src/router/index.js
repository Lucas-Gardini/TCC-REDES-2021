import { createRouter, createWebHashHistory } from "vue-router";
import AuthPage from "../views/AuthPage.vue";
import Dashboard from "../views/Dashboard.vue";
import Settings from "../views/Settings.vue";

const routes = [
	{ path: "/", name: "Home", component: AuthPage },
	{ path: "/dashboard", name: "Dashboard", component: Dashboard },
	{ path: "/dashboard/settings", name: "Settings", component: Settings },
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
