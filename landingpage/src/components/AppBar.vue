<template>
	<div>
		<v-app-bar color="#00B74A" dark>
			<transition
				enter-active-class="animate__animated animate__fadeInDown"
				leave-active-class="animate__animated animate__fadeOutUp"
				mode="out-in"
			>
				<v-app-bar-nav-icon v-if="isMobile" @click="drawer = true"></v-app-bar-nav-icon>
			</transition>
			<v-toolbar-title>Orderify</v-toolbar-title>
			<v-spacer></v-spacer>
			<transition
				enter-active-class="animate__animated animate__fadeInDown"
				leave-active-class="animate__animated animate__fadeOutUp"
				mode="out-in"
			>
				<div v-if="!isMobile">
					<v-btn
						v-for="(item, i) in menuOptions"
						:key="i"
						@click="closeAndRedirect(item.route)"
						elevation="2"
						text
						class="mr-2"
					>
						<v-icon left>{{ item.icon }}</v-icon> {{ item.name }}
					</v-btn>
				</div>
			</transition>
			<v-btn icon @click="toggleDarkMode">
				<v-icon v-if="darkMode === true">mdi-brightness-6</v-icon>
				<v-icon v-else>mdi-weather-night</v-icon>
			</v-btn>
		</v-app-bar>

		<v-navigation-drawer v-if="isMobile" v-model="drawer" absolute temporary>
			<v-list nav dense>
				<v-app-bar-nav-icon @click="drawer = false"
					><v-icon>mdi-backburger</v-icon></v-app-bar-nav-icon
				>
				<v-list-item-group v-model="group" active-class="green--text text--accent-4">
					<v-list-item
						v-for="(item, i) in menuOptions"
						:key="i"
						:class="currentRoute === item.route ? 'green--text text--accent-4' : ''"
						@click="closeAndRedirect(item.route)"
					>
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>{{ item.name }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
export default {
	name: "AppBar",
	props: {
		isMobile: Boolean,
	},
	data: () => ({
		darkMode: false,
		drawer: false,
		group: null,
		menuOptions: [
			{ name: "Início", icon: "mdi-home", route: "/" },
			{ name: "Sobre", icon: "mdi-information", route: "/sobre" },
			{ name: "Equipe", icon: "mdi-account-group", route: "/equipe" },
		],
		currentRoute: "/",
	}),
	mounted() {
		this.darkMode = this.$vuetify.theme.dark;
		this.currentRoute = this.$route.path;
	},
	methods: {
		closeAndRedirect(route) {
			setTimeout(() => {
				this.drawer = false;
			}, 200);
			if (this.$route.path === route) return;
			this.$router.push(route);
			this.currentRoute = this.$route.path;
		},
		toggleDarkMode() {
			this.darkMode = !this.darkMode;
			this.$vuetify.theme.dark = this.darkMode;
		},
	},
};
</script>

<style></style>
