<template>
	<v-app-bar density="compact">
		<transition name="fade">
			<v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile" />
		</transition>
		<v-img v-if="!isMobile" style="border-radius: 1px" max-width="36" src="@/assets/logo.png"></v-img>
		<v-app-bar-title style="margin-left: 0px !important" v-if="!isMobile"> Orderify </v-app-bar-title>
		<v-spacer></v-spacer>
		<transition name="fade">
			<div v-if="!isMobile">
				<v-btn @click="$router.push('/')" text
					><v-icon left small icon="mdi-home"></v-icon> Início</v-btn
				>
				<v-btn @click="$router.push('/about')" class="mr-3" text
					><v-icon left small icon="mdi-information"></v-icon> Sobre</v-btn
				>
				<v-btn @click="$router.push('/team')" class="mr-3" text
					><v-icon left small icon="mdi-account-group"></v-icon> Equipe</v-btn
				>
				<v-btn @click="sendMail" class="mr-4" color="#00B74A" style="color: #fff" plain>
					<v-icon left icon="mdi-email"></v-icon>
					<span>Contato</span>
				</v-btn>
			</div>
		</transition>
		<!-- Drawer -->
		<v-card ref="drawer" elevation="2" outlined tile class="drawer hidden">
			<v-app-bar-nav-icon icon="mdi-backburger" @click="drawer = !drawer" v-if="isMobile" />
			<!-- MENU ITEMS -->
			<v-btn @click="$router.push('/')" text style="justify-content: left !important"
				><v-icon left small icon="mdi-home"></v-icon> Início</v-btn
			><v-divider></v-divider>
			<v-btn @click="$router.push('/about')" text style="justify-content: left !important"
				><v-icon left small icon="mdi-information"></v-icon> Sobre</v-btn
			>
			<v-divider></v-divider>
			<v-btn @click="$router.push('/team')" text style="justify-content: left !important"
				><v-icon left small icon="mdi-account-group"></v-icon> Equipe</v-btn
			>
			<v-btn
				@click="sendMail"
				color="#00B74A"
				style="color: #fff; margin-top: auto; margin-bottom: 5px"
				plain
			>
				<v-icon left icon="mdi-email"></v-icon>
				<span>Contato</span>
			</v-btn>
		</v-card>
	</v-app-bar>
</template>

<script>
export default {
	name: "AppBar",
	props: {
		isMobile: Boolean,
	},
	data() {
		return {
			loaded: false,
			drawer: true,
		};
	},
	watch: {
		$route() {
			this.drawer = true;
		},
		isMobile() {
			this.drawer = true;
		},
		drawer(_new) {
			const drawerClassList = this.$refs.drawer.$el.classList.value;
			if (drawerClassList.indexOf("slide") < 0) {
				this.$refs.drawer.$el.classList.value =
					this.$refs.drawer.$el.classList.value.replace("hidden", "") +
					" animate__animated animate__slideInLeft";
				return;
			}

			if (_new === false) {
				this.$refs.drawer.$el.classList.value = this.$refs.drawer.$el.classList.value.replace(
					"animate__slideOutLeft",
					"animate__slideInLeft"
				);
			} else {
				this.$refs.drawer.$el.classList.value = this.$refs.drawer.$el.classList.value.replace(
					"animate__slideInLeft",
					"animate__slideOutLeft"
				);
			}
		},
	},
	// mounted() {
	// 	console.log(this.$refs);
	// },
	methods: {
		sendMail() {
			window.open("mailto:test@example.com?subject=Contato%20Orderify&body=Digite%20Aqui...");
		},
	},
};
</script>

<style scoped>
.v-app-bar {
	overflow: visible !important;
}
.v-app-bar-title {
	padding-left: 5px !important;
}
.drawer {
	position: fixed;
	top: 0%;
	left: 0%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	margin: auto;
	padding-left: 5px;
	padding-right: 5px;
}
.hidden {
	opacity: 0;
	display: none;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
