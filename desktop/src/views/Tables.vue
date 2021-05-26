<template>
	<MDBContainer>
		<h1 style="margin-top: 20px">
			Mesas
			<MDBBtn color="success" @click="isAddingTable = !isAddingTable" floating>
				<MDBIcon v-if="!isAddingTable" icon="plus"></MDBIcon>
				<MDBIcon v-else icon="minus"></MDBIcon>
			</MDBBtn>
		</h1>
		<MDBContainer v-if="isAddingTable">
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
							<span class="input-group-text"
								><i class="mdi mdi-table-furniture"></i
							></span>
						</template>
					</MDBInput>
				</div>
				<div class="col">
					<MDBCheckbox v-model="newTableAvailability" label="Disponível?" inline />
				</div>
				<div>
					<MDBBtn color="info" @click="addToDatabase" floating>
						<MDBIcon icon="download"></MDBIcon>
					</MDBBtn>
					<MDBBtn
						color="secondary"
						@click="(newTable = ``), (newTableAvailability = false)"
						floating
					>
						<MDBIcon icon="eraser"></MDBIcon>
					</MDBBtn>
				</div>
			</MDBRow>
		</MDBContainer>
		<div class="row" style="margin-top: 10px">
			<div class="col-4" v-for="(table, i) in tables" :key="i" style="margin-bottom: 10px;">
				<MDBCard class="bg-light" text="center">
					<MDBCardBody>
						<MDBCardTitle
							style="color: #262626; border-bottom: 0.2px solid #424242; padding-bottom: 5px"
							>{{ table.table }}</MDBCardTitle
						>
						<MDBCardText>
							<p v-if="table.available" style="color: #00B74A" class="fs-2">
								Disponível Hoje
							</p>
							<p v-else style="color: #F93154" class="fs-2">Indisponível Hoje</p>
						</MDBCardText>
						<div class="row">
							<div class="col" style="margin-bottom: 10px">
								<MDBBtn
									v-if="table.available"
									@click="toggleAvailability(i)"
									color="danger"
									><MDBIcon icon="times" iconStyle="fas"
								/></MDBBtn>
								<MDBBtn v-else @click="toggleAvailability(i)" color="success"
									><MDBIcon icon="check" iconStyle="fas"
								/></MDBBtn>
							</div>
							<div class="col" style="margin-bottom: 10px">
								<MDBBtn
									@click="deleteFromDatabase(i)"
									style="background-color: #E0E0E0"
									><MDBIcon icon="trash-alt" iconStyle="fas"
								/></MDBBtn>
							</div>
						</div>
					</MDBCardBody>
				</MDBCard>
			</div>
		</div>
	</MDBContainer>
</template>

<script>
import {
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardTitle,
	MDBCardText,
	MDBBtn,
	MDBIcon,
	MDBInput,
	MDBRow,
	MDBCheckbox,
} from "mdb-vue-ui-kit";
import axios from "axios";
export default {
	components: {
		MDBContainer,
		MDBCard,
		MDBCardBody,
		MDBCardTitle,
		MDBCardText,
		MDBBtn,
		MDBIcon,
		MDBInput,
		MDBRow,
		MDBCheckbox,
	},
	data: () => {
		return {
			ws: new WebSocket(`ws://${String(localStorage.serverAddress).split("://")[1]}`),
			tables: {},
			isAddingTable: false,
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
		async deleteFromDatabase(table_index) {
			const delResult = (
				await axios.delete(
					`${localStorage.serverAddress}/tables/del/${this.tables[table_index]._id}`
				)
			).data;
			if (delResult === "OK") {
				this.getData();
			}
		},
	},
};
</script>

<style></style>
