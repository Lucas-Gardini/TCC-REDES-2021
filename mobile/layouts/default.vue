<template>
	<v-app dark>
		<v-app-bar :clipped-left="clipped" fixed app>
			<v-toolbar-title v-text="title" />
			<v-spacer />
		</v-app-bar>
		<v-main>
			<v-container>
				<nuxt />
			</v-container>
		</v-main>
		<v-footer :absolute="!fixed" app>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			clipped: false,
			fixed: true,
			title: 'Orderify - Mobile',
		};
	},
};
</script>

<style>
body {
	overflow: hidden !important;
}

/* width */
::-webkit-scrollbar {
	width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.floating-action-button {
	position: fixed;
	bottom: 60px;
	right: 10px;
}
</style>
