<template>
	<div class="ToolBar">
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
export default {
	methods: {
		manageWindow(method) {
			ipcRenderer.invoke("manageWindow", { method });
		},
	},
};
</script>

<style>
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
