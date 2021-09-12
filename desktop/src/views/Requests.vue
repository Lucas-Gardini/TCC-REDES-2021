<template>
	<MDBContainer :class="show_hide">
		<h1 style="margin-top: 20px" id="top">
			Pedidos - Hoje
		</h1>
		<div v-for="(request, i) in requests" :key="i">
			<MDBRow class="g3 mb-4 border">
				<MDBCard style="padding: 0 !important">
					<MDBCardHeader
						class="bg-success"
						style="margin-top: auto; margin-bottom: auto; border-radius: 0 !important; color: #fff"
					>
						<div style="display: flex;">
							<h4 style="margin-left: 5px; margin-top: auto; margin-bottom: auto">
								<i class="mdi mdi-table-furniture"></i> Mesa: {{ request.tableDoc.table }}
							</h4>
							<div v-if="!request.completed" style="margin-left: auto">
								<div class="w3tooltip">
									<MDBBtn
										@click="finishRequest(request)"
										color="success"
										floating
										size="sm"
									>
										<MDBIcon icon="check" iconStyle="fas" />
									</MDBBtn>
									<span class="w3tooltiptext">Finalizar Pedido</span>
								</div>

								<div class="w3tooltip">
									<MDBBtn @click="endRequest(request)" color="danger" floating size="sm">
										<MDBIcon icon="times" iconStyle="fas" />
									</MDBBtn>
									<span class="w3tooltiptext">Cancelar Pedido</span>
								</div>
							</div>
							<div v-else style="margin-left: auto">
								<i class="mdi mdi-thumb-up"></i> Pedido Finalizado
							</div>
						</div>
					</MDBCardHeader>
					<MDBCardBody>
						<h6><i class="mdi mdi-food"></i> Pedido</h6>
						<div v-for="(product, ii) in request.products" :key="ii">
							<MDBCardTitle style="margin-bottom: 0">
								<MDBBtn
									class="text-truncate"
									style="width: 100%; text-align: left; font-size: 0.85em; display: flex"
									tag="a"
									color="link"
									@click="
										() => {
											getProductIngredients(product.productId, ii, i).then(() => {
												request.collapse[ii] = !request.collapse[ii];
											});
										}
									"
								>
									<i
										:class="
											request.collapse[ii]
												? 'mdi mdi-chevron-right active'
												: 'mdi mdi-chevron-right inactive'
										"
									></i>
									<span style="margin-right: auto"
										>{{ product.quantity }} {{ product.name }}</span
									>
									<span style="margin-left: auto; color: #4F4F4F !important">{{
										(product.quantity * product.price).toLocaleString("pt-br", {
											style: "currency",
											currency: "BRL",
										})
									}}</span>
								</MDBBtn>
							</MDBCardTitle>
							<MDBCardText>
								<MDBCollapse v-model="request.collapse[ii]">
									<div class="mt-3">
										<MDBListGroup style="padding-left: 24px">
											<MDBListGroupItem
												style="padding-left: 48px !important; padding-bottom: 4px !important"
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
					<MDBCardFooter v-if="request.observations.length > 0">
						<h6><i class="mdi mdi-eye"></i> Observações</h6>
						<p>{{ request.observations }}</p>
					</MDBCardFooter>
					<MDBCardFooter style="display: flex">
						<span style="margin-right: auto; margin-top: auto; margin-bottom: auto"
							><i class="mdi mdi-cash"></i> Total:
						</span>
						<span style="margin-left: auto; font-size: 1.2em">{{
							getFullPrice(request.products)
						}}</span>
					</MDBCardFooter>
					<span style="width: 100%; text-align: center">
						<TimeAgo :date="request.date" />
					</span>
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
		<div class="getBackUp">
			<MDBBtn @click="scrollTop" color="success" floating>
				<i class="mdi mdi-arrow-up-thick"></i>
			</MDBBtn>
		</div>
	</MDBContainer>
</template>

<script>
import axios from "axios";
import PulsatingDots from "../components/PulsatingDots.vue";
import TimeAgo from "../components/TimeAgo.vue";
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
		TimeAgo,
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
		this.getTables();
		this.getRequests();
	},
	beforeUnmount() {
		this.ws.close();
	},
	methods: {
		async getRequests() {
			const requests = (await axios.get(`${localStorage.serverAddress}/requests/gettoday`)).data;
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
			let completeds = [];
			let notCompleteds = [];

			this.requests.map((request) => {
				if (request.completed) {
					completeds.push(request);
				} else {
					notCompleteds.push(request);
				}
			});
			this.requests = [...notCompleteds, ...completeds];
		},
		async getTables() {
			this.tables = (await axios.get(`${localStorage.serverAddress}/tables/getall`)).data;
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
		getFullPrice(products) {
			let price = 0;
			products.forEach((product) => {
				price += product.price * product.quantity;
			});

			return price.toLocaleString("pt-br", {
				style: "currency",
				currency: "BRL",
			});
		},
		async finishRequest(request) {
			if (confirm(`Tem certeza que deseja finalizar o pedido da mesa: ${request.tableDoc.table}?`)) {
				const result = (
					await axios.post(`${localStorage.serverAddress}/requests/finish`, { ...request })
				).data;
				console.log(result);
			}
		},
		async endRequest(request) {
			if (confirm(`Tem certeza que deseja desfazer o pedido da mesa: ${request.tableDoc.table}?`)) {
				const result = (
					await axios.delete(`${localStorage.serverAddress}/requests/delete/${request._id}`)
				).data;
				console.log(result);
			}
		},
		scrollTop() {
			window.scrollTo(0, 0);
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
