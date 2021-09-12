import { createApp } from "vue";
import App from "./App.vue";
import Equal from "equal-vue";
import "equal-vue/dist/style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";
import store from './store'

AOS.init();

createApp(App).use(store).use(Equal).mount("#app");
