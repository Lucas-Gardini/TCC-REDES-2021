<template>
	<div>
		<ToolBar />
		<SideNav />

		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script>
const { ipcRenderer } = require("electron");
import ToolBar from "./components/ToolBar.vue";
import SideNav from "./components/SideNav.vue";
import axios from "axios";

export default {
	watch: {
		async $route() {
			try {
				const loggedIn = (await axios.get(`${localStorage.serverAddress}/user/getlogin`)).status;
				if (loggedIn === 401 || loggedIn === "401") {
					localStorage.currentUser = null;
					localStorage.user = null;
					this.$router.push("/");
				}
			} catch (e) {
				if (!localStorage.serverAddress || this.$route.path === "/dashboard/settings") {
					this.$router.push("/dashboard/settings");
				} else {
					localStorage.currentUser = null;
					localStorage.user = null;
					this.$router.push("/");
				}
			}
		},
	},
	components: { ToolBar, SideNav },
	mounted() {
		ipcRenderer.send("loaded");
	},
};
</script>
<style>
/* @import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kdam+Thmor&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");
*/

#app {
	transition: margin-left 0.5s;
	padding: 20px;
	margin-left: 50px;
	overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #121212;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #00b74a;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(50vw);
}

.overlay {
	position: fixed;
	top: 0%;
	left: 0%;
	min-width: 100%;
	min-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.getBackUp {
	position: fixed;
	bottom: 0;
	right: 0;
	margin-right: 10px;
	margin-bottom: 10px;
}
</style>
