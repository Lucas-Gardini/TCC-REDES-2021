<template>
	<MDBContainer>
		<h1>Bem vindo {{ user }}</h1>
		<MDBRow class="d-flex">
			<MDBCol md="6">
				<MDBCard text="center">
					<MDBCardHeader>Produtos</MDBCardHeader>
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
	MDBCardTitle,
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
	},
	data: () => {
		return {
			user: "",
			products_quantity: 0,
		};
	},
	async mounted() {
		if (localStorage.currentUser === "admin") {
			this.user = "Administrador";
		} else {
			this.user = localStorage.currentUser;
		}
		const { data } = await axios.get("http://localhost:8080/products/getquantity");
		this.products_quantity = data;
	},
};
</script>

<style></style>
