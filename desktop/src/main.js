import "mdb-vue-ui-kit/css/mdb.min.css";
import "@mdi/font/css/materialdesignicons.min.css";
import axios from "axios";
axios.defaults.withCredentials = true;

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Add frameworks here
createApp(App)
	.use(router)
	.mount("#app");
