<template>
	<MDBContainer :class="show_hide">
		<h1 style="margin-top: 20px">
			Produtos
			<MDBBtn color="success" @click="isAddingProduct = !isAddingProduct" floating>
				<MDBIcon v-if="!isAddingProduct" icon="plus"></MDBIcon>
				<MDBIcon v-else icon="minus"></MDBIcon>
			</MDBBtn>
		</h1>
		<transition>
			<MDBContainer v-if="isAddingProduct">
				<MDBRow
					style="margin-top: 20px; padding: 10px; margin-bottom: 20px"
					tag="form"
					class="g-3 border"
				>
					<h2>Adicionar Produto</h2>
					<div class="col">
						<MDBCard class="border" style="height: 100%" text="left">
							<MDBCardHeader
								style="display: flex; flex-direction: row; align-content: space-between;"
							>
								<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
									<div style="display: flex;">
										<pulsating-dots
											:color="!newProduct.available ? 'red' : 'green'"
										/>
										<MDBContainer style="display: flex; flex-direction: row">
											<MDBInput v-model="newProduct.name" />
											<span class=""
												><input
													style="position: relative; margin-top: 11px; margin-left: 10px; transform: scale(2);"
													type="checkbox"
													v-model="newProduct.available"
													aria-required="false"
											/></span>
										</MDBContainer>
									</div>
								</MDBCardTitle>
								<div style="margin-left: auto">
									<MDBBtn
										@click="addNewProduct()"
										color="success"
										floating
										size="sm"
									>
										<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
									>&nbsp;
									<MDBBtn color="danger" floating size="sm">
										<MDBIcon
											@click="
												(newProduct.name = null),
													(newProduct.ingredients = []),
													(newProduct.available = true),
													(newProduct.price = null),
													(newProduct.newIngredient = null)
											"
											icon="times"
											iconStyle="fas"
										/>
									</MDBBtn>
								</div>
							</MDBCardHeader>
							<MDBCardBody style="overflow-y: scroll">
								<span>Ingredientes: </span>
								<div style="display: flex">
									<ul style="min-width: 100%">
										<li
											v-for="(ingredient, i) in newProduct.ingredients"
											:key="i"
										>
											<MDBRow>
												<MDBCol md="4" sm="4" lg="8">{{
													ingredient
												}}</MDBCol>
												<MDBCol md="2" sm="2" lg="2">
													<a
														class="m-1"
														role="button"
														style="color: #F93154"
														@click="newProduct.ingredients.splice(i, 1)"
													>
														<MDBIcon icon="ban" iconStyle="fas" />
													</a>
												</MDBCol>
											</MDBRow>
										</li>
										<li>
											<MDBRow>
												<MDBCol md="12">
													<MDBInput
														v-model="newProduct.newIngredient"
														class="mt-2"
														label="Adicionar Ingrediente"
														type="text"
													/>
													<MDBBtn
														class="mt-1"
														size="sm"
														color="success"
														@click="
															newProduct.ingredients.push(
																newProduct.newIngredient
															),
																(newProduct.newIngredient = '')
														"
													>
														<MDBIcon icon="check" iconStyle="fas" />
													</MDBBtn>
													<MDBBtn
														class="mt-1"
														size="sm"
														color="warning"
														@click="newProduct.newIngredient = ''"
													>
														<MDBIcon icon="eraser" iconStyle="fas" />
													</MDBBtn>
												</MDBCol>
											</MDBRow>
										</li>
									</ul>
								</div>
							</MDBCardBody>
							<MDBCardFooter style="display: flex; flex-direction: row">
								<span
									style="position: absolute; bottom: 0%; left: 1%; font-size: small"
								>
									<span class="text-danger" v-if="!newProduct.available"
										>Indisponível</span
									>
									<span class="text-success" v-else>Disponível</span>
								</span>
								<span style="margin-left: auto"
									><MDBInput
										label="Preço"
										type="number"
										v-model="newProduct.price"
								/></span>
							</MDBCardFooter>
						</MDBCard>
					</div>
				</MDBRow>
			</MDBContainer>
		</transition>
		<hr />
		<MDBContainer v-if="isLoaded">
			<MDBRow class="d-flex">
				<!-- Products Card -->
				<MDBCol
					v-for="(product, i) in products"
					:key="i"
					:id="i"
					lg="6"
					style="margin-bottom: 10px"
				>
					<div :class="product.isEditing ? 'flipper flipped' : 'flipper'">
						<div class="content">
							<div class="front">
								<transition name="cardTransition">
									<MDBCard
										v-if="!product.isEditing"
										class="border"
										style="height: 100%"
										text="left"
									>
										<MDBCardHeader
											style="display: flex; flex-direction: row; align-content: space-between;"
										>
											<MDBCardTitle
												style="margin-top: auto; margin-bottom: auto;"
											>
												<div style="display: flex;">
													<pulsating-dots
														:color="
															!product.available ? 'red' : 'green'
														"
													/>
													<span style="margin-left: 10px">{{
														product.name
													}}</span>
												</div>
											</MDBCardTitle>
											<div style="margin-left: auto" v-if="!isEditingProduct">
												<MDBBtn
													@click.prevent="
														(product.isEditing = true),
															(this.isEditingProduct = true)
													"
													color="warning"
													floating
													size="sm"
												>
													<MDBIcon
														icon="pencil-alt"
														iconStyle="fas"
													/> </MDBBtn
												>&nbsp;
												<MDBBtn
													@click.prevent="deleteProduct(i)"
													style="background-color: #E0E0E0;"
													floating
													size="sm"
												>
													<MDBIcon icon="trash-alt" iconStyle="fas" />
												</MDBBtn>
											</div>
										</MDBCardHeader>
										<MDBCardBody style="overflow-y: scroll">
											<div style="display: flex">
												<div>
													<span>Ingredientes: </span>
													<ul>
														<li
															v-for="(ingredient,
															i) in product.ingredients"
															:key="i"
														>
															{{ ingredient }}
														</li>
													</ul>
												</div>
											</div>
										</MDBCardBody>
										<MDBCardFooter style="display: flex; flex-direction: row">
											<span
												style="position: absolute; bottom: 0%; left: 1%; font-size: small"
											>
												<span class="text-danger" v-if="!product.available"
													>Indisponível</span
												>
												<span class="text-success" v-else>Disponível</span>
											</span>
											<span class="fs-2" style="margin-left: auto">{{
												product.price.toLocaleString("pt-br", {
													style: "currency",
													currency: "BRL",
												})
											}}</span>
										</MDBCardFooter>
									</MDBCard>
								</transition>
							</div>
							<div class="back">
								<transition name="cardTransition">
									<MDBCard
										v-if="product.isEditing"
										class="border"
										style="height: 100%"
										text="left"
									>
										<MDBCardHeader
											style="display: flex; flex-direction: row; align-content: space-between;"
										>
											<MDBCardTitle
												style="margin-top: auto; margin-bottom: auto;"
											>
												<div style="display: flex;">
													<pulsating-dots
														:color="
															!product.available ? 'red' : 'green'
														"
													/>
													<MDBContainer
														style="display: flex; flex-direction: row"
													>
														<MDBInput v-model="product.name" />
														<input
															style="position: relative; margin-top: 11px; margin-left: 10px; transform: scale(2);"
															type="checkbox"
															v-model="product.available"
															aria-required="false"
															:id="`checkbox_${i}`"
														/>
														<!-- <span class=""
															><input
																class="btn-check"
																type="checkbox"
																v-model="product.available"
																aria-required="false"
																:id="`checkbox_${i}`"
															/><label
																:class="
																	product.available
																		? 'btn btn-danger'
																		: 'btn btn-success'
																"
																:for="`checkbox_${i}`"
																><MDBIcon
																	style="color: #fbfbfb"
																	:icon="
																		product.available
																			? 'times'
																			: 'check'
																	"
																	iconStyle="fas"
																/>&nbsp;</label
															></span
														> -->
													</MDBContainer>
												</div>
											</MDBCardTitle>
											<div style="margin-left: auto">
												<MDBBtn
													@click="updateProductInDatabase(i)"
													color="success"
													floating
													size="sm"
												>
													<MDBIcon
														icon="check"
														iconStyle="fas"
													/> </MDBBtn
												>&nbsp;
												<MDBBtn color="danger" floating size="sm">
													<MDBIcon
														@click="
															(product.isEditing = false),
																(this.isEditingProduct = false),
																this.reload()
														"
														icon="times"
														iconStyle="fas"
													/>
												</MDBBtn>
											</div>
										</MDBCardHeader>
										<MDBCardBody style="overflow-y: scroll">
											<span>Ingredientes: </span>
											<div style="display: flex">
												<ul style="min-width: 100%">
													<li
														v-for="(ingredient,
														i) in product.ingredients"
														:key="i"
													>
														<MDBRow>
															<MDBCol md="4" sm="4" lg="8">{{
																ingredient
															}}</MDBCol>
															<MDBCol md="2" sm="2" lg="2">
																<a
																	class="m-1"
																	role="button"
																	style="color: #F93154"
																	@click="
																		product.ingredients.splice(
																			i,
																			1
																		)
																	"
																>
																	<MDBIcon
																		icon="ban"
																		iconStyle="fas"
																	/>
																</a>
															</MDBCol>
														</MDBRow>
													</li>
													<li>
														<MDBRow>
															<MDBCol md="12">
																<MDBInput
																	v-model="product.newIngredient"
																	class="mt-2"
																	label="Adicionar Ingrediente"
																	type="text"
																/>
																<MDBBtn
																	class="mt-1"
																	size="sm"
																	color="success"
																	@click="
																		product.ingredients.push(
																			product.newIngredient
																		),
																			(product.newIngredient =
																				'')
																	"
																>
																	<MDBIcon
																		icon="check"
																		iconStyle="fas"
																	/>
																</MDBBtn>
																<MDBBtn
																	class="mt-1"
																	size="sm"
																	color="warning"
																	@click="
																		product.newIngredient = ''
																	"
																>
																	<MDBIcon
																		icon="eraser"
																		iconStyle="fas"
																	/>
																</MDBBtn>
															</MDBCol>
														</MDBRow>
													</li>
												</ul>
											</div>
										</MDBCardBody>
										<MDBCardFooter style="display: flex; flex-direction: row">
											<span
												style="position: absolute; bottom: 0%; left: 1%; font-size: small"
											>
												<span class="text-danger" v-if="!product.available"
													>Indisponível</span
												>
												<span class="text-success" v-else>Disponível</span>
											</span>
											<span style="margin-left: auto"
												><MDBInput
													label="Preço"
													type="number"
													v-model="product.price"
											/></span>
										</MDBCardFooter>
									</MDBCard>
								</transition>
							</div>
						</div>
					</div>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	</MDBContainer>
