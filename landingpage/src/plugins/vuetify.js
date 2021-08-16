import "@mdi/font/css/materialdesignicons.css";
import "vuetify/lib/styles/main.sass";
// eslint-disable-next-line no-unused-vars
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives";

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: "light",
	},
});
