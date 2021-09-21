<template>
	<v-card style="padding: 5%; padding-top: 0%; margin-top: 2.5%">
		<v-card-title>
			{{ menu ? "Editar Cardápio" : "Novo Cardápio" }}
		</v-card-title>
		<v-stepper v-model="step">
			<v-stepper-header>
				<v-stepper-step color="error" :complete="step > 1" step="1">
					Informações do Restaurante
				</v-stepper-step>

				<v-divider></v-divider>

				<v-stepper-step color="error" :complete="step > 2" step="2"> Produtos </v-stepper-step>
			</v-stepper-header>

			<v-stepper-items>
				<v-stepper-content step="1">
					<v-text-field
						label="Nome do Restaurante"
						v-model="newMenu.restaurant"
						clearable
						autocomplete="nope"
					></v-text-field>
					<v-row>
						<v-col cols="4" md="4">
							<v-autocomplete
								label="Estado"
								:items="states"
								v-model="selectedState"
								clearable
								autocomplete="nope"
							></v-autocomplete>
						</v-col>

						<v-col cols="4" md="4">
							<v-autocomplete
								label="Cidade"
								:items="cities"
								v-model="selectedCity"
								clearable
								autocomplete="nope"
							></v-autocomplete>
						</v-col>
					</v-row>
					<v-text-field
						label="CEP"
						v-model="newMenu.location.zipcode"
						clearable
						autocomplete="nope"
						@blur="getAddress"
					></v-text-field>
					<v-text-field
						autocomplete="nope"
						label="Bairro"
						v-model="newMenu.location.district"
						clearable
					></v-text-field>
					<v-text-field
						autocomplete="nope"
						label="Rua"
						v-model="newMenu.location.street"
						clearable
					></v-text-field>
					<v-text-field
						autocomplete="nope"
						label="Número"
						v-model="newMenu.location.number"
						clearable
					></v-text-field>

					<v-btn color="#00B74A" @click="validadeForm(1)" dark> Continuar </v-btn>
					&nbsp;
					<v-btn text @click="clearForm(), $emit('cancel')"> Cancelar </v-btn>
				</v-stepper-content>

				<v-stepper-content step="2">
					<div
						v-for="(product, index) in newMenu.products"
						:key="index"
						style="margin-bottom: 50px"
					>
						<v-card style="padding: 5%" outlined>
							<v-card-title>{{ `Produto ${index}` }}</v-card-title>
							<v-text-field
								label="Nome do Produto"
								v-model="newMenu.products[index].productName"
								clearable
								autocomplete="nope"
							></v-text-field>
							<v-text-field
								label="Preço do Produto"
								v-model="newMenu.products[index].price"
								clearable
								v-mask="['R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ ####,##']"
								autocomplete="nope"
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
											autocomplete="nope"
										></v-text-field
									></v-col>
									<v-col cols="4"
										><v-btn
											color="error"
											@click="
												newMenu.products[index].productIngredients.splice(index2, 1)
											"
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
					<v-btn
						color="#00B74A"
						@click="
							newMenu.id ? $emit('updateMenu', newMenu) : $emit('newMenu', newMenu), clearForm()
						"
						dark
					>
						Enviar
					</v-btn>
					&nbsp;
					<v-btn text @click="step = 1"> Voltar </v-btn>
				</v-stepper-content>
			</v-stepper-items>
		</v-stepper>
	</v-card>
</template>

<script>
import { mask } from "vue-the-mask";
import { states } from "../../utils/estados-cidades.json";

export default {
	directives: { mask },
	props: {
		menu: {
			type: Object,
			required: false,
		},
	},
	watch: {
		menu() {
			this.newMenu = {
				restaurant: this.menu.data.restaurant,
				products: this.menu.data.products,
				id: this.menu.id,
				location: { state: this.menu.location.state, city: this.menu.location.city },
			};
		},
		selectedState() {
			states.forEach((state) => {
				if (state.initials === this.selectedState) {
					return (this.cities = state.cities);
				}
			});
		},
		selectedCity() {
			this.newMenu.location.state = this.selectedState;
			this.newMenu.location.city = this.selectedCity;
		},
	},
	mounted() {
		if (this.menu) {
			this.newMenu = {
				restaurant: this.menu.data.restaurant,
				location: {
					state: this.menu.data.location.state,
					city: this.menu.data.location.city,
					district: this.menu.data.location.district,
					street: this.menu.data.location.street,
					number: this.menu.data.location.number,
					zipcode: this.menu.data.location.zipcode,
				},
				products: this.menu.data.products,
				id: this.menu.id,
			};
			this.selectedState = this.newMenu.location.state;
			this.selectedCity = this.newMenu.location.city;
		}
		states.forEach((state) => {
			this.states.push(state.initials);
		});
	},
	data() {
		return {
			step: 1,
			newMenu: {
				restaurant: "",
				location: {
					state: "",
					city: "",
					district: "",
					street: "",
					number: "",
					zipcode: "",
				},
				products: [],
			},
			states: [],
			selectedState: null,
			cities: [],
			selectedCity: null,
		};
	},
	methods: {
		async getAddress() {
			try {
				const address = await (
					await fetch(`https://viacep.com.br/ws/${this.newMenu.location.zipcode}/json/`, {
						method: "GET",
					})
				).json();
				this.newMenu.location.district = address.bairro;
				this.newMenu.location.street = address.logradouro;
				this.newMenu.location.number = address.complemento;
				this.selectedState = address.uf;
			} catch (e) {
				console.log(e);
			}
		},
		newProduct() {
			this.newMenu.products.push({
				productName: "",
				price: "R$ ",
				productIngredients: [],
			});
		},
		newIngredient(prodIndex) {
			if (!this.newMenu.products[prodIndex].productIngredients) {
				this.newMenu.products[prodIndex].productIngredients = [];
			}
			this.newMenu.products[prodIndex].productIngredients.push("");
		},
		clearForm() {
			this.newMenu = {
				restaurant: "",
				products: [],
				id: "",
				location: {},
			};
			this.selectedState = null;
			this.selectedCity = null;
			this.step = 1;
		},
		validadeForm(step) {
			if (step === 1) {
				if (this.newMenu.restaurant.length > 0 && this.selectedState && this.selectedCity) {
					this.step = 2;
				} else {
					alert("Preencha todos os campos");
				}
			} else if (step === 2) {
				if (this.newMenu.products.length > 0) {
					this.step = 3;
				} else {
					alert("Adicione pelo menos um produto");
				}
			}
		},
	},
};
</script>

<style></style>
