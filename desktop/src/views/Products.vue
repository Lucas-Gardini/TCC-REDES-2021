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
					md="6"
					style="margin-bottom: 10px"
				>
					<MDBCard v-if="!product.isEditing" style="height: 100%" text="left">
						<MDBCardHeader
							style="display: flex; flex-direction: row; align-content: space-between;"
						>
							<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
								<div style="display: flex;">
									<pulsating-dots :color="!product.available ? 'red' : 'green'" />
									<span style="margin-left: 10px">{{ product.name }}</span>
								</div>
							</MDBCardTitle>
							<div style="margin-left: auto">
								<MDBBtn
									@click.prevent="product.isEditing = true"
									color="warning"
									floating
									size="sm"
								>
									<MDBIcon icon="pencil-alt" iconStyle="fas" /> </MDBBtn
								>&nbsp;
								<MDBBtn v-if="product.available" color="danger" floating size="sm">
									<MDBIcon icon="times" iconStyle="fas" /> </MDBBtn
								>&nbsp;
								<MDBBtn v-else color="success" floating size="sm">
									<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
								>&nbsp;
								<MDBBtn style="background-color: #E0E0E0" floating size="sm">
									<MDBIcon icon="trash-alt" iconStyle="fas" />
								</MDBBtn>
							</div>
						</MDBCardHeader>
						<MDBCardBody>
							<div style="display: flex">
								<div>
									<span>Ingredientes: </span>
									<ul>
										<li v-for="(ingredient, i) in product.ingredients" :key="i">
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
					<MDBCard v-else style="height: 100%" text="left">
						<MDBCardHeader
							style="display: flex; flex-direction: row; align-content: space-between;"
						>
							<MDBCardTitle style="margin-top: auto; margin-bottom: auto;">
								<div style="display: flex;">
									<pulsating-dots :color="!product.available ? 'red' : 'green'" />
									<MDBContainer>
										<MDBInput v-model="product.name" />
									</MDBContainer>
								</div>
							</MDBCardTitle>
							<div style="margin-left: auto">
								<MDBBtn pcolor="success" floating size="sm">
									<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
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
										<li v-for="(ingredient, i) in product.ingredients" :key="i">
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
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			products: [],
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
};
</script>

<style></style>
