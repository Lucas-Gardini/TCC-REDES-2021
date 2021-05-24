<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">Bem vindo {{ user }}</h1>
		<MDBContainer v-if="isLoaded">
			<MDBRow class="d-flex">
				<!-- Products Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center">
						<MDBCardHeader
							><MDBIcon
								style="font-size: 2em; color: #FFAB40"
								icon="hamburger"
								iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Quantidade de Produtos Cadastrados</MDBCardTitle>
							<div style="display: flex">
								<div style="margin: auto">
									<h1>{{ products_quantity }}</h1>
								</div>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<!-- Tables Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center">
						<MDBCardHeader
							><MDBIcon
								style="font-size: 2em; color: #795548"
								icon="chair"
								iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Quantidade de Mesas</MDBCardTitle>
							<MDBRow class="d-flex">
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em"
										>Mesas Cadastradas</MDBCardText
									>
									{{ tables.indexed }}
								</MDBCol>
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em"
										>Mesas Disponíveis</MDBCardText
									>
									{{ tables.available }}
								</MDBCol>
							</MDBRow>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<!-- Sells Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center">
						<MDBCardHeader
							><MDBIcon
								style="font-size: 2em; color: #00B74A"
								icon="money-check-alt"
								iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Vendas Realizadas no Mês</MDBCardTitle>
							<MDBRow class="d-flex">
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em">Quantidade</MDBCardText>
									0
								</MDBCol>
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em"
										>Total Arrecadado</MDBCardText
									>
									R$00,00
								</MDBCol>
							</MDBRow>
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
	MDBCardText,
	MDBCardTitle,
	MDBIcon,
	MDBSpinner,
} from "mdb-vue-ui-kit";

export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBCardHeader,
		MDBCardBody,
		MDBCardText,
		MDBCardTitle,
		MDBIcon,
		MDBSpinner,
	},
	data: () => {
		return {
			ws: new WebSocket(
				`ws://${String(String(localStorage.serverAddress).split("//")[1]).split(":")[0]}:${
					localStorage.websocketPort
				}`
			),
			user: "",
			products_quantity: 0,
			tables: { indexed: 0, available: 0 },
			isLoaded: false,
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
		if (localStorage.currentUser === "admin") {
			this.user = "Administrador";
		} else {
			this.user = localStorage.currentUser;
		}
		try {
			await this.getProducts();
			await this.getTables();
			this.isLoaded = true;
		} catch (err) {
			console.log(err);
		}
	},
	beforeUnmount() {
		this.ws.close();
	},
	methods: {
		async getProducts() {
			try {
				const PRODUCTS_REQUEST = await axios.get(
					`${localStorage.serverAddress}/products/getquantity`
				);
				this.products_quantity = PRODUCTS_REQUEST.data;
			} catch (error) {
				console.log(error);
			}
		},
		async getTables() {
			try {
				const TABLES_REQUEST = await axios.get(
					`${localStorage.serverAddress}/tables/getquantity`
				);
				this.tables.indexed = TABLES_REQUEST.data[0];
				this.tables.available = TABLES_REQUEST.data[1];
			} catch (error) {
				console.log(error);
			}
		},
	},
};
</script>

<style></style>
