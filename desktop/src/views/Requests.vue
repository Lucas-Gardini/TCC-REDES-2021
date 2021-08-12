<template>
	<MDBContainer :class="show_hide">
		<h1 style="margin-top: 20px">
			Pedidos - Hoje
		</h1>
		<div v-for="(request, i) in requests" :key="i">
			<MDBRow class="g3 mb-4 border">
				<MDBCard>
					<MDBCardHeader style="margin-top: auto; margin-bottom: auto;">
						<div style="display: flex;">
							<pulsating-dots :color="!request.completed ? 'red' : 'green'" />
							<span style="margin-left: 10px"
								><i class="mdi mdi-table-furniture"></i> Mesa: {{ request.table }}</span
							>
							<div style="margin-left: auto">
								<div class="w3tooltip">
									<MDBBtn color="success" floating size="sm">
										<MDBIcon icon="check" iconStyle="fas" />
									</MDBBtn>
									<span class="w3tooltiptext">Finalizar Pedido</span>
								</div>

								<div class="w3tooltip">
									<MDBBtn color="danger" floating size="sm">
										<MDBIcon icon="times" iconStyle="fas" />
									</MDBBtn>
									<span class="w3tooltiptext">Cancelar Pedido</span>
								</div>
							</div>
						</div>
					</MDBCardHeader>
					<MDBCardBody>
						<h5><i class="mdi mdi-food"></i> Produtos</h5>
						<div v-for="(product, ii) in request.products" :key="ii">
							<MDBCardTitle>
								<MDBBtn
									class="text-truncate"
									style="width: 100%; text-align: left"
									tag="a"
									color="link"
									@click="
										() => {
											getProductIngredients(product.productId, ii, i).then(() => {
												request.collapse[ii] = !request.collapse[ii];
											});
										}
									"
									><i
										:class="
											request.collapse[ii]
												? 'mdi mdi-chevron-right active'
												: 'mdi mdi-chevron-right inactive'
										"
									></i
									>{{ product.quantity }} {{ product.name }}</MDBBtn
								>
							</MDBCardTitle>
							<MDBCardText>
								<MDBCollapse v-model="request.collapse[ii]">
									<div class="mt-3">
										<MDBListGroup>
											<MDBListGroupItem
												v-for="(ingredient, iii) in product.ingredients"
												:key="iii"
											>
												<li>{{ ingredient }}</li>
											</MDBListGroupItem>
										</MDBListGroup>
									</div>
								</MDBCollapse>
							</MDBCardText>
						</div>
					</MDBCardBody>
					<MDBCardFooter>
						<h5><i class="mdi mdi-eye"></i> Observações</h5>
						<p>{{ request.observations }}</p>
					</MDBCardFooter>
					<MDBCardFooter class="text-muted">{{ convertDate(request.date) }}</MDBCardFooter>
				</MDBCard>
			</MDBRow>
			<MDBRow>
				<MDBCol md="5">
					<hr />
				</MDBCol>
				<MDBCol md="2" style="text-align: center; display: grid; place-items: center">
					<pulsating-dots color="green" />
				</MDBCol>
				<MDBCol md="5">
					<hr />
				</MDBCol>
			</MDBRow>
		</div>
	</MDBContainer>
</template>

<script>
import axios from "axios";
import moment from "moment";
import PulsatingDots from "../components/PulsatingDots.vue";
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBCard,
	MDBCardTitle,
	MDBCardText,
	MDBCardHeader,
	MDBCardBody,
	MDBCardFooter,
	MDBBtn,
	MDBCollapse,
	MDBListGroup,
	MDBListGroupItem,
} from "mdb-vue-ui-kit";

export default {
	components: {
		MDBContainer,
		MDBRow,
		MDBCol,
		MDBCard,
		MDBIcon,
		MDBCardTitle,
		MDBCardText,
		MDBCardHeader,
		MDBCardBody,
		MDBCardFooter,
		MDBBtn,
		MDBCollapse,
		MDBListGroup,
		MDBListGroupItem,
		PulsatingDots,
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			show_hide: "show",
			requests: [],
			tables: [],
		};
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "requests":
					this.getRequests();
					break;
			}
		};
	},
	async mounted() {
		this.getRequests();
	},
	beforeUnmount() {
		this.ws.close();
	},
	methods: {
		async getRequests() {
			const requests = (await axios.get(`${localStorage.serverAddress}/requests/getall`)).data;
			let fixedRequests = [];
			for (let request of requests) {
				request.collapse = [];
				// eslint-disable-next-line no-empty-pattern
				for (let {} of request.products) {
					request.collapse.push(false);
				}
				fixedRequests.push(request);
			}
			this.requests = fixedRequests.reverse();
		},
		async getProductIngredients(prod_id, prod_index, request_index) {
			if (this.requests[request_index].products[prod_index].alreadyGettedIngredients) {
				return;
			}
			const product = (await axios.get(`${localStorage.serverAddress}/products/getbyid/${prod_id}`))
				.data;
			this.requests[request_index].products[prod_index].ingredients = product[0].ingredients;
			this.requests[request_index].products[prod_index].alreadyGettedIngredients = true;
		},
		convertDate(date) {
			let [days, hours, minutes, seconds] = [
				moment().diff(date, "days"),
				moment().diff(date, "hours"),
				moment().diff(date, "minutes"),
				moment().diff(date, "seconds"),
			];
			return `${
				moment().diff(date, "hours") > 24
					? `${days} dia${days > 1 ? "s" : ""}`
					: hours > 0 && hours < 24
					? `${hours} ${hours > 1 ? `horas` : `hora`} `
					: minutes > 0
					? `${minutes} ${minutes > 1 ? `minutos` : `minutos`} `
					: `${seconds} ${seconds > 1 ? `segundos` : `segundo`}  `
			} atrás`;
		},
	},
	watch: {},
};
</script>

<style>
.mdi.inactive::before {
	transition: transform 0.2s;
	transform: rotate(0deg);
}

.mdi.active::before {
	transition: transform 0.2s;
	transform: rotate(90deg);
}

/* TollTip from w3schools.com */
/* Tooltip container */
.w3tooltip {
	position: relative;
	display: inline-block;
}

/* Tooltip text */
.w3tooltip .w3tooltiptext {
	visibility: hidden;
	width: 130px;
	bottom: 100%;
	left: 50%;
	background-color: transparent;
	color: #121212;
	margin-left: -65px; /* Use half of the width (120/2 = 60), to center the tooltip */

	padding-left: 5px;
	padding-right: 5px;
	padding-top: 10px;
	padding-bottom: 10px;

	border-radius: 5px;

	/* Position the tooltip text - see examples below! */
	position: absolute;
	z-index: 1;
}

.w3tooltip .w3tooltiptext::after {
	content: " ";
	position: absolute;
	top: 70%;
	left: 50%;
	margin-left: -5px;
	border-width: 5px;
	border-style: solid;
	border-color: #6c6d6c transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.w3tooltip:hover .w3tooltiptext {
	visibility: visible;
}

.list-group-item {
	border: 1px solid transparent;
}
</style>
