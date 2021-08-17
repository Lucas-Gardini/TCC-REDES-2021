<template>
	<div style="display: flex; flex-direction: column; margin-top: 10px">
		<h1 :style="isMobile ? 'font-size: 1em; margin: auto' : 'margin: auto'">
			Nunca foi tão fácil ter controle de tudo!
		</h1>
		<v-container v-if="!isMobile" fluid>
			<v-row dense>
				<v-col :cols="4">
					<v-card class="mx-auto" max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="text-overline mb-4">
									Usuários
								</div>
								<v-list-item-subtitle
									>Tenha controle de seus funcionários e o que eles
									fizeram!</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>

						<v-card-actions>
							<v-btn color="#00B74A" style="color: #fff" fab x-small>1</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col :cols="4">
					<v-card class="mx-auto" max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="text-overline mb-4">
									Produtos
								</div>
								<v-list-item-subtitle
									>Cadastre seus produtos com nome, preço e até
									ingredientes!</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>

						<v-card-actions>
							<v-btn color="#00B74A" style="color: #fff" fab x-small>2</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col :cols="4">
					<v-card class="mx-auto" max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<div class="text-overline mb-4">
									Pedidos
								</div>
								<v-list-item-subtitle
									>Seus garçons fazem os pedidos pelo aplicativo e todos podem
									acompanhar!</v-list-item-subtitle
								>
							</v-list-item-content>
						</v-list-item>

						<v-card-actions>
							<v-btn color="#00B74A" style="color: #fff" fab x-small>3</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-container v-else fluid>
			<v-row dense class="mb-5">
				<v-card class="mx-auto" max-width="344" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="text-overline mb-4">
								Usuários
							</div>
							<v-list-item-subtitle
								>Tenha controle de seus funcionários e o que eles
								fizeram!</v-list-item-subtitle
							>
						</v-list-item-content>
					</v-list-item>

					<v-card-actions>
						<v-btn color="#00B74A" style="color: #fff" fab x-small>1</v-btn>
					</v-card-actions>
				</v-card>
			</v-row>
			<v-row dense class="mb-5">
				<v-card class="mx-auto" max-width="344" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="text-overline mb-4">
								Produtos
							</div>
							<v-list-item-subtitle
								>Cadastre seus produtos com nome, preço e até
								ingredientes!</v-list-item-subtitle
							>
						</v-list-item-content>
					</v-list-item>

					<v-card-actions>
						<v-btn color="#00B74A" style="color: #fff" fab x-small>2</v-btn>
					</v-card-actions>
				</v-card>
			</v-row>
			<v-row dense class="mb-5">
				<v-card class="mx-auto" max-width="344" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<div class="text-overline mb-4">
								Pedidos
							</div>
							<v-list-item-subtitle
								>Seus garçons fazem os pedidos pelo aplicativo e todos podem
								acompanhar!</v-list-item-subtitle
							>
						</v-list-item-content>
					</v-list-item>

					<v-card-actions>
						<v-btn color="#00B74A" style="color: #fff" fab x-small>3</v-btn>
					</v-card-actions>
				</v-card>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	props: {
		isMobile: Boolean,
	},
};
</script>

<style></style>
