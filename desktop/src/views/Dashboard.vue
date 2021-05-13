<template>
	<MDBContainer>
		<h1>Bem vindo {{ user }}</h1>
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
								<MDBCardText style="font-size: 0.9em">Total Arrecadado</MDBCardText>
								R$00,00
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
			</MDBCol>
		</MDBRow>
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
	},
	data: () => {
		return {
			user: "",
			products_quantity: 0,
			tables: { indexed: 0, available: 0 },
		};
	},
	async mounted() {
		if (localStorage.currentUser === "admin") {
			this.user = "Administrador";
		} else {
			this.user = localStorage.currentUser;
		}
		try {
			const PRODUCTS_REQUEST = await axios.get("http://localhost:8080/products/getquantity");
			const TABLES_REQUEST = await axios.get("http://localhost:8080/tables/getquantity");
			this.tables.indexed = TABLES_REQUEST.data[0];
			this.tables.available = TABLES_REQUEST.data[1];
			this.products_quantity = PRODUCTS_REQUEST.data;
		} catch (err) {
			console.log(err);
		}
	},
};
</script>

<style></style>
