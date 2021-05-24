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
import ToolBar from "./components/ToolBar.vue";
import SideNav from "./components/SideNav.vue";
import axios from "axios";
export default {
	watch: {
		async $route() {
			try {
				(await axios.get(`${localStorage.serverAddress}/ping`)).data;
			} catch (e) {
				localStorage.currentUser = null;
				localStorage.user = null;
				this.$router.push("/");
			}
		},
	},
	components: { ToolBar, SideNav },
	methods: {},
};
</script>
<style>
/* @import url("https://fonts.googleapis.com/css2?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Kdam+Thmor&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap");

body {
	font-family: "Noto Serif", serif;
} */

#app {
	transition: margin-left 0.5s;
	padding: 20px;
	margin-left: 50px;
	overflow-x: hidden;
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
</style>
