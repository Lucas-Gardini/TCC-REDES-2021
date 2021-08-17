<template>
	<div class="main">
		<div style="margin-left: auto; margin-right: auto; text-align: center">
			<h1 :style="isMobile ? 'font-size: 1em' : ''">
				Diga adeus a má organização do seu restaurante!
			</h1>
			<h2 :style="isMobile ? 'font-size: 0.8em' : ''">
				O <span class="green--text">Orderify</span> está aqui para te ajudar!
			</h2>
		</div>
		<div style="display: flex; flex-direction: column; width: 100%">
			<v-img
				style="margin: auto; border: 1px solid black"
				max-height="80%"
				max-width="80%"
				src="../assets/desktop-ini.png"
			></v-img>
			<span style="margin-left: auto; margin-right: 10px; color: #727987"
				>Projeto ainda em desenvolvimento!</span
			>
		</div>
		<v-divider></v-divider>
		<HomeCards :isMobile="isMobile" />
	</div>
</template>

<script>
import HomeCards from "../components/HomeCards.vue";
export default {
	props: {
		isMobile: Boolean,
	},
	components: {
		HomeCards,
	},
};
</script>

<style scoped>
.main {
	display: flex;
	flex-direction: column;
}
</style>