</template>

<script>
import axios from "axios";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardHeader,
	MDBCardBody,
	MDBCardFooter,
	MDBCardTitle,
	MDBBtn,
	MDBInput,
	MDBIcon,
} from "mdb-vue-ui-kit";
import PulsatingDots from "../components/PulsatingDots.vue";
import { useToast } from "vue-toastification";
import { mask } from "vue-the-mask";

export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBCardHeader,
		MDBCardBody,
		MDBCardFooter,
		MDBCardTitle,
		MDBBtn,
		MDBInput,
		MDBIcon,
		PulsatingDots,
	},
	directives: { mask },
	setup() {
		const toast = useToast();
		return { toast };
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			products: [],
			oldProducts: [],
			firstAddedProducts: [],
			productTimeout: null,
			productSaveToast: null,
			isLoaded: false,
			isAddingProduct: false,
			isEditingProduct: false,
			newProduct: {
				name: null,
				price: null,
				ingredients: [],
				newIngredient: null,
				available: true,
			},
			money: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
				// These options are needed to round to whole numbers if that's what you want.
				//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
				//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
			}),
			reloading: false,
			show_hide: "show",
		};
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "products":
					await this.reload();
					break;
			}
		};
	},
	async mounted() {
		this.products = await this.getproducts();
		this.firstAddedProducts = this.products.map((o) => ({ ...o }));
		this.oldProducts = this.products.map((o) => ({ ...o }));
		this.isLoaded = true;
	},
	beforeUnmount() {
		this.ws.close();
	},
	methods: {
		async getproducts() {
			try {
				const productsData = (
					await axios.get(`${localStorage.serverAddress}/products/getall`)
				).data;
				for (let product in productsData) {
					productsData[product].newIngredient = "";
					productsData[product].isEditing = false;
				}
				productsData.sort((a, b) => a.name.localeCompare(b.name));
				return productsData;
			} catch (e) {
				return [{}];
			}
		},
		async updateProductAvailability(productId, productAvailability) {
			console.log(productId, productAvailability);
		},
		async updateProductInDatabase(productIndex) {
			try {
				await axios.post(`${localStorage.serverAddress}/products/update`, {
					product: this.products[productIndex],
				});
				this.reload();
				this.toast.success("Produto salvo!", {
					position: "top-right",
					timeout: 1000,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			} catch (e) {
				this.toast.error("Algo deu errado!!", {
					position: "top-right",
					timeout: false,
					closeOnClick: true,
					pauseOnFocusLoss: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: true,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			}
		},
		async addNewProduct() {
			try {
				await axios.post(`${localStorage.serverAddress}/products/add`, {
					name: this.newProduct.name,
					price: this.newProduct.price,
					ingredients: this.newProduct.ingredients,
					available: this.newProduct.available,
				});
				this.newProduct = {
					name: null,
					price: null,
					ingredients: [],
					newIngredient: null,
					available: true,
				};
				this.reload();
				this.toast.success("Produto salvo!", {
					position: "top-right",
					timeout: 1000,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			} catch (e) {
				this.toast.error("Algo deu errado!!", {
					position: "top-right",
					timeout: false,
					closeOnClick: true,
					pauseOnFocusLoss: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: true,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			}
		},
		async deleteProduct(productIndex) {
			try {
				await axios.delete(
					`${localStorage.serverAddress}/products/delete/${this.products[productIndex]._id}`
				);
				this.toast.success("Produto excluído", {
					position: "top-right",
					timeout: 1000,
					closeOnClick: true,
					pauseOnFocusLoss: false,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: false,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
				this.reload();
			} catch (error) {
				this.toast.error("Algo deu errado!!", {
					position: "top-right",
					timeout: false,
					closeOnClick: true,
					pauseOnFocusLoss: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 1,
					showCloseButtonOnHover: false,
					hideProgressBar: true,
					closeButton: "button",
					icon: true,
					rtl: false,
				});
			}
		},
		reload() {
			this.show_hide = "hide";
			setTimeout(async () => {
				this.products = await this.getproducts();
				this.firstAddedProducts = this.products.map((o) => ({ ...o }));
				this.oldProducts = this.products.map((o) => ({ ...o }));
				this.isEditingProduct = false;
				this.show_hide = "show";
			}, 200);
		},
	},
	watch: {
		products: {
			handler: function() {
				const products = this.products.map((o) => ({ ...o }));
				const firstAddedProducts = this.firstAddedProducts.map((o) => ({ ...o }));
				this.oldProducts = products.map((o) => ({ ...o }));
				this.toast.dismiss(this.productSaveToast);
				clearTimeout(this.productTimeout);
				let isSomethingDiferent = false;
				for (let index in products) {
					if (
						!(
							products[index].ingredients == firstAddedProducts[index].ingredients &&
							products[index].name == firstAddedProducts[index].name &&
							products[index].price == firstAddedProducts[index].price &&
							products[index].available == firstAddedProducts[index].available
						)
					) {
						isSomethingDiferent = true;
					}
				}
				if (isSomethingDiferent) {
					this.productTimeout = setTimeout(() => {
						this.productSaveToast = this.toast.error("Existem alterações não salvas!", {
							position: "top-right",
							timeout: false,
							closeOnClick: true,
							pauseOnFocusLoss: true,
							pauseOnHover: true,
							draggable: true,
							draggablePercent: 1,
							showCloseButtonOnHover: false,
							hideProgressBar: true,
							closeButton: "button",
							icon: true,
							rtl: false,
						});
					}, 1000);
				}
				return;
			},
			deep: true,
		},
	},
};
</script>

<style>
/* width */
.card-body::-webkit-scrollbar {
	width: 5px;
}

/* Track */
.card-body::-webkit-scrollbar-track {
	background: rgb(241, 251, 251);
}

/* Handle */
.card-body::-webkit-scrollbar-thumb {
	background: #888;
}

/* Handle on hover */
.card-body::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.flipper {
	position: relative;
	min-width: 300px;
	min-height: 300px;
	perspective: 500px;
}

.content {
	position: absolute;
	width: 100%;
	height: 100%;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

	transition: transform 1s;
	transform-style: preserve-3d;
}

.flipper.flipped .content {
	transform: rotateY(180deg);
	transition: transform 0.5s;
}

.front,
.back {
	position: absolute;
	height: 100%;
	width: 100%;
	backface-visibility: hidden;
}

.back {
	transform: rotateY(180deg);
}

.show {
	transition: 0.1s;
	opacity: 1;
}

.hide {
	transition: 0.1s;
	opacity: 0.6;
}

.cardTransition-enter-active,
.cardTransition-leave-active {
	transition: opacity 1s;
}
.cardTransition-enter, .cardTransition-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
	opacity: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
