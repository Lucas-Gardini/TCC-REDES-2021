<template>
	<v-app id="app">
		<v-theme-provider root>
			<v-main>
				<AppBar :isMobile="isMobile" />
				<transition
					enter-active-class="animate__animated animate__fadeInRightBig"
					leave-active-class="animate__animated animate__fadeOutLeftBig"
					mode="out-in"
				>
					<router-view />
				</transition>
				<FooterBar />
			</v-main>
		</v-theme-provider>
	</v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import FooterBar from "./components/FooterBar.vue";
export default {
	components: {
		AppBar,
		FooterBar,
	},
	data() {
		return {
			isMobile: false,
		};
	},
	mounted() {
		this.checkMobile();
		window.addEventListener("resize", this.checkMobile);
	},
	methods: {
		checkMobile() {
			if (window.innerWidth <= 768) {
				this.isMobile = true;
			} else {
				this.isMobile = false;
			}
		},
	},
};
</script>

<style lang="scss">
#app {
}
</style>
