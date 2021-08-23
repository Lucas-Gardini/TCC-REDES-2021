<template>
	<div>
		<NavBar :isMobile="isMobile" />
		<Intro :isMobile="isMobile" />
	</div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Intro from "./components/Intro.vue";

export default {
	components: {
		NavBar,
		Intro,
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
			if (window.innerWidth <= 600) {
				this.isMobile = true;
			} else {
				this.isMobile = false;
			}
		},
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rampart+One&display=swap");

body {
	margin: 0;
	background-color: #00aa44;
	overflow-x: hidden !important;
	overflow-y: scroll;
}

.orderify {
	font-family: "Rampart One", cursive;
}

::-webkit-scrollbar {
	width: 2px;
	height: 2px;
}
::-webkit-scrollbar-button {
	width: 0px;
	height: 0px;
}
::-webkit-scrollbar-thumb {
	background: #e1e1e1;
	border: 0px none #ffffff;
	border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
	background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
	background: #000000;
}
::-webkit-scrollbar-track {
	background: #666666;
	border: 0px none #ffffff;
	border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
	background: #666666;
}
::-webkit-scrollbar-track:active {
	background: #333333;
}
::-webkit-scrollbar-corner {
	background: transparent;
}

.main {
	padding-top: 70px;
}
</style>
