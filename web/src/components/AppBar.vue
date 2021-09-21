<template>
	<div class="app-navigation">
		<v-navigation-drawer :v-model="true" :mini-variant="isMobile" fixed permanent>
			<v-list-item class="px-2" style="padding-left: 4px !important">
				<v-btn
					v-if="!user.info"
					:loading="loading"
					:disabled="loading"
					color="#fff"
					class="ma-2 black--text"
					@click="authenticateUser"
					:fab="isMobile"
					:x-small="isMobile"
				>
					<v-img
						alt="Google Logo"
						:class="isMobile ? 'shrink' : 'shrink mr-2'"
						contain
						src="../assets/google.png"
						transition="scale-transition"
						width="20"
					/>
					{{ isMobile ? "" : "Entrar" }}
				</v-btn>
				<v-btn
					v-else
					:loading="loading"
					:disabled="loading"
					color="#fff"
					class="ma-2 black--text"
					@click="logoutUser"
					:fab="isMobile"
					:x-small="isMobile"
				>
					<v-icon>mdi-logout</v-icon>
					{{ isMobile ? "" : "Sair" }}
				</v-btn>
			</v-list-item>

			<v-divider></v-divider>
			<v-list v-if="user.info" dense :style="isMobile ? 'display: flex' : ''">
				<div
					class="v-avatar v-list-item__avatar"
					:style="
						isMobile
							? 'height: 40px; min-width: 40px; width: 40px; margin: auto !important'
							: 'height: 40px; min-width: 40px; width: 40px; margin-left: 10px'
					"
				>
					<div class="v-image v-responsive theme--light">
						<div class="v-responsive__sizer" style="padding-bottom: 100%"></div>
						<div
							class="v-image__image v-image__image--cover"
							:style="`background-image: url('${user.info.photoURL}');
								background-position: center center;`"
						></div>
						<div class="v-responsive__content" style="width: 128px"></div>
					</div>
				</div>
				{{ isMobile ? "" : user.info.displayName }}
			</v-list>
			<v-divider></v-divider>

			<v-list dense>
				<v-list-item
					v-for="(route, index) in routes"
					@click="redirect(route.href)"
					class="white--text"
					:key="index"
					link
				>
					<v-list-item-icon>
						<v-icon>{{ route.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title style="color: #121212">{{ route.name }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar app color="#00B74A" dark :style="isMobile ? 'margin-left: 56px' : 'margin-left: 256px'">
			<div v-if="!isMobile" class="d-flex align-center">
				<v-img
					alt="Orderbyte Logo"
					class="shrink mr-2"
					contain
					src="../assets/logo.png"
					transition="scale-transition"
					width="50"
				/>
				<h1 class="app-name">orderbYte {{ route.length > 0 ? "-" : "" }} {{ route }}</h1>
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
		$route() {
			switch (this.$route.path) {
				case "/":
					this.route = "";
					break;
				case "/cardapios":
					this.route = "cardápios";
					break;
				case "/sobre":
					this.route = "sobre";
					break;
				case "/cardapio":
					this.route = `cardápio de ${this.$route.params.id.toLowerCase()}`;
					break;
				default:
					this.route = "";
			}
			if (this.$route.path.includes("cardapio") && !this.$route.path.includes("cardapios")) {
				this.route = `cardápio de ${this.$route.params.id.toLowerCase()}`;
			}
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
			route: "",
		};
	},
	mounted() {
		switch (this.$route.path) {
			case "/":
				this.route = "";
				break;
			case "/cardapios":
				this.route = "cardápios";
				break;
			case "/sobre":
				this.route = "sobre";
				break;
			default:
				this.route = "";
		}
		if (this.$route.path.includes("cardapio") && !this.$route.path.includes("cardapios")) {
			this.route = `cardápio de ${this.$route.params.id.toLowerCase()}`;
		}
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
	font-size: 1em;
}
.app-name.mobile {
	font-size: 1em;
}
.app-navigation {
	display: flex;
	flex-direction: row;
}
</style>
