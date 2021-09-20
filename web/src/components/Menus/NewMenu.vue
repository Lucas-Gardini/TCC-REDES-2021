<template>
	<v-stepper v-model="step">
		<v-stepper-header>
			<v-stepper-step color="#00B74A" :complete="step > 1" step="1">
				Nome do Restaurante
			</v-stepper-step>

			<v-divider></v-divider>

			<v-stepper-step color="#00B74A" :complete="step > 2" step="2"> Produtos </v-stepper-step>
		</v-stepper-header>

		<v-stepper-items>
			<v-stepper-content step="1">
				<v-text-field
					label="Nome do Restaurante"
					v-model="newMenu.restaurant"
					clearable
				></v-text-field>

				<v-btn color="#00B74A" @click="step = 2" dark> Continuar </v-btn>

				<v-btn text @click="$emit('cancel')"> Cancelar </v-btn>
			</v-stepper-content>

			<v-stepper-content step="2">
				<div v-for="(product, index) in newMenu.products" :key="index" style="margin-bottom: 50px">
					<v-card style="padding: 5%" outlined>
						<v-card-title>{{ `Produto ${index}` }}</v-card-title>
						<v-text-field
							label="Nome do Produto"
							v-model="newMenu.products[index].productName"
							clearable
						></v-text-field>
						<v-text-field
							label="Preço do Produto"
							v-model="newMenu.products[index].price"
							clearable
							v-mask="['R$ ##,##', 'R$ ###,##', 'R$ ####,##']"
						></v-text-field>
						<div
							style="margin-bottom: 5%"
							v-for="(ingredients, index2) in newMenu.products[index].productIngredients"
							:key="index2"
						>
							<v-row>
								<v-col cols="8"
									><v-text-field
										label="Ingrediente"
										v-model="newMenu.products[index].productIngredients[index2]"
										clearable
									></v-text-field
								></v-col>
								<v-col cols="4"
									><v-btn
										color="error"
										@click="newMenu.products[index].productIngredients.splice(index2, 1)"
										><v-icon>mdi-trash-can</v-icon></v-btn
									></v-col
								>
							</v-row>
						</div>
						<v-row>
							<v-col cols="8"
								><v-btn @click="newIngredient(index)"
									><v-icon left>mdi-plus</v-icon>Ingrediente</v-btn
								></v-col
							>
							<v-col cols="4">
								<v-btn color="error" @click="newMenu.products.splice(index, 1)"
									>Excluir</v-btn
								></v-col
							>
						</v-row>
					</v-card>
					<v-divider />
				</div>
				<div style="margin-bottom: 30px">
					<v-btn @click="newProduct">Novo Produto</v-btn>
				</div>
				<v-btn color="#00B74A" @click="$emit('newMenu', newMenu)" dark> Enviar </v-btn>

				<v-btn text @click="step = 1"> Cancelar </v-btn>
			</v-stepper-content>
		</v-stepper-items>
	</v-stepper>
</template>

<script>
// Local Directive
import { mask } from "vue-the-mask";

export default {
	directives: { mask },
	data() {
		return {
			step: 1,
			newMenu: {
				restaurant: "",
				products: [],
			},
		};
	},
	methods: {
		newProduct() {
			this.newMenu.products.push({
				productName: "",
				productPrice: 0,
				productIngredients: [],
			});
		},
		newIngredient(prodIndex) {
			if (!this.newMenu.products[prodIndex].productIngredients) {
				this.newMenu.products[prodIndex].productIngredients = [];
			}
			this.newMenu.products[prodIndex].productIngredients.push("");
		},
	},
};
</script>

<style></style>
