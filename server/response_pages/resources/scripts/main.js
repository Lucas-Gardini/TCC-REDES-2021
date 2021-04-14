import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const vue = new Vue({
	el: "#main",
	data() {
		return {};
	},
	methods: {
		scrollToTop() {
			window.scrollTo(0, 0);
		},
		buy() {
			alert("Em desenvolvimento");
			//window.open('mailto:test@example.com');
		},
	},
});
