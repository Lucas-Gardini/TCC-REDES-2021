const Vue = require("vue/dist/vue");
const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const server = require("./app");

new Vue({
	el: "#main",
	data() {
		return {
			configuration: {},
			serverPort: null,
			modifiedDate: null,
			allowedHosts: [],
			newAllowedHost: null,
			isServerUp: false,
		};
	},
	mounted() {
		if (!fs.existsSync(path.join(__dirname, "../config.json"))) {
			fs.writeFileSync(
				path.join(__dirname, "../config.json"),
				JSON.stringify({
					serverPort: 8080,
					modifiedDate: "Nunca",
					allowedHosts: [],
				})
			);
		}

		console.log(fs.existsSync(path.join(__dirname, "../config.json")));
		console.log(path.join(__dirname, "../config.json"));

		const config = require("../config.json");
		this.serverPort = config.serverPort;
		this.modifiedDate =
			config.modifiedDate === "Nunca"
				? "Nunca"
				: DateTime.fromISO(config.modifiedDate).toFormat("dd/MM/yyyy");
		this.allowedHosts = config.allowedHosts;
		this.configuration = config;
	},
	watch: {
		allowedHosts: function () {
			this.newAllowedHost = null;
		},
	},
	methods: {
		saveServerPort() {
			this.configuration.serverPort = this.serverPort;

			this.modifiedDate = DateTime.fromJSDate(new Date()).toFormat("dd/MM/yyyy");

			this.configuration.modifiedDate = DateTime.fromJSDate(new Date()).toISODate();
		},
		saveAllowedHosts() {
			this.newAllowedHost !== null && this.validateHostIp()
				? this.allowedHosts.push({ host: this.newAllowedHost })
				: console.log(String(this.newAllowedHost).length);

			this.configuration.allowedHosts = this.allowedHosts;
		},
		removeAllowedHost(rmv_host) {
			const hostIndex = this.allowedHosts.findIndex((host) => host.host === rmv_host);
			if (hostIndex > -1) {
				this.allowedHosts.splice(hostIndex, 1);
			}
		},
		saveAll() {
			this.saveServerPort();
			this.saveAllowedHosts();
			this.saveConfigurations();
		},
		async saveConfigurations() {
			fs.writeFileSync(
				path.join(__dirname, "../config.json"),
				JSON.stringify(this.configuration)
			);
			try {
				await this.stopServer();
			} catch (err) {}
			await this.startServer();
		},
		validateHostIp() {
			if (String(this.newAllowedHost).indexOf("localhost") > -1) {
				return true;
			} else {
				if (
					/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
						this.newAllowedHost
					)
				) {
					return true;
				}
				const alert = document.querySelector("#alertIp");
				console.log(alert.style);
				alert.style.display = "flex";
				alert.classList.add("show");
				setTimeout(() => {
					alert.classList.remove("show");
					setTimeout(() => {
						alert.style.display = "none";
					}, 100);
				}, 2000);
				return false;
			}
		},
		async startServer() {
			try {
				await server.startServer();
				setTimeout(async () => {
					const { data } = await axios.get(`http://localhost:${this.serverPort}/ping`);
					if (data === "Pong!") {
						this.isServerUp = true;
					}
				}, 1000);
			} catch (err) {
				const alert = document.querySelector("#alertServer");
				alert.style.display = "flex";
				alert.classList.add("show");
				setTimeout(() => {
					alert.classList.remove("show");
					setTimeout(() => {
						alert.style.display = "none";
					}, 100);
				}, 2000);
				this.isServerUp = false;
			}
		},
		async stopServer() {
			const stoppedServer = await server.stopServer();
			setTimeout(() => {
				if (stoppedServer) {
					this.isServerUp = false;
				}
			}, 500);
		},
	},
});
