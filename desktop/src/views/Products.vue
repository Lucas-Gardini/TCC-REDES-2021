<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">
			Produtos
			<MDBBtn color="success" @click="isAddingProduct = !isAddingProduct" floating>
				<MDBIcon v-if="!isAddingProduct" icon="plus"></MDBIcon>
				<MDBIcon v-else icon="minus"></MDBIcon>
			</MDBBtn>
		</h1>
		<MDBContainer v-if="isAddingProduct">
			<MDBRow style="margin-top: 20px; padding: 10px" tag="form" class="g-3 border">
				<h2>Adicionar Mesa</h2>
				<div class="col-6">
					<MDBInput
						inputGroup
						:formOutline="false"
						aria-describedby="basic-addon1"
						aria-label="Número da Mesa"
						placeholder="Número da Mesa"
						type="number"
						v-model="newProduct"
					>
						<template #prepend>
							<span class="input-group-text"
								><i class="mdi mdi-table-furniture"></i
							></span>
						</template>
					</MDBInput>
				</div>
			</MDBRow>
		</MDBContainer>
		<MDBContainer v-if="isLoaded">
			<MDBRow class="d-flex">
				<!-- Products Card -->
				<MDBCol
					v-for="(product, i) in products"
					:key="i"
					:id="i"
					md="6"
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
											<div style="margin-left: auto">
												<MDBBtn
													@click.prevent="product.isEditing = true"
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
													v-if="product.available"
													color="danger"
													floating
													size="sm"
												>
													<MDBIcon
														icon="times"
														iconStyle="fas"
													/> </MDBBtn
												>&nbsp;
												<MDBBtn v-else color="success" floating size="sm">
													<MDBIcon
														icon="check"
														iconStyle="fas"
													/> </MDBBtn
												>&nbsp;
												<MDBBtn
													style="background-color: #E0E0E0"
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
											<span class="fs-2" style="margin-left: auto"
												>R$ {{ product.price }}</span
											>
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
													<MDBContainer>
														<MDBInput v-model="product.name" />
													</MDBContainer>
												</div>
											</MDBCardTitle>
											<div style="margin-left: auto">
												<MDBBtn pcolor="success" floating size="sm">
													<MDBIcon
														icon="check"
														iconStyle="fas"
													/> </MDBBtn
												>&nbsp;
												<MDBBtn color="danger" floating size="sm">
													<MDBIcon
														@click="product.isEditing = false"
														icon="times"
														iconStyle="fas"
													/>
												</MDBBtn>
											</div>
										</MDBCardHeader>
										<MDBCardBody>
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
											<span class="fs-2" style="margin-left: auto"
												>R$ {{ product.price }}</span
											>
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
			newProduct: {},
		};
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "products":
					await this.getProducts();
					break;
				case "tables":
					await this.getTables();
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
					productsData[product].isEditing = false;
				}
				return productsData;
			} catch (e) {
				return [{}];
			}
		},
		async updateProductAvailability(productId, productAvailability) {
			console.log(productId, productAvailability);
		},
	},
	watch: {
		products: {
			handler: function() {
				const products = [...this.products];
				const firstAddedProducts = [...this.firstAddedProducts];
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

.cardTransition-enter-active,
.cardTransition-leave-active {
	transition: opacity 1s;
}
.cardTransition-enter, .cardTransition-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
	opacity: 0;
}
</style>
