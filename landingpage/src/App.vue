<template>
	<v-app style="padding: 0px 0px 0px 0px !important" :theme="theme">
		<AppBar :isMobile="isMobile" />
		<v-main>
			<router-view v-slot="{ Component }">
				<transition
					enter-active-class="animate__animated animate__rollIn"
					leave-active-class="animate__animated animate__rollOut"
					mode="out-in"
				>
					<component :is="Component" />
				</transition>
			</router-view>
		</v-main>
		<!-- THEME CHANGER -->
		<v-btn class="themeChanger" @click="toggleTheme" style="color: #121212" elevation="1" fab icon small>
			<v-icon
				:style="theme === 'light' ? 'color: #121212' : 'color: #fff'"
				:icon="!(theme === 'light') ? 'mdi-brightness-6' : 'mdi-weather-night'"
			></v-icon>
		</v-btn>
	</v-app>
</template>

<script>
import { ref } from "vue";
import AppBar from "@/components/AppBar";

export default {
	name: "App",
	components: { AppBar },
	watch: {
		$route() {
			document.body.style = "overflow: hidden !important";
			setTimeout(() => {
				document.body.style = "";
			}, 1000);
		},
	},
	setup() {
		const theme = ref("light");

		return {
			theme,
			toggleTheme: () => {
				theme.value = theme.value === "light" ? "dark" : "light";
				localStorage.setItem("theme", theme.value);
			},
		};
	},
	data: () => ({
		isMobile: false,
	}),
	mounted() {
		this.theme = localStorage.getItem("theme") || "light";
		this.checkResponsivity();
		window.addEventListener("resize", this.checkResponsivity);
	},
	methods: {
		checkResponsivity() {
			if (window.innerWidth < 768) {
				this.isMobile = true;
			} else {
				this.isMobile = false;
			}
		},
	},
};
</script>

<style>
body {
	margin: 0;
	padding: 0;
	overflow-x: hidden;
	overflow-y: hidden;
}

/* width */
::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #555;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #00b74a;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.themeChanger {
	position: fixed;
	bottom: 2.5%;
	right: 2.5%;
	z-index: 100;
}
</style>
