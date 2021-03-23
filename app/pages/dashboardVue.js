const axios = require("axios");
const BrowserWindow = require("@electron/remote");
const path = require("path");
window.addEventListener("load", async () => {
	try {
		const conn = await fetch("https://google.com");
		if (conn) {
			document.querySelector("#main-content").setAttribute("style", "");
			document.querySelector("#no-connection").setAttribute("style", "display: none");
		}
	} catch (e) {
		document.querySelector("#main-content").setAttribute("style", "display: none");
		document.querySelector("#no-connection").setAttribute("style", "");
	}
}); //Vue Area

const vue = new Vue({
	el: "#main",
	data() {
		return {
			loaded: false,
			menus: {
				home: "active",
				products: "",
				profile: "",
				graph: "",
				requests: "",
				support: "",
			},
			products: [
				{
					name: "Pão0",
					avaiable: true,
				},
				{
					name: "Pão1",
					avaiable: true,
				},
				{
					name: "Pão2",
					avaiable: true,
				},
				{
					name: "Pão3",
					avaiable: true,
				},
				{
					name: "Pão4",
					avaiable: true,
				},
				{
					name: "Pão5",
					avaiable: true,
				},
				{
					name: "Pão6",
					avaiable: true,
				},
				{
					name: "Pão7",
					avaiable: true,
				},
				{
					name: "Pão8",
					avaiable: true,
				},
				{
					name: "Pão9",
					avaiable: true,
				},
			],
		};
	},
	methods: {
		alertar(btn) {
			for (let c in this.menus) {
				this.menus[c] = "";
			}
			switch (btn) {
				case "home":
					this.menus["home"] = "active";
					break;
				case "products":
					this.menus["products"] = "active";
					break;
				case "profile":
					this.menus["profile"] = "active";
					break;
				case "graph":
					this.menus["graph"] = "active";
					break;
				case "requests":
					this.menus["requests"] = "active";
					break;
				case "support":
					this.menus["support"] = "active";
					break;
			}
		},
		logoff() {
			axios.post("http://localhost:8080/user/logoff").then((res) => {
				if (res.data.success) {
					BrowserWindow.getCurrentWindow().loadFile(path.join(__dirname, "./index.html"));
				}
			});
		},
	},
	mounted() {
		this.loaded = true;
	},
});
