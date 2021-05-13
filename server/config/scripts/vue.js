const Vue = require("vue/dist/vue");
const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");

new Vue({
	el: "#main",
	data() {
		return {
			configuration: {},
			serverPort: null,
			modifiedDate: null,
			allowedHosts: [],
			newAllowedHost: null,
		};
	},
	mounted() {
		if (!fs.existsSync(path.join(__dirname, "./config.json"))) {
			fs.writeFileSync(
				path.join(__dirname, "./config.json"),
				JSON.stringify({
					serverPort: 8080,
					modifiedDate: "Nunca",
					allowedHosts: [],
				})
			);
		}

		const config = require("./config.json");
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
			this.newAllowedHost !== null
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
		saveConfigurations() {
			fs.writeFileSync(
				path.join(__dirname, "./config.json"),
				JSON.stringify(this.configuration)
			);
		},
	},
});
