<template>
	<div>
		<ToolBar />
		<SideNav />

		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";
import SideNav from "./components/SideNav.vue";
export default {
	components: { ToolBar, SideNav },
	data: () => {
		return {};
	},
	methods: {},
};
</script>
<style>
/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#app {
	transition: margin-left 0.5s;
	padding: 20px;
	margin-left: 50px;
	overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateX(50vw);
}
</style>
