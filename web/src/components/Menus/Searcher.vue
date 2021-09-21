<template>
	<v-form>
		<v-container>
			<v-row>
				<v-col cols="4" md="4">
					<v-autocomplete
						type="search"
						label="Estado"
						:items="states"
						v-model="selectedState"
						clearable
					></v-autocomplete>
				</v-col>

				<v-col cols="4" md="4">
					<v-autocomplete
						type="search"
						label="Cidade"
						:items="cities"
						v-model="selectedCity"
						clearable
					></v-autocomplete>
				</v-col>

				<v-col v-if="!isMobile" style="display: flex" cols="4" md="4">
					<v-btn style="margin: auto; color: #fff" color="#00B74A" elevation="2">
						<v-icon left>mdi-magnify</v-icon> Filtrar
					</v-btn>
				</v-col>
				<v-col v-else style="display: flex" cols="4" md="4">
					<v-btn
						style="margin: auto; color: #fff; font-size: xx-small"
						color="#00B74A"
						elevation="2"
					>
						<v-icon left>mdi-magnify</v-icon> Filtrar
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
import { states } from "../../utils/estados-cidades.json";
export default {
	props: {
		isMobile: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			states: [],
			selectedState: null,
			cities: [],
			selectedCity: null,
		};
	},
	watch: {
		selectedState() {
			states.forEach((state) => {
				if (state.initials === this.selectedState) {
					return (this.cities = state.cities);
				}
			});
		},
	},
	mounted() {
		states.forEach((state) => {
			this.states.push(state.initials);
		});
	},
};
</script>

<style></style>
