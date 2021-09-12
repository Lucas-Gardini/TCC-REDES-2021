<template>
	<div class="ToolBar">
		<div class="appName">
			orderbYte
		</div>
		<button @click="manageWindow('MINIMIZE')" class="tb-minimize">
			<i class="mdi mdi-minus"></i>
		</button>
		<button @click="manageWindow('MAXIMIZE')" class="tb-maximize">
			<i class="mdi mdi-square-outline"></i>
		</button>
		<button @click="manageWindow('CLOSE')" class="tb-close">
			<i class="mdi mdi mdi-close"></i>
		</button>
	</div>
</template>

<script>
const { ipcRenderer } = require("electron");
import { useToast } from "vue-toastification";
import notificationAudio from "../assets/notification.mp3";

export default {
	setup() {
		const toast = useToast();
		return { toast };
	},
	data() {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			currentPath: "",
			notificationSound: new Audio(notificationAudio),
		};
	},
	watch: {
		$route() {
			this.currentPath = this.$route.path;
		},
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "products":
					if (this.currentPath === "/dashboard/products") {
						return;
					}
					ipcRenderer.invoke("notify", { type: "products" });
					break;
				case "requests":
					if (this.currentPath === "/dashboard/requests") {
						this.notificationSound.play();
						this.notificationSound.onended = () => {
							this.notificationSound.currentTime = 0;
						};
						this.toast.success("Novo Pedido!", {
							position: "top-right",
							timeout: 5000,
							closeOnClick: true,
							pauseOnFocusLoss: false,
							pauseOnHover: true,
							draggable: true,
							draggablePercent: 1,
							showCloseButtonOnHover: false,
							hideProgressBar: false,
							closeButton: "button",
							icon: true,
							rtl: false,
						});
						return;
					}
					ipcRenderer.invoke("notify", { type: "requests" });
					break;
				case "tables":
					if (this.currentPath === "/dashboard/tables") {
						return;
					}
					ipcRenderer.invoke("notify", { type: "tables" });
					break;
			}
		};
	},
	methods: {
		manageWindow(method) {
			ipcRenderer.invoke("manageWindow", { method });
		},
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap");

.ToolBar {
	position: fixed;
	top: 0%;
	right: 0%;
	min-width: 100%;
	max-width: 100%;
	text-align: right;
	background-color: #121212;
	-webkit-app-region: drag;
	z-index: 9;
}

.ToolBar .appName {
	position: absolute;
	top: 50%;
	left: 0%;
	transform: translateY(-50%);
	margin-left: 10px;
	color: #fff;
	font-family: "Major Mono Display", monospace;
	font-size: 0.9em;
}

.ToolBar button {
	background-color: none;
	border: 0px;
	background-color: #121212;
	color: white;
	-webkit-app-region: none !important;
}

.ToolBar button.tb-minimize:hover {
	background-color: #202020;
}

.ToolBar button.tb-maximize:hover {
	background-color: #202020;
}

.ToolBar button.tb-close:hover {
	background-color: red;
}
</style>
