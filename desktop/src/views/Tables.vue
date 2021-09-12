<template>
	<MDBContainer>
		<h1 style="margin-top: 20px; margin-bottom: 20px">
			Mesas
			<MDBBtn color="success" @click="isAddingTable = !isAddingTable" floating>
				<MDBIcon v-if="!isAddingTable" icon="plus"></MDBIcon>
				<MDBIcon v-else icon="minus"></MDBIcon>
			</MDBBtn>
		</h1>
		<MDBContainer v-if="isAddingTable" style="margin-bottom: 50px">
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
						v-model="newTable"
					>
						<template #prepend>
							<span class="input-group-text"><i class="mdi mdi-table-furniture"></i></span>
						</template>
					</MDBInput>
				</div>
				<div class="col">
					<MDBCheckbox v-model="newTableAvailability" label="Disponível?" inline />
				</div>
				<div>
					<MDBBtn @click="addToDatabase" color="success" floating size="sm">
						<MDBIcon icon="check" iconStyle="fas" /> </MDBBtn
					>&nbsp;
					<MDBBtn
						color="warning"
						floating
						size="sm"
						@click="(newTable = ``), (newTableAvailability = false)"
					>
						<MDBIcon icon="eraser"></MDBIcon>
					</MDBBtn>
				</div>
			</MDBRow>
		</MDBContainer>
		<!-- DIVIDER -->
		<MDBRow style="margin-bottom: 50px !important;" v-for="(table, i) in tables" :key="i">
			<MDBCol>
				<MDBCard class="border" style="margin-left: 10vw !important; margin-right: 10vw !important;">
					<MDBCardHeader style="display: flex; flex-direction: row; align-content: space-between;">
						<div class="card-title" style="display: flex; min-width: 100%">
							<div style="margin-right: auto">
								<h5><i class="mdi mdi-table-furniture"></i> {{ table.table }}</h5>
							</div>
							<div style="margin-left: auto">
								<input type="checkbox" v-model="table.available" /><label
									@click="toggleAvailability(i)"
									>Toggle</label
								>
							</div>
							<div
								@click="deleteFromDatabase(i)"
								:class="!isDeletingTable ? 'deleteTable' : 'deleteTable spin'"
								aria-label="Excluir"
							>
								<i
									:class="!isDeletingTable ? 'mdi mdi-close-thick' : 'mdi mdi-loading spin'"
								></i>
							</div>
						</div>
					</MDBCardHeader>
				</MDBCard>
			</MDBCol>
		</MDBRow>
	</MDBContainer>
</template>

<script>
import { useToast } from "vue-toastification";

import {
	MDBContainer,
	MDBCard,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBCheckbox,
	MDBCardHeader,
	MDBCol,
} from "mdb-vue-ui-kit";
import axios from "axios";
export default {
	components: {
		MDBContainer,
		MDBCard,
		MDBBtn,
		MDBIcon,
		MDBInput,
		MDBRow,
		MDBCheckbox,
		MDBCardHeader,
		MDBCol,
	},
	setup() {
		const toast = useToast();
		return { toast };
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			tables: {},
			isAddingTable: false,
			isDeletingTable: false,
			newTable: null,
			newTableAvailability: true,
		};
	},
	created() {
		this.ws.onmessage = async (event) => {
			switch (event.data) {
				case "tables":
					await this.getData();
					break;
			}
		};
	},
	async mounted() {
		this.getData();
	},
	methods: {
		async getData() {
			this.tables = (await axios.get(`${localStorage.serverAddress}/tables/getall`)).data;
		},
		async addToDatabase() {
			const addResult = (
				await axios.post(`${localStorage.serverAddress}/tables/add`, {
					table: this.newTable,
					available: this.newTableAvailability,
				})
			).data;
			if (addResult === "OK") {
				this.getData();
			}
		},
		async toggleAvailability(table_index) {
			const updateResult = await axios.post(
				`${localStorage.serverAddress}/tables/availability/${this.tables[table_index]._id}`,
				{
					available: !this.tables[table_index].available,
				}
			);
			if (updateResult.status === 200) {
				this.getData();
			}
		},
		deleteFromDatabase(table_index) {
			this.isDeletingTable = true;
			setTimeout(async () => {
				const deleteTable = confirm(
					`Deseja realmente excluir a mesa ${this.tables[table_index].table}?`
				);
				if (deleteTable) {
					const delResult = (
						await axios.delete(
							`${localStorage.serverAddress}/tables/del/${this.tables[table_index]._id}`
						)
					).data;
					if (delResult === "OK") {
						this.toast.success("Mesa Excluída", {
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
						this.getData();
						this.isDeletingTable = false;
						return;
					}
					this.toast.error("Erro ao Excluir!", {
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
				}
				this.toast.warning("Ação Cancelada", {
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
				this.isDeletingTable = false;
			}, 100);
		},
	},
};
</script>

<style scoped>
input[type="checkbox"] {
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 50px;
	height: 25px;
	background: #f93154;
	/* display: block; */
	border-radius: 100px;
	position: relative;
}

label:after {
	content: "";
	position: absolute;
	top: 5px;
	left: 5px;
	width: 15px;
	height: 15px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}

input:checked + label {
	background: #00b74a;
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

.deleteTable {
	transition: all 0.4s;
	background-color: #fff;
	transform: scale(0.8);
	font-size: 1.01em;
	margin-left: 10px;
}

.deleteTable:hover {
	transition: all 0.4s;
	transform: scale(1);
	color: #f93154;
	cursor: pointer;
}

.spin {
	animation: spin-animation infinite 1s;
}

@keyframes spin-animation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
