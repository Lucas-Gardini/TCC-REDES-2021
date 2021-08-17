<template>
	<v-footer dark padless>
		<v-card
			flat
			tile
			fixed="true"
			color="#00B74A"
			width="100%"
			style="position: fixed; bottom: 0;"
			class="lighten-1 white--text text-center"
		>
			<v-card-text class="white--text">
				{{ new Date().getFullYear() }} —
				<a style="text-decoration: none; color: #fff" href="javascript:void(0)" @click="redirectTeam"
					><strong>Equipe</strong></a
				>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	methods: {
		redirectTeam() {
			this.$router.push("/equipe");
		},
	},
};
</script>

<style></style>
