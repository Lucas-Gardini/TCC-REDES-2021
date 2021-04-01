<template>
	<div>
		<!-- table management -->
		<div class="floating-action-button">
			<v-row justify="space-around">
				<v-col cols="auto">
					<v-dialog
						transition="dialog-bottom-transition"
						max-width="600"
					>
						<template #activator="{ on, attrs }">
							<v-btn
								v-bind="attrs"
								color="green"
								elevation="3"
								fab
								style="font-size: xx-large"
								v-on="on"
								@click="toogleOverlay"
							>
								<i class="mdi mdi-table-chair"></i>
							</v-btn>
						</template>
						<template #default="dialog">
							<v-card>
								<v-toolbar color="primary" dark
									>Seleção de mesa</v-toolbar
								>
								<v-card-text>
									<v-row>
										<v-col
											v-for="(
												table, i
											) in avaiable_tables"
											:key="i"
											class="col-4 mt-5"
										>
											<v-btn @click="chooseTable(i)">
												{{ table }}
											</v-btn>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-actions class="justify-end">
									<v-btn text @click="dialog.value = false"
										>Close</v-btn
									>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</v-col>
			</v-row>
		</div>
		<!-- Main Content -->
		<div>Mesa selecionada: {{ current_table }}</div>
		<v-btn @click="unAuthenticate">Deslogar</v-btn>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	components: {},
	data: () => ({
		overlay: false,
		zIndex: 0,
		avaiable_tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		current_table: 0,
	}),
	beforeCreate() {
		if (!this.$store.getters.getAuthentication) {
			this.$router.push('/auth');
			return true;
		}
	},
	methods: {
		toogleOverlay() {
			this.overlay = true;
			this.zIndex = 9;
		},
		chooseTable(table) {
			this.current_table = table;
		},
		...mapMutations({
			unAuthenticate: 'unAuthenticate',
		}),
	},
};
</script>
