<template>
	<v-app root>
		<app-bar :user="user" @authenticateUser="googleAuth" />
		<v-main>
			<router-view />
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
	}),
	methods: {
		async googleAuth() {
			this.user = await this.Authenticator.googleAuth();
			console.log(this.user);
		},
	},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Major+Mono+Display&display=swap");
</style>
