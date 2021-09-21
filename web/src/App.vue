<template>
	<v-app root>
		<app-bar
			:user="user"
			:isMobile="isMobile"
			@authenticateUser="googleAuth"
			@logoutUser="googleAuth(true)"
		/>
		<v-main
			:style="
				isMobile ? 'overflow-x: hidden; margin-left: 56px' : 'overflow-x: hidden; margin-left: 256px'
			"
		>
			<transition
				:duration="{ enter: 500, leave: 100 }"
				enter-active-class="animate__animated animate__fadeIn"
				leave-active-class="animate__animated animate__fadeOut"
			>
				<router-view :user="user" :isMobile="isMobile" />
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
	async mounted() {
		this.checkMobile();
		window.addEventListener("resize", this.checkMobile);
		this.user = await this.Authenticator.checkAuth();
	},
	// beforeDestroy() {
	// 	this.Authenticator.googleLogout();
	// },
	methods: {
		async googleAuth(logout) {
			if (logout) {
				this.user = await this.Authenticator.googleLogout();
				return;
			}
			this.user = await this.Authenticator.googleAuth();
			console.log(this.user);
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
