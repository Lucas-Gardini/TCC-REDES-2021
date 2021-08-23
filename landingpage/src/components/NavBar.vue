<template>
	<!-- NavBar -->
	<nav v-if="!scrolled && !drawerVisible" :class="navClass">
		<div style="display: flex; margin-right: auto; padding-left: 20px">
			<transition
				enter-active-class="animate__animated animate__fadeInDown"
				leave-active-class="animate__animated animate__fadeOutUp"
			>
				<it-icon
					v-if="isMobile"
					style="font-size: 1.5em; margin-right: 10px; cursor: pointer"
					@click="drawerVisible = !drawerVisible"
					color="#fff"
					name="menu"
				/>
			</transition>
			<p style="color: #fff" class="orderify">ORDERIFY</p>
		</div>
		<transition
			enter-active-class="animate__animated animate__fadeInDown"
			leave-active-class="animate__animated animate__fadeOutUp"
		>
			<ul v-if="!isMobile" style="margin: auto">
				<li v-for="(link, i) in redirects" :key="i" class="item">
					<a style="display: flex; flex-direction: row" href="javascript:void(0)">
						<it-icon
							style="font-size: 1.5em; margin-right: 10px; cursor: pointer"
							@click="drawerVisible = !drawerVisible"
							:name="link.icon"
						/>
						<p>{{ link.name }}</p>
					</a>
				</li>
			</ul>
		</transition>
		<div style="margin-left: auto; padding-right: 20px">
			<it-button type="success" icon="email" pulse>Contato</it-button>
		</div>
	</nav>
	<nav id="scrolled" v-else-if="!drawerVisible" :class="scrolledNavClass">
		<div style="display: flex; margin-right: auto; padding-left: 20px">
			<transition
				enter-active-class="animate__animated animate__fadeInDown"
				leave-active-class="animate__animated animate__fadeOutUp"
			>
				<it-icon
					v-if="isMobile"
					style="font-size: 1.5em; margin-right: 10px; cursor: pointer"
					@click="drawerVisible = !drawerVisible"
					color="#121212"
					name="menu"
				/>
			</transition>
			<p style="color: #121212" class="orderify">ORDERIFY</p>
		</div>
		<transition
			enter-active-class="animate__animated animate__fadeInDown"
			leave-active-class="animate__animated animate__fadeOutUp"
		>
			<ul v-if="!isMobile" style="margin: auto">
				<li v-for="(link, i) in redirects" :key="i" class="item">
					<a style="display: flex; flex-direction: row" href="javascript:void(0)">
						<it-icon
							style="font-size: 1.5em; margin-right: 10px; cursor: pointer"
							@click="drawerVisible = !drawerVisible"
							:name="link.icon"
						/>
						<p>{{ link.name }}</p>
					</a>
				</li>
			</ul>
		</transition>
		<div style="margin-left: auto; padding-right: 20px">
			<it-button type="success" icon="email" pulse>Contato</it-button>
		</div>
	</nav>
	<!-- SideBar -->
	<it-drawer placement="left" v-model="drawerVisible">
		<it-icon
			style="font-size: 1.5em; margin-right: 10px; cursor: pointer; margin-left: 24px; margin-top: 15px"
			@click="drawerVisible = !drawerVisible"
			color="#121212"
			name="keyboard_backspace"
		/>

		<h3 style="margin: 24px">ORDERIFY</h3>
		<it-divider />
		<template v-for="(link, i) in redirects" :key="i">
			<ul style="margin: auto">
				<li class="item">
					<a style="display: flex; flex-direction: row" href="javascript:void(0)">
						<it-icon
							v-if="isMobile"
							style="font-size: 1.5em; margin-right: 10px; cursor: pointer"
							@click="drawerVisible = !drawerVisible"
							:name="link.icon"
						/>
						<p>{{ link.name }}</p>
					</a>
				</li>
			</ul>
			<it-divider />
		</template>
	</it-drawer>
</template>

<script>
export default {
	props: {
		isMobile: Boolean,
	},
	watch: {
		isMobile(newValue) {
			if (newValue) return;
			this.drawerVisible = false;
		},
	},
	data() {
		return {
			redirects: [
				{
					name: "Início",
					route: "",
					icon: "home",
				},
				{
					name: "Sobre",
					route: "",
					icon: "info",
				},
				{
					name: "Equipe",
					route: "",
					icon: "group",
				},
			],
			scrolled: false,
			scrolledNavClass: "animate__animated animate__fadeInDown",
			navClass: "animate__animated animate__fadeInDown",
			drawerVisible: false,
		};
	},
	mounted() {
		this.handleNav();
		window.addEventListener("scroll", this.handleNav);
	},
	methods: {
		handleNav() {
			if (window.scrollY > 50) {
				setTimeout(() => {
					this.scrolled = true;
				}, 300);
				this.navClass = "animate__animated animate__fadeOutUp";
				this.scrolledNavClass = "animate__animated animate__fadeInDown";
			} else {
				setTimeout(() => {
					this.scrolled = false;
				}, 300);
				this.navClass = "animate__animated animate__fadeIn";
				this.scrolledNavClass = "animate__animated animate__fadeOut";
			}
		},
	},
};
</script>

<style scoped>
nav {
	position: fixed;
	display: flex;
	width: 100vw;
	height: 70px;
	top: 0;
	left: 0;
	z-index: 8;
}

nav#scrolled {
	background-color: #fff;
}

nav div {
	padding: 20px 0 20px;
}

.hamburger {
	transform: scale(0.8);
}

ol,
ul {
	list-style: none;
}
li {
	display: inline-block;
	vertical-align: middle;
}
a:hover {
	color: #999;
	text-decoration: none;
}
a {
	text-decoration: none;
	transition: color 0.1s, background-color 0.1s;
}
a {
	position: relative;
	display: block;
	padding: 16px 0;
	margin: 0 12px;
	letter-spacing: 1px;
	font-size: 12px;
	line-height: 16px;
	font-weight: 900;
	text-transform: uppercase;
	transition: color 0.1s, background-color 0.1s, padding 0.2s ease-in;
	color: #2fde75;
}
a::before {
	content: "";
	display: block;
	position: absolute;
	bottom: 3px;
	left: 0;
	height: 3px;
	width: 100%;
	background-color: #2fde75;
	transform-origin: right top;
	transform: scale(0, 1);
	transition: color 0.1s, transform 0.2s ease-out;
}
a:active::before {
	background-color: #2dbd66;
}
a:hover::before {
	transform-origin: left top;
	transform: scale(1, 1);
}
</style>
