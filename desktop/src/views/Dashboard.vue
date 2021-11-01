<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">Bem vind@ {{ user }}</h1>
		<MDBContainer v-if="isLoaded">
			<MDBRow class="d-flex">
				<!-- Sells Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center" class="border">
						<MDBCardHeader
							><MDBIcon
								style="font-size: 2em; color: #00B74A"
								icon="money-check-alt"
								iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>
								<div style="display: flex; flex-direction: row">
									<p>Vendas Realizadas no Ano</p>
									<MDBBtn
										@click="updateChart"
										style="margin-left: auto"
										outline="success"
										floating
										size="sm"
									>
										<MDBIcon
											:icon="chartShowQuantity ? 'dollar-sign' : 'sort-numeric-up-alt'"
										></MDBIcon>
									</MDBBtn>
								</div>
							</MDBCardTitle>
							<MDBRow class="d-flex">
								<chart
									:key="forceChartReRender"
									:labels="[
										'Janeiro',
										'Fevereiro',
										'Março',
										'Abril',
										'Maio',
										'Junho',
										'Julho',
										'Agosto',
										'Setembro',
										'Outubro',
										'Novembro',
										'Dezembro',
									]"
									:datasets="[
										{
											label: chartShowQuantity
												? 'Quantidade de Pedidos'
												: 'Renda Total',
											data: chartShowQuantity ? sellsQuantity : sellsMoney,
											backgroundColor: '#00B74A',
											borderColor: '#008F39 ',
											borderWidth: 1,
										},
									]"
									:moneys="!chartShowQuantity ? sellsQuantity : sellsMoney"
									:showQuantity="chartShowQuantity"
								/>
							</MDBRow>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<!-- Requests Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center" class="border">
						<MDBCardHeader
							><MDBIcon
								style="font-size: 2em; color: #1266F1"
								icon="cash-register"
								iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Quantidade de Pedidos</MDBCardTitle>
							<MDBRow class="d-flex">
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em">Hoje</MDBCardText>
									{{ requests.today }}
								</MDBCol>
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em">Total</MDBCardText>
									{{ requests.all }}
								</MDBCol>
							</MDBRow>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
				<!-- Products Card -->
				<MDBCol md="6" style="margin-bottom: 10px">
					<MDBCard text="center" class="border">
						<MDBCardHeader
							><MDBIcon style="font-size: 2em; color: #FFAB40" icon="hamburger" iconStyle="fas"
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
					<MDBCard text="center" class="border">
						<MDBCardHeader
							><MDBIcon style="font-size: 2em; color: #795548" icon="chair" iconStyle="fas"
						/></MDBCardHeader>
						<MDBCardBody>
							<MDBCardTitle>Quantidade de Mesas</MDBCardTitle>
							<MDBRow class="d-flex">
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em">Mesas Cadastradas</MDBCardText>
									{{ tables.indexed }}
								</MDBCol>
								<MDBCol md="6">
									<MDBCardText style="font-size: 0.9em">Mesas Disponíveis</MDBCardText>
									{{ tables.available }}
								</MDBCol>
							</MDBRow>
						</MDBCardBody>
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
	MDBCardText,
	MDBCardTitle,
	MDBIcon,
	MDBBtn,
} from "mdb-vue-ui-kit";
import Chart from "../components/Chart.vue";

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
		Chart,
		MDBBtn,
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			user: "",
			products_quantity: 0,
			tables: { indexed: 0, available: 0 },
			requests: { today: 0, all: 0 },
			sellsQuantity: [],
			sellsMoney: [],
			chartShowQuantity: true,
			isLoaded: false,
			forceChartReRender: 0,
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
				case "requests":
					await this.getRequests();
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
			await this.getRequests();
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
				const TABLES_REQUEST = await axios.get(`${localStorage.serverAddress}/tables/getquantity`);
				this.tables.indexed = TABLES_REQUEST.data[0];
				this.tables.available = TABLES_REQUEST.data[1];
			} catch (error) {
				console.log(error);
			}
		},
		async getRequests() {
			try {
				const REQUESTS_REQUEST = await axios.get(
					`${localStorage.serverAddress}/requests/getquantity`
				);
				const SELLS_REQUEST = await axios.get(`${localStorage.serverAddress}/requests/getsells`);
				this.requests = REQUESTS_REQUEST.data;
				this.sellsQuantity = SELLS_REQUEST.data.monthSellsQuantity;
				this.sellsMoney = SELLS_REQUEST.data.monthSellsMoney;
			} catch (error) {
				console.log(error);
			}
		},
		updateChart() {
			this.chartShowQuantity = !this.chartShowQuantity;
			this.forceChartReRender = this.forceChartReRender + 1;
		},
	},
};
</script>

<style></style>
