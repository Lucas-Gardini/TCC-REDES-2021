<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">
			Mesas
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
					<MDBCard text="center">
						<MDBCardHeader>{{ product.name }}</MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Quantidade de Produtos Cadastrados</MDBCardTitle>
							<div style="display: flex">
								<div style="margin: auto">
									<h1></h1>
								</div>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
		<div class="overlay" v-else>
			<div
				class="mask"
				style="background: linear-gradient(45deg, rgba(29, 236, 197, 0.7), rgba(91, 14, 214, 0.7) 100%);"
			></div>
			<div>
				<MDBSpinner color="success" style="width: 50px; height: 50px;" />
			</div>
		</div>
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
	MDBCardTitle,
	MDBSpinner,
	MDBBtn,
	MDBInput,
	MDBIcon,
} from "mdb-vue-ui-kit";

export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBCardHeader,
		MDBCardBody,
		MDBCardTitle,
		MDBSpinner,
		MDBBtn,
		MDBInput,
		MDBIcon,
	},
	data: () => {
		return {
			ws: new WebSocket(
				`ws://${String(String(localStorage.serverAddress).split("//")[1]).split(":")[0]}:${
					localStorage.websocketPort
				}`
			),
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
			console.log(event);
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
				return productsData;
			} catch (e) {
				return [{}];
			}
		},
	},
};
</script>

<style></style>
