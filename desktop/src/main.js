import "mdb-vue-ui-kit/css/mdb.min.css";
import "@mdi/font/css/materialdesignicons.min.css";
import axios from "axios";
axios.defaults.withCredentials = true;

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
	transition: "Vue-Toastification__bounce",
	maxToasts: 20,
	newestOnTop: true,
};

// Add frameworks here
createApp(App)
	.use(router)
	.use(Toast, options)
	.mount("#app");
