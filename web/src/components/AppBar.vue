<template>
	<v-app-bar app color="#00B74A" dark>
		<div class="d-flex align-center">
			<v-img
				alt="Orderbyte Logo"
				class="shrink mr-2"
				contain
				src="../assets/logo.png"
				transition="scale-transition"
				width="50"
			/>
			<h1 class="app-name">orderbYte</h1>
		</div>

		<v-spacer></v-spacer>

		<v-btn
			v-if="!user.token"
			:loading="loading"
			:disabled="loading"
			color="#fff"
			class="ma-2 black--text"
			@click="authenticateUser"
		>
			<v-img
				alt="Google Logo"
				class="shrink mr-2"
				contain
				src="../assets/google.png"
				transition="scale-transition"
				width="20"
			/>
			Entrar
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			loading: false,
		};
	},
	methods: {
		authenticateUser() {
			this.loading = true;
			this.$emit("authenticateUser");
		},
	},
};
</script>

<style scoped>
.app-name {
	font-family: "Major Mono Display", monospace;
	font-size: 1.5em;
}
</style>
