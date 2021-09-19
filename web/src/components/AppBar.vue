<template>
	<div>
		<v-app-bar app color="#00B74A" dark>
			<div v-if="!isMobile" class="d-flex align-center">
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
			<div v-else class="d-flex align-center">
				<v-img
					alt="Orderbyte Logo"
					class="shrink mr-2"
					contain
					src="../assets/logo.png"
					transition="scale-transition"
					width="40"
				/>
				<h1 class="app-name mobile">orderbYte</h1>
			</div>
			<v-spacer />
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
			<v-btn
				v-else
				:loading="loading"
				:disabled="loading"
				color="#fff"
				class="ma-2 black--text"
				@click="logoutUser"
			>
				<v-icon>mdi-logout</v-icon>
				Sair
			</v-btn>
			<template v-slot:extension>
				<v-tabs
					v-model="tabs"
					background-color="#00B74A accent-4"
					style="border-top: 0.1px solid #fff"
					fixed-tabs
				>
					<v-tabs-slider></v-tabs-slider>
					<v-tab
						v-for="(route, index) in routes"
						@click="redirect(route.href)"
						class="white--text"
						:key="index"
					>
						<v-icon v-html="route.icon" color="#fff"></v-icon>
						<span v-if="!isMobile" style="padding-left: 5%; color: #fff">{{ route.name }}</span>
					</v-tab>
				</v-tabs>
			</template>
		</v-app-bar>
	</div>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true,
		},
		isMobile: {
			type: Boolean,
			required: true,
		},
	},
	watch: {
		user() {
			this.loading = false;
		},
	},
	data() {
		return {
			loading: false,
			tabs: null,
			routes: [
				{ name: "Início", href: "/", icon: "mdi-home" },
				{ name: "Cardápios", href: "/cardapios", icon: "mdi-content-paste" },
				{ name: "Sobre", href: "/sobre", icon: "mdi-information" },
			],
		};
	},
	mounted() {
		let tab = this.routes.findIndex((route) => route.href === this.$route.path);
		this.tabs = tab;
	},
	methods: {
		redirect(route) {
			this.$router.push(route).catch(() => {});
		},
		authenticateUser() {
			this.loading = true;
			this.$emit("authenticateUser");
		},
		logoutUser() {
			this.loading = true;
			this.$emit("logoutUser");
		},
	},
};
</script>

<style scoped>
.app-name {
	font-family: "Major Mono Display", monospace;
	font-size: 1.5em;
}
.app-name.mobile {
	font-size: 1em;
}
</style>
