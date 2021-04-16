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
								<v-toolbar color="green" dark
									>Seleção de mesa</v-toolbar
								>
								<v-card-text>
									<v-row>
										<v-col
											v-for="(
												table, i
											) in available_tables"
											:key="i"
											class="col-4 mt-5"
											style="text-align: center"
										>
											<v-btn
												v-if="table.available"
												@click="
													chooseTable(i);
													dialog.value = false;
												"
											>
												{{ table.table }}
											</v-btn>
											<v-btn v-else disabled>
												{{ table.table }}
											</v-btn>
										</v-col>
									</v-row>
								</v-card-text>
								<v-card-actions class="justify-end">
									<v-btn text @click="dialog.value = false"
										>Fechar</v-btn
									>
								</v-card-actions>
							</v-card>
						</template>
					</v-dialog>
				</v-col>
			</v-row>
		</div>
		<!-- Logout Area -->
		<div class="logout-floating-action-button">
			<div class="text-center d-flex align-center justify-space-around">
				<div>
					<v-btn
						color="gray"
						elevation="3"
						fab
						style="font-size: xx-large"
						@click="unAuthenticate"
					>
						<i class="mdi mdi-logout"></i>
					</v-btn>
				</div>
			</div>
		</div>
		<!-- Main Content -->
		<div class="mb-5">Mesa selecionada: {{ current_table }}</div>
		<div id="product-holder">
			<transition name="fade" mode="out-in" appear>
				<div v-if="!sended">
					<h1>
						<!-- Product Selector -->
						<div>
							Produtos
							<v-dialog
								v-model="product_dialog"
								scrollable
								persistent
								max-width="100%"
							>
								<template #activator="{ on, attrs }">
									<v-btn
										v-bind="attrs"
										elevation="2"
										icon
										rounded
										v-on="on"
										><i class="mdi mdi-pencil"></i
									></v-btn>
								</template>
								<v-card>
									<v-card-title
										>Selecione os produtos</v-card-title
									>
									<v-divider></v-divider>
									<v-card-text style="height: 100%">
										<!-- <div class="mt-5" style="position: sticky">
										<v-radio-group
											v-model="radios"
											mandatory
											row
										>
											<v-radio
												color="green"
												label="A-Z"
												value="az"
											></v-radio>
											<v-radio
												color="green"
												label="Z-A"
												value="za"
											></v-radio>
										</v-radio-group>
									</div>
									<v-divider></v-divider> -->
										<div class="mt-5">
											<v-checkbox
												v-for="(
													current_product, i
												) in products"
												:key="i"
												v-model="checkbox_products"
												:label="`${
													current_product.name
												} | R$ ${current_product.price.toFixed(
													2
												)}`"
												color="green"
												:value="i"
												:disabled="
													!current_product.available
												"
												@click="verifyProducts"
											>
											</v-checkbox>
										</div>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-text class="mt-5 mb-2">
										<h1>
											Total:
											<span style="color: #4caf50"
												>R$ {{ selecting_price }}</span
											>
										</h1>
									</v-card-text>
									<v-divider></v-divider>
									<v-card-actions>
										<v-btn
											color="green darken-1"
											text
											@click="saveProducts()"
										>
											Salvar
										</v-btn>
										<v-btn
											color="green darken-1"
											text
											@click="resetProducts()"
										>
											Resetar
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</div>
					</h1>
					<ul class="mb-10">
						<li v-for="(product, i) in order_products" :key="i">
							<div style="display: flex; flex-direction: row">
								<div class="d-inline pa-2">
									<span>{{ product[0].name }},&nbsp;</span>
									<span style="color: #4caf50"
										>R$
										{{
											String(
												Number(
													product[0].price
												).toFixed(2)
											).replace('.', ',')
										}},&nbsp;</span
									>
									<span>Quantidade: {{ product[1] }} </span>
								</div>
								<div class="d-inline pa-2">
									<span>
										<v-btn
											x-small
											color="green"
											@click="updateQuantity(i, 1)"
										>
											<i class="mdi mdi-plus"></i>
										</v-btn>
										<v-btn
											x-small
											color="red"
											@click="updateQuantity(i, -1)"
										>
											<i class="mdi mdi-minus"></i>
										</v-btn>
									</span>
								</div>
							</div>
						</li>
					</ul>
					<v-divider></v-divider>
					<div>
						<v-row>
							<v-col cols="12" sm="6">
								<v-textarea
									v-model="observations"
									class="mx-2 mt-3 mb-2"
									color="green"
									label="Observações"
									rows="1"
									prepend-icon="mdi-comment-eye"
									auto-grow
								></v-textarea>
							</v-col>
						</v-row>
					</div>
					<v-divider></v-divider>
					<h1
						v-if="Number(String(total_price).replace(',', '.')) > 0"
						class="mt-5 mb-5"
					>
						Total:
						<span style="color: #4caf50">R$ {{ total_price }}</span>
					</h1>
					<div class="mt-10">
						<v-btn
							:disabled="!can_send"
							color="green"
							@click="sendProducts"
							><i class="mdi mdi-send"></i>&nbsp;Enviar</v-btn
						>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	components: {},
	data: () => ({
		overlay: false,
		zIndex: 0,
		available_tables: [],
		current_table: 0,
		products: [],
		sorted_products: [],
		selected_products: [],
		order_products: [],
		checkbox_products: [],
		total_price: 0,
		selecting_price: 0,
		product_dialog: false,
		observations: null,
		websocket: null,
		can_send: false,
		sended: false,
	}),
	watch: {
		order_products(newVal) {
			let master = 0;
			for (const product of newVal) {
				const price = product[0].price;
				master += price * product[1];
			}
			this.total_price = String(Number(master).toFixed(2)).replace(
				'.',
				','
			);
		},
	},
	beforeCreate() {
		if (!this.$store.getters.getAuthentication) {
			this.$router.push('/auth');
			return true;
		}
	},
	mounted() {
		this.fetchTables();
		this.fetchProducts();

		this.websocket = new WebSocket('ws://localhost:8081');
		this.websocket.onerror = (e) => {
			console.log(e);
		};

		this.websocket.onmessage = (msg) => {
			msg = msg.data;
			switch (msg) {
				case 'tables':
					this.fetchTables();
					break;
				case 'products':
					this.fetchProducts();
					break;
			}
		};
	},
	methods: {
		async fetchTables() {
			const tables = await this.$axios.$get(
				'http://localhost:8080/tables/getall'
			);
			this.available_tables = tables;
		},
		async fetchProducts() {
			const products = await this.$axios.$get(
				'http://localhost:8080/products/getall'
			);
			this.products = products;
		},
		toogleOverlay() {
			this.overlay = true;
			this.zIndex = 9;
		},
		chooseTable(table) {
			this.current_table = table;
		},
		verifyProducts() {
			setTimeout(() => {
				const currentProducts = [];
				this.selecting_price = 0;
				const checkboxes = document.querySelectorAll(
					'input[type=checkbox]'
				);
				for (const el in checkboxes) {
					if (
						typeof checkboxes[el] === 'object' &&
						checkboxes[el].checked
					) {
						currentProducts.push(el);
						this.selecting_price = Number(
							String(this.selecting_price).replace(',', '.')
						).toFixed(2);
						this.selecting_price =
							Number(this.selecting_price) +
							Number(this.products[el].price);
						this.selecting_price = this.selecting_price
							.toFixed(2)
							.replace('.', ',');
					}
				}
				this.selected_products = currentProducts;
			}, 200);
		},
		saveProducts() {
			this.product_dialog = false;
			this.order_products = [];
			for (const c in this.selected_products) {
				this.order_products.push([
					this.products[this.selected_products[c]],
					1,
				]);
			}
			if (this.order_products.length > 0) {
				this.can_send = true;
			} else {
				this.can_send = false;
			}
		},
		resetProducts() {
			this.product_dialog = false;
			this.selected_products = [];
			this.total_price = 0;
			this.checkbox_products = [];
			this.order_products = [];
			this.can_send = false;
			this.observations = null;
		},
		sendProducts() {
			this.sended = true;
			setTimeout(async () => {
				const productsId = [];
				const tableId = this.available_tables[this.current_table]._id;
				const observations = this.observations;
				for (const c in this.selected_products) {
					productsId.push([
						this.products[this.selected_products[c]]._id,
						this.order_products[c][1],
					]);
				}
				const request = await this.$axios.post(
					'http://localhost:8080/requests/add',
					{
						products: productsId,
						observations,
						table_id: tableId,
					}
				);
				if (request.data === 'OK') {
					this.resetProducts();
				} else {
					alert(`Error: ${request.data}`);
				}
				this.sended = false;
			});
		},
		updateQuantity(product, quantity) {
			if (this.order_products[product][1] > 1) {
				this.$set(
					this.order_products[product],
					1,
					(this.order_products[product][1] += quantity)
				);
				this.verifyProducts();
			} else if (quantity > 0) {
				this.$set(
					this.order_products[product],
					1,
					(this.order_products[product][1] += quantity)
				);
				this.verifyProducts();
			}
		},
		...mapMutations({
			unAuthenticate: 'unAuthenticate',
		}),
	},
};
</script>

<style>
.fade-enter-active {
	transition: all 0.3s ease;
}
.fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(50px);
	opacity: 0;
}
</style>
