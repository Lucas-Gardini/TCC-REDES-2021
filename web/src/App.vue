<template>
	<v-app root>
		<app-bar
			:user="user"
			:isMobile="isMobile"
			@authenticateUser="googleAuth"
			@logoutUser="googleAuth(true)"
		/>
		<v-main style="overflow-x: hidden">
			<transition
				enter-active-class="animate__animated animate__slideInLeft"
				leave-active-class="animate__animated animate__slideOutRight"
			>
				<router-view :isMobile="isMobile" />
			</transition>
		</v-main>
	</v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Authenticator from "./utils/authenticator.js";
export default {
	components: { AppBar },
	name: "App",

	data: () => ({
		Authenticator: new Authenticator(),
		user: {},
		isMobile: false,
	}),
	mounted() {
		this.checkMobile();
		window.addEventListener("resize", this.checkMobile);
	},
	beforeDestroy() {
		this.Authenticator.googleLogout();
	},
	methods: {
		async googleAuth(logout) {
			if (logout) {
				this.user = await this.Authenticator.googleLogout();
				return;
			}
			this.user = await this.Authenticator.googleAuth();
		},

		checkMobile() {
			if (window.innerWidth < 768) {
				this.isMobile = true;
			} else {
				this.isMobile = false;
			}
		},
	},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap");
</style>
