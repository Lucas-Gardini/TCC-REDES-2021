<template>
	<div>
		<ToolBar />
		<SideNav />
		<router-view />
	</div>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";
import SideNav from "./components/SideNav.vue";
export default {
	components: { ToolBar, SideNav },
};
</script>
<style></style>
